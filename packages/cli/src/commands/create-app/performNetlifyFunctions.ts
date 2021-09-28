import NetlifyApiWrapper from './apiWrappers/NetlifyApiWrapper';
import chalk from 'chalk';
import GithubApiWrapper from './apiWrappers/GithubApiWrapper';
import { join } from 'path';
import parseGithubUrl from 'parse-github-url';
import LastRevConfig, {
  CREATE_APP_ACTION,
  SETUP_NETLIFY_ACTION,
  SN_ADD_DEPLOY_HOOK_SUB_ACTION,
  SN_ADD_GITHUB_REPO_SUB_ACTION,
  SN_ADD_NOTIFICATION_HOOK_SUB_ACTION,
  SN_CREATE_DEPLOY_KEY_SUB_ACTION,
  SN_CREATE_SITE_SUB_ACTION,
  SN_PICK_ACCOUNT_SUB_ACTION
} from './LastRevConfig';

const pickAccount = async (config: LastRevConfig, netlifyApiWrapper: NetlifyApiWrapper): Promise<void> => {
  if (config.hasCompletedSubAction(SETUP_NETLIFY_ACTION, SN_PICK_ACCOUNT_SUB_ACTION)) {
    return;
  }
  const accounts = await netlifyApiWrapper.api.listAccountsForUser();

  await config.askAndUpdate(SETUP_NETLIFY_ACTION, 'accountSlug', {
    type: 'list',
    name: 'accountSlug',
    message: 'Team:',
    choices: accounts.map((account) => ({
      value: account.slug,
      name: account.name
    }))
  });
};

const createNetlifySite = async (config: LastRevConfig, netlifyApiWrapper: NetlifyApiWrapper): Promise<any> => {
  if (config.hasCompletedSubAction(SETUP_NETLIFY_ACTION, SN_CREATE_SITE_SUB_ACTION)) {
    return;
  }
  await config.askAndUpdate(SETUP_NETLIFY_ACTION, 'siteName', {
    type: 'input',
    name: 'siteName',
    message: 'Site name (optional):',
    filter: (val) => (val === '' ? undefined : val),
    validate: (input) => /^[a-zA-Z\d-]+$/.test(input) || 'Only alphanumeric characters and hyphens are allowed'
  });

  try {
    const site = await netlifyApiWrapper.api.createSiteInTeam({
      accountSlug: config.getStateValue(SETUP_NETLIFY_ACTION, 'accountSlug'),
      body: {
        name: config.getStateValue(SETUP_NETLIFY_ACTION, 'siteName')
      }
    });
    config.updateStateValue(SETUP_NETLIFY_ACTION, 'site', site);

    console.log(chalk.greenBright.bold.underline(`Netlify Site Created`));

    console.log('Admin URL', site.admin_url);
    console.log('URL', site.ssl_url || site.url);
    console.log('Site ID', site.id);

    config.completeSubAction(SETUP_NETLIFY_ACTION, SN_CREATE_SITE_SUB_ACTION);
  } catch (error: any) {
    if (error.status === 422) {
      console.log(
        `${config.getStateValue(
          SETUP_NETLIFY_ACTION,
          'siteName'
        )}.netlify.app already exists. Please try a different slug.`
      );
      config.updateStateValue(SETUP_NETLIFY_ACTION, 'siteName', undefined);
      return await createNetlifySite(config, netlifyApiWrapper);
    } else {
      throw Error(`Netlify createSiteInTeam error: ${error.status}: ${error.message}`);
    }
  }
};

const addDeployKey = async (
  config: LastRevConfig,
  githubApiWrapper: GithubApiWrapper,
  netlifyApiWrapper: NetlifyApiWrapper
) => {
  if (config.hasCompletedSubAction(SETUP_NETLIFY_ACTION, SN_CREATE_DEPLOY_KEY_SUB_ACTION)) {
    return;
  }
  const githubRepo = config.getStateValue(CREATE_APP_ACTION, 'githubRepo');
  console.log('Adding deploy key to repository...');
  const key = await netlifyApiWrapper.api.createDeployKey();
  try {
    await githubApiWrapper.octokit.repos.createDeployKey({
      title: 'Netlify Deploy Key',
      key: key.public_key,
      owner: githubRepo.owner.login,
      repo: githubRepo.name,
      read_only: true
    });

    console.log('Deploy key added!');

    config.updateStateValue(SETUP_NETLIFY_ACTION, 'deployKey', key);
    config.completeSubAction(SETUP_NETLIFY_ACTION, SN_CREATE_DEPLOY_KEY_SUB_ACTION);
  } catch (error: any) {
    let message = `Failed adding GitHub deploy key: error.message`;
    if (error.status === 404) {
      throw Error(
        `${message}. Does the repository ${githubRepo.owner.login} exist and do ${githubRepo.name} has the correct permissions to set up deploy keys?`
      );
    }
    throw Error(message);
  }
};

const addDeployHook = async (config: LastRevConfig, githubApiWrapper: GithubApiWrapper, deployHook: any) => {
  try {
    if (config.hasCompletedSubAction(SETUP_NETLIFY_ACTION, SN_ADD_DEPLOY_HOOK_SUB_ACTION)) {
      return;
    }
    const githubRepo = config.getStateValue(CREATE_APP_ACTION, 'githubRepo');
    await githubApiWrapper.octokit.repos.createWebhook({
      owner: githubRepo.owner.login,
      repo: githubRepo.name,
      name: 'web',
      config: {
        url: deployHook,
        content_type: 'json'
      },
      events: ['push', 'pull_request', 'delete'],
      active: true
    });
    config.completeSubAction(SETUP_NETLIFY_ACTION, SN_ADD_DEPLOY_HOOK_SUB_ACTION);
  } catch (error: any) {
    if (!error.message.includes('Hook already exists on this repository')) {
      let message = `Failed creating repo hook: ${error.message}`;
      if (error.status === 404) {
        message = `${message}. Do the repository and owner have the correct permissions to set up hooks?`;
      }
      throw Error(message);
    }
  }
};

const addNotificationHooks = async (
  config: LastRevConfig,
  netlifyApiWrapper: NetlifyApiWrapper,
  siteId: string,
  token: string
) => {
  if (config.hasCompletedSubAction(SETUP_NETLIFY_ACTION, SN_ADD_NOTIFICATION_HOOK_SUB_ACTION)) {
    return;
  }
  try {
    console.log(`Creating Netlify GitHub Notification Hooks...`);

    await Promise.all(
      ['deploy_created', 'deploy_failed', 'deploy_building'].map(async (event) => {
        await netlifyApiWrapper.api.createHookBySiteId({
          site_id: siteId,
          body: {
            type: 'github_commit_status',
            event,
            data: {
              access_token: token
            }
          }
        });
      })
    );

    console.log(`Netlify Notification Hooks configured!`);
    config.completeSubAction(SETUP_NETLIFY_ACTION, SN_ADD_NOTIFICATION_HOOK_SUB_ACTION);
  } catch (error: any) {
    const message = `Failed creating Netlify Notification Hooks: ${error.message}`;
    throw Error(message);
  }
};

const addGithubRepo = async (
  config: LastRevConfig,
  githubApiWrapper: GithubApiWrapper,
  netlifyApiWrapper: NetlifyApiWrapper
): Promise<void> => {
  if (config.hasCompletedSubAction(SETUP_NETLIFY_ACTION, SN_ADD_GITHUB_REPO_SUB_ACTION)) {
    return;
  }

  const githubRepository = config.getStateValue(CREATE_APP_ACTION, 'githubRepo');

  if (!githubRepository) {
    await config.askAndUpdate(SETUP_NETLIFY_ACTION, 'shouldEnterGithubUrl', {
      type: 'confirm',
      name: 'shouldEnterGithubUrl',
      message:
        'It looks like you did not create a remote repo in a previous step. Would you likle to proceed by entering a github URL? If not, github linking will be skipped.',
      default: true
    });

    if (!config.getStateValue(SETUP_NETLIFY_ACTION, 'shouldEnterGithubUrl')) {
      config.completeSubAction(SETUP_NETLIFY_ACTION, SN_ADD_GITHUB_REPO_SUB_ACTION);
      return;
    }

    await config.askAndUpdate(SETUP_NETLIFY_ACTION, 'githubRepoUrl', {
      type: 'input',
      name: 'githubRepoUrl',
      message: 'Please enter an existing GitHub repository URL:',
      validate: (input) => /^https:\/\/github.com\/[^/]+\/[^/]+$/.test(input) || 'Invalid URL'
    });

    const { owner: repoOwner, name: repoName } = parseGithubUrl(
      config.getStateValue(SETUP_NETLIFY_ACTION, 'githubRepoUrl')
    )!;

    try {
      const { data } = await githubApiWrapper.octokit.repos.get({
<<<<<<< HEAD
        owner: repoOwner,
=======
        owner: repoOwner!,
>>>>>>> jm/LRFA-361-netlify-setup
        repo: repoName
      });
      config.updateStateValue(CREATE_APP_ACTION, 'githubRepo', data);
    } catch (error: any) {
      let message = `Failed retrieving GitHub repository information: ${error.message}`;
      if (error.status === 404) {
        message = `${message}. Does the repository ${repoName} exist and accessible by ${repoOwner}`;
      }
      throw Error(message);
    }
  }

  await addDeployKey(config, githubApiWrapper, netlifyApiWrapper);

  const githubRepo = config.getStateValue(CREATE_APP_ACTION, 'githubRepo');
  const deployKey = config.getStateValue(SETUP_NETLIFY_ACTION, 'deployKey');
  const appRoot = config.getStateValue(CREATE_APP_ACTION, 'appRoot');
  const site = config.getStateValue(SETUP_NETLIFY_ACTION, 'site');

  console.log('githubRepo', githubRepo);

  try {
    const repo = {
      id: githubRepo.id,
      provider: 'github',
      repo_path: githubRepo.full_name,
      repo_branch: githubRepo.default_branch,
      allowed_branches: [githubRepo.default_branch],
      deploy_key_id: deployKey.id,
      base: appRoot,
      dir: appRoot,
      functions_dir: join(appRoot, 'packages', 'functions', 'src')
    };

    const siteId = site.id;

    const updatedSite = await netlifyApiWrapper.api.updateSite({
      siteId: siteId,
      body: {
        repo
      }
    });

    console.log(`site ${site.name} updated with Repo ${githubRepo.name}`);

    await addDeployHook(config, githubApiWrapper, updatedSite.deploy_hook);
    await addNotificationHooks(config, netlifyApiWrapper, siteId, githubApiWrapper.getToken()!);
    config.completeSubAction(SETUP_NETLIFY_ACTION, SN_ADD_GITHUB_REPO_SUB_ACTION);
  } catch (error: any) {
    const message = `Failed adding GitHub repository to netlify site: ${error.message}`;
    throw Error(message);
  }
};

const performNetlifyFunctions = async (
  config: LastRevConfig,
  netlifyApiWrapper: NetlifyApiWrapper,
  githubApiWrapper: GithubApiWrapper
) => {
  await netlifyApiWrapper.ensureLoggedIn();

  await pickAccount(config, netlifyApiWrapper);
  await createNetlifySite(config, netlifyApiWrapper);
  await addGithubRepo(config, githubApiWrapper, netlifyApiWrapper);
  config.completeAction(SETUP_NETLIFY_ACTION);
};

export default performNetlifyFunctions;
