import downloadAndExtractArchive from './downloadAndExtractArchive';
import { resolve } from 'path';
import checkExampleExists from './checkExampleExists';
import chalk from 'chalk';
import { existsSync, ensureDir } from 'fs-extra';
import renamePackages from './renamePackages';
import GithubApiWrapper from './apiWrappers/GithubApiWrapper';
import simpleGit from 'simple-git';
import LastRevConfig, {
  CA_CREATE_APP_SUB_ACTION,
  CA_CREATE_REPO_SUB_ACTION,
  CA_INIT_GIT_SUB_ACTION,
  CREATE_APP_ACTION
} from './LastRevConfig';

const git = simpleGit();

const createApp = async (config: LastRevConfig, githubApiWrapper: GithubApiWrapper): Promise<void> => {
  if (!config.hasCompletedSubAction(CREATE_APP_ACTION, CA_CREATE_APP_SUB_ACTION)) {
    await githubApiWrapper.ensureLoggedIn();

    await config.askAndUpdate(CREATE_APP_ACTION, 'example', {
      name: 'example',
      message: 'Which starter do you want to use?',
      type: 'list',
      choices: ['lastrev-next-starter']
    });

    await config.askAndUpdate(CREATE_APP_ACTION, 'directory', {
      name: 'directory',
      message: 'In which parent directory do you want to create the project?',
      type: 'input',
      default: '.'
    });

    await config.askAndUpdate(CREATE_APP_ACTION, 'name', {
      name: 'name',
      message: 'What is the name of the new project to create?',
      type: 'input',
      validate: async (input: string): Promise<string | boolean> => {
        if (!input) return 'Please enter a name for your project';
        const fullPath = resolve(config.getStateValue(CREATE_APP_ACTION, 'directory'), input);
        const pathExists = existsSync(fullPath);

        if (pathExists) return `A directory called ${input} already exists in ${directory}`;
        return true;
      }
    });

    const directory = config.getStateValue(CREATE_APP_ACTION, 'directory');
    const name = config.getStateValue(CREATE_APP_ACTION, 'name');
    const example = config.getStateValue(CREATE_APP_ACTION, 'example');

    const root = resolve(process.cwd(), directory, name);
    await ensureDir(root);
    console.log(`Creating a new Next.js app in ${chalk.green(root)}.`);

    await checkExampleExists(githubApiWrapper, example);
    await downloadAndExtractArchive({
      githubApiWrapper,
      example,
      root
    });

    await renamePackages(root, name);

    config.updateStateValue(CREATE_APP_ACTION, 'appRoot', root);
    config.completeSubAction(CREATE_APP_ACTION, CA_CREATE_APP_SUB_ACTION);
  }
};

const createGetGithubRepo = async (config: LastRevConfig, githubApiWrapper: GithubApiWrapper): Promise<void> => {
  if (config.hasCompletedSubAction(CREATE_APP_ACTION, CA_CREATE_REPO_SUB_ACTION)) {
    return;
  }

  await config.askAndUpdate(CREATE_APP_ACTION, 'shouldCreateRepo', {
    type: 'confirm',
    name: 'shouldCreate',
    message: `Do you want to create a new Github repository for your app?`,
    default: true
  });

  if (!config.getStateValue(CREATE_APP_ACTION, 'shouldCreateRepo')) {
    config.completeSubAction(CREATE_APP_ACTION, CA_CREATE_REPO_SUB_ACTION);
    return;
  }

  const orgs = await githubApiWrapper.octokit.orgs.listForAuthenticatedUser();

  await config.askAndUpdate(CREATE_APP_ACTION, 'repoName', {
    type: 'input',
    name: 'repoName',
    message: 'What is the name of your new repository?',
    default: config.getStateValue(CREATE_APP_ACTION, 'name'),
    validate: async (input): Promise<string | boolean> => {
      return /^[a-zA-Z0-9-_]+$/.test(input)
        ? true
        : 'Repository name can only contain letters, numbers, dashes and underscores';
    }
  });

  await config.askAndUpdate(CREATE_APP_ACTION, 'repoDescription', {
    type: 'input',
    name: 'repoDescription',
    message: 'Please enter a description for the new repository.',
    default: `The ${config.getStateValue(CREATE_APP_ACTION, 'repoName')} monorepo`
  });

  await config.askAndUpdate(CREATE_APP_ACTION, 'repoOrgName', {
    type: 'list',
    name: 'repoOrgName',
    message: 'Which org do you want to create the new repository in?',
    choices: orgs.data.map((org) => org.login)
  });

  await config.askAndUpdate(CREATE_APP_ACTION, 'repoPublicOrPrivate', {
    type: 'list',
    name: 'repoPublicOrPrivate',
    message: 'Should the repository be public or private?',
    choices: ['public', 'private']
  });

  await config.askAndUpdate(CREATE_APP_ACTION, 'repoHomepage', {
    type: 'input',
    name: 'repoHomepage',
    message: 'What is the homepage for this repository? (leave blank for none)'
  });

  const isPrivate = config.getStateValue(CREATE_APP_ACTION, 'repoPublicOrPrivate') === 'private';
  const org = orgs.data.find((org) => org.login === config.getStateValue(CREATE_APP_ACTION, 'repoOrgName'))!;

  const created = await githubApiWrapper.octokit.repos.createInOrg({
    org: org.login,
    name: config.getStateValue(CREATE_APP_ACTION, 'repoName'),
    description: config.getStateValue(CREATE_APP_ACTION, 'repoDescription'),
    homepage: config.getStateValue(CREATE_APP_ACTION, 'repoHomepage'),
    private: isPrivate
  });
  const githubRepo = created.data;
  config.updateStateValue(CREATE_APP_ACTION, 'githubRepo', githubRepo);
  config.completeSubAction(CREATE_APP_ACTION, CA_CREATE_REPO_SUB_ACTION);
};

const initGitRepo = async (config: LastRevConfig): Promise<void> => {
  if (config.hasCompletedSubAction(CREATE_APP_ACTION, CA_INIT_GIT_SUB_ACTION)) {
    return;
  }
  const repoGitUrl = config.getStateValue(CREATE_APP_ACTION, 'githubRepo')?.git_url;
  await git.init();
  if (repoGitUrl) {
    await git.addRemote('origin', repoGitUrl);
  }
  config.completeSubAction(CREATE_APP_ACTION, CA_INIT_GIT_SUB_ACTION);
};

const performAppCreateFunctions = async (config: LastRevConfig, githubApiWrapper: GithubApiWrapper): Promise<void> => {
  await createApp(config, githubApiWrapper);
  await createGetGithubRepo(config, githubApiWrapper);
  await initGitRepo(config);
  config.completeAction(CREATE_APP_ACTION);
};

export default performAppCreateFunctions;
