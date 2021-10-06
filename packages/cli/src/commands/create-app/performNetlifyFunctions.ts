import NetlifyApiWrapper from './apiWrappers/NetlifyApiWrapper';
import GithubApiWrapper from './apiWrappers/GithubApiWrapper';
import parseGithubUrl from 'parse-github-url';
import LastRevConfig, {
  VAL_NETLIFY_ACCOUNT_SLUG,
  VAL_NETLIFY_SITE_NAME,
  VAL_GITHUB_REPO,
  VAL_SHOULD_FETCH_GITHUB_REPO,
  VAL_GITHUB_REPO_URL,
  ACTION_PICK_NETLIFY_ACCOUNT,
  ACTION_CREATE_NETLIFY_SITE,
  ACTION_NETLIFY_ADD_DEPLOY_KEY,
  ACTION_NETLIFY_ADD_DEPLOY_HOOK,
  ACTION_NETLIFY_ADD_NOTIFICATION_HOOKS,
  ACTION_ADD_GITHUB_REPO_TO_NETLIFY,
  ACTION_UPDATE_NETLIFY_BUILD_ENV
} from './LastRevConfig';
import ora from 'ora';

const pickAccount = async (config: LastRevConfig, netlifyApiWrapper: NetlifyApiWrapper): Promise<void> => {
  if (config.hasCompletedAction(ACTION_PICK_NETLIFY_ACCOUNT)) {
    return;
  }
  const accounts = await netlifyApiWrapper.listAccountsForUser();

  await config.askAndUpdate(VAL_NETLIFY_ACCOUNT_SLUG, {
    type: 'list',
    name: VAL_NETLIFY_ACCOUNT_SLUG,
    message: 'Team:',
    choices: accounts.map((account) => ({
      value: account.slug,
      name: account.name
    }))
  });

  config.completeAction(ACTION_PICK_NETLIFY_ACCOUNT);
};

const createNetlifySite = async (config: LastRevConfig, netlifyApiWrapper: NetlifyApiWrapper): Promise<any> => {
  if (config.hasCompletedAction(ACTION_CREATE_NETLIFY_SITE)) {
    return;
  }

  await config.askAndUpdate(VAL_NETLIFY_SITE_NAME, {
    type: 'input',
    name: VAL_NETLIFY_SITE_NAME,
    message: 'Site name (optional):',
    filter: (val) => (val === '' ? undefined : val),
    validate: (input) => /^[a-zA-Z\d-]+$/.test(input) || 'Only alphanumeric characters and hyphens are allowed'
  });

  const { shouldRerun } = await netlifyApiWrapper.createSiteInTeam();
  if (shouldRerun) {
    await createNetlifySite(config, netlifyApiWrapper);
    return;
  }
  config.completeAction(ACTION_CREATE_NETLIFY_SITE);
};

const addDeployKey = async (
  config: LastRevConfig,
  githubApiWrapper: GithubApiWrapper,
  netlifyApiWrapper: NetlifyApiWrapper
) => {
  if (config.hasCompletedAction(ACTION_NETLIFY_ADD_DEPLOY_KEY)) {
    return;
  }
  await netlifyApiWrapper.createDeployKey();
  await githubApiWrapper.createDeployKey();
  config.completeAction(ACTION_NETLIFY_ADD_DEPLOY_KEY);
};

const addDeployHook = async (config: LastRevConfig, githubApiWrapper: GithubApiWrapper) => {
  if (config.hasCompletedAction(ACTION_NETLIFY_ADD_DEPLOY_HOOK)) {
    return;
  }
  await githubApiWrapper.createWebhook();
  config.completeAction(ACTION_NETLIFY_ADD_DEPLOY_HOOK);
};

const addNotificationHooks = async (config: LastRevConfig, netlifyApiWrapper: NetlifyApiWrapper, token: string) => {
  const spinner = ora('Adding Netlify notification hooks').start();
  if (config.hasCompletedAction(ACTION_NETLIFY_ADD_NOTIFICATION_HOOKS)) {
    return;
  }

  try {
    await Promise.all(
      ['deploy_created', 'deploy_failed', 'deploy_building'].map(
        async (event) => await netlifyApiWrapper.createHookBySiteId(event, token)
      )
    );
    spinner.succeed();
    config.completeAction(ACTION_NETLIFY_ADD_NOTIFICATION_HOOKS);
  } catch (err) {
    spinner.fail();
    throw err;
  }
};

const addGithubRepo = async (
  config: LastRevConfig,
  githubApiWrapper: GithubApiWrapper,
  netlifyApiWrapper: NetlifyApiWrapper
): Promise<void> => {
  if (config.hasCompletedAction(ACTION_ADD_GITHUB_REPO_TO_NETLIFY)) {
    return;
  }

  const githubRepository = config.getStateValue(VAL_GITHUB_REPO);

  if (!githubRepository) {
    await config.askAndUpdate(VAL_SHOULD_FETCH_GITHUB_REPO, {
      type: 'confirm',
      name: VAL_SHOULD_FETCH_GITHUB_REPO,
      message:
        'It looks like you did not create a remote repo in a previous step. Would you likle to proceed by entering a github URL? If not, github linking will be skipped.',
      default: true
    });

    if (!config.getStateValue(VAL_SHOULD_FETCH_GITHUB_REPO)) {
      config.completeAction(ACTION_ADD_GITHUB_REPO_TO_NETLIFY);
      return;
    }

    await config.askAndUpdate(VAL_GITHUB_REPO_URL, {
      type: 'input',
      name: VAL_GITHUB_REPO_URL,
      message: 'Please enter an existing GitHub repository URL:',
      validate: (input) => /^https:\/\/github.com\/[^/]+\/[^/]+$/.test(input) || 'Invalid URL'
    });

    const { owner: repoOwner, name: repoName } = parseGithubUrl(config.getStateValue(VAL_GITHUB_REPO_URL))!;

    await githubApiWrapper.loadGithubRepo(repoOwner!, repoName!);
  }

  await addDeployKey(config, githubApiWrapper, netlifyApiWrapper);
  await netlifyApiWrapper.updateSiteWithRepo();
  await addDeployHook(config, githubApiWrapper);
  await addNotificationHooks(config, netlifyApiWrapper, githubApiWrapper.getToken()!);

  config.completeAction(ACTION_ADD_GITHUB_REPO_TO_NETLIFY);
};

const updateNetlifyBuildEnv = async (config: LastRevConfig, netlifyApiWrapper: NetlifyApiWrapper) => {
  if (config.hasCompletedAction(ACTION_UPDATE_NETLIFY_BUILD_ENV)) {
    return;
  }
  await netlifyApiWrapper.updateSiteWithEnvVars();
  config.completeAction(ACTION_UPDATE_NETLIFY_BUILD_ENV);
};

const performNetlifyFunctions = async (
  config: LastRevConfig,
  netlifyApiWrapper: NetlifyApiWrapper,
  githubApiWrapper: GithubApiWrapper
) => {
  await pickAccount(config, netlifyApiWrapper);
  await createNetlifySite(config, netlifyApiWrapper);
  await addGithubRepo(config, githubApiWrapper, netlifyApiWrapper);
  await updateNetlifyBuildEnv(config, netlifyApiWrapper);
};

export default performNetlifyFunctions;
