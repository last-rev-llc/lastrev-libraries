import { join, resolve } from 'path';
import { replaceInFile } from 'replace-in-file';
import { existsSync, ensureDir, writeFile } from 'fs-extra';
import GithubApiWrapper from './apiWrappers/GithubApiWrapper';
import simpleGit from 'simple-git';
import LastRevConfig, {
  VAL_RESOLVED_APP_ROOT,
  VAL_EXAMPLE_NAME,
  VAL_PARENT_DIR,
  VAL_PROJECT_NAME,
  VAL_SHOULD_CREATE_GITHUB_REPO,
  VAL_GITHUB_REPO_NAME,
  VAL_GITHUB_REPO_DESCRIPTION,
  VAL_GITHUB_REPO_ORG,
  VAL_GITHUB_REPO_PRIVACY,
  VAL_GITHUB_REPO_HOMEPAGE,
  VAL_GITHUB_REPO,
  ACTION_EXTRACT_ARCHIVE,
  ACTION_CREATE_APP,
  ACTION_CREATE_PROJECT_ROOT_DIR,
  ACTION_CREATE_GITHUB_REPO,
  ACTION_GIT_INIT,
  ACTION_PUSH_REPO_TO_GITHUB,
  ACTION_UPDATE_GITHUB_BRANCH_PROTECTION_RULES,
  VAL_ENV_VARS,
  ACTION_WRITE_LOCAL_ENV_FILE
} from './LastRevConfig';
import Messager from './Messager';
import tar from 'tar';
import ora from 'ora';
import https from 'https';
import { map } from 'lodash';

const messager = Messager.getInstance();

const downloadAndExtractArchive = async (config: LastRevConfig, githubApiWrapper: GithubApiWrapper): Promise<void> => {
  if (config.hasCompletedAction(ACTION_EXTRACT_ARCHIVE)) {
    return;
  }

  const root = config.getStateValue(VAL_RESOLVED_APP_ROOT);
  const example = config.getStateValue(VAL_EXAMPLE_NAME);

  const result = await githubApiWrapper.downloadLastrevLibrariesTarballArchive();
  const regex = new RegExp(`^[^/]*/examples/${example}/.*`);

  const spinner = ora('Extracting code from archive').start();
  try {
    await new Promise((resolve, reject) => {
      https.get(result.url, (res) => {
        res.on('end', resolve);

        res.on('error', reject);

        res.pipe(
          tar.extract({
            cwd: root,
            strip: 3,
            filter: (path: string) => regex.test(path)
          })
        );
      });
    });
    spinner.succeed();
    config.completeAction(ACTION_EXTRACT_ARCHIVE);
  } catch (err: any) {
    spinner.fail();
    throw Error(`Error untarring archive: ${err.message}`);
  }
};

const createProjectRoot = async (config: LastRevConfig): Promise<void> => {
  if (config.hasCompletedAction(ACTION_CREATE_PROJECT_ROOT_DIR)) {
    return;
  }

  await config.askAndUpdate(VAL_PARENT_DIR, {
    name: VAL_PARENT_DIR,
    message: 'In which parent directory do you want to create the project?',
    type: 'input',
    default: '.'
  });

  await config.askAndUpdate(VAL_PROJECT_NAME, {
    name: VAL_PROJECT_NAME,
    message: 'What is the name of the new project to create?',
    type: 'input',
    validate: async (input: string): Promise<string | boolean> => {
      if (!input) return 'Please enter a name for your project';
      const parentDir = config.getStateValue(VAL_PARENT_DIR);
      const fullPath = resolve(parentDir, input);
      const pathExists = existsSync(fullPath);

      if (pathExists) return `A directory called ${input} already exists in ${parentDir}`;
      return true;
    }
  });

  const directory = config.getStateValue(VAL_PARENT_DIR);
  const name = config.getStateValue(VAL_PROJECT_NAME);

  const root = resolve(process.cwd(), directory, name);
  config.updateStateValue(VAL_RESOLVED_APP_ROOT, root);

  await ensureDir(root);

  messager.log(`Created the project directory at ${root}`);

  config.completeAction(ACTION_CREATE_PROJECT_ROOT_DIR);
};

const renamePackages = async (config: LastRevConfig): Promise<void> => {
  const spinner = ora('Renaming packages').start();
  const root = config.getStateValue(VAL_RESOLVED_APP_ROOT);
  const name = config.getStateValue(VAL_PROJECT_NAME);
  try {
    await replaceInFile({
      files: [
        join(root, 'package.json'),
        join(root, 'packages/*/package.json'),
        join(root, 'packages/**/*.ts'),
        join(root, 'packages/**/*.tsx'),
        join(root, 'packages/**/*.js'),
        join(root, 'netlify.toml')
      ],
      from: /lrns\-/g,
      to: `${name}-`
    });
  } catch (err) {
    spinner.fail();
    throw Error(`renaming packages failed: ${err}`);
  }
  spinner.succeed();
};

const createApp = async (config: LastRevConfig, githubApiWrapper: GithubApiWrapper): Promise<void> => {
  if (config.hasCompletedAction(ACTION_CREATE_APP)) {
    return;
  }

  await config.askAndUpdate(VAL_EXAMPLE_NAME, {
    name: VAL_EXAMPLE_NAME,
    message: 'Which starter do you want to use?',
    type: 'list',
    choices: ['lastrev-next-starter']
  });

  await githubApiWrapper.checkExampleExists(config.getStateValue(VAL_EXAMPLE_NAME));

  await createProjectRoot(config);
  await downloadAndExtractArchive(config, githubApiWrapper);
  await renamePackages(config);

  config.completeAction(ACTION_CREATE_APP);
};

const createGetGithubRepo = async (config: LastRevConfig, githubApiWrapper: GithubApiWrapper): Promise<void> => {
  if (config.hasCompletedAction(ACTION_CREATE_GITHUB_REPO)) {
    return;
  }

  await config.askAndUpdate(VAL_SHOULD_CREATE_GITHUB_REPO, {
    type: 'confirm',
    name: VAL_SHOULD_CREATE_GITHUB_REPO,
    message: `Do you want to create a new Github repository for your app?`,
    default: true
  });

  if (!config.getStateValue(VAL_SHOULD_CREATE_GITHUB_REPO)) {
    config.completeAction(ACTION_CREATE_GITHUB_REPO);
    return;
  }

  const orgs = await githubApiWrapper.listOrgsForAuthenticatedUser();

  await config.askAndUpdate(VAL_GITHUB_REPO_NAME, {
    type: 'input',
    name: VAL_GITHUB_REPO_NAME,
    message: 'What is the name of your new repository?',
    default: config.getStateValue(VAL_PROJECT_NAME),
    validate: async (input): Promise<string | boolean> => {
      return /^[a-zA-Z0-9-_]+$/.test(input)
        ? true
        : 'Repository name can only contain letters, numbers, dashes and underscores';
    }
  });

  await config.askAndUpdate(VAL_GITHUB_REPO_DESCRIPTION, {
    type: 'input',
    name: VAL_GITHUB_REPO_DESCRIPTION,
    message: 'Please enter a description for the new repository.',
    default: `The ${config.getStateValue(VAL_GITHUB_REPO_NAME)} monorepo`
  });

  await config.askAndUpdate(VAL_GITHUB_REPO_ORG, {
    type: 'list',
    name: VAL_GITHUB_REPO_ORG,
    message: 'Which org do you want to create the new repository in?',
    choices: orgs.map((org) => org.login)
  });

  await config.askAndUpdate(VAL_GITHUB_REPO_PRIVACY, {
    type: 'list',
    name: VAL_GITHUB_REPO_PRIVACY,
    message: 'Should the repository be public or private?',
    choices: ['public', 'private']
  });

  await config.askAndUpdate(VAL_GITHUB_REPO_HOMEPAGE, {
    type: 'input',
    name: VAL_GITHUB_REPO_HOMEPAGE,
    message: 'What is the homepage for this repository? (leave blank for none)'
  });

  await githubApiWrapper.createGithubRepoInOrg(orgs);

  config.completeAction(ACTION_CREATE_GITHUB_REPO);
};

const initGitRepo = async (config: LastRevConfig): Promise<void> => {
  if (config.hasCompletedAction(ACTION_GIT_INIT)) {
    return;
  }
  const git = simpleGit({
    baseDir: config.getStateValue(VAL_RESOLVED_APP_ROOT)
  });
  const repoGitUrl = config.getStateValue(`${VAL_GITHUB_REPO}.ssh_url`);
  await git.init();
  try {
    if (repoGitUrl) {
      await git.addRemote('origin', repoGitUrl);
    }
  } catch (err: any) {
    if (err.message.includes('remote origin already exists')) {
      messager.warn(
        `Remote origin already exists in the git repo. Skipping. Please add the origin ${repoGitUrl} manually.`
      );
    }
  }
  config.completeAction(ACTION_GIT_INIT);
};

const pushFirstCommitToGithub = async (config: LastRevConfig): Promise<void> => {
  if (config.hasCompletedAction(ACTION_PUSH_REPO_TO_GITHUB)) {
    return;
  }
  if (!config.getStateValue(VAL_SHOULD_CREATE_GITHUB_REPO)) {
    config.completeAction(ACTION_PUSH_REPO_TO_GITHUB);
    messager.warn(
      'It looks like a github repo was not created through this command, so you will have to manually push the repo to remote.'
    );
    return;
  }
  const git = simpleGit({
    baseDir: config.getStateValue(VAL_RESOLVED_APP_ROOT)
  });
  try {
    await git.add('./*');
    await git.commit('Initial commit');
    await git.branch(['-M', 'main']);
    await git.push('origin', 'main');
    messager.log('Initial commit pushed to git repo.');
    config.completeAction(ACTION_PUSH_REPO_TO_GITHUB);
  } catch (err: any) {
    throw Error(`git pushFirstCommitToGithub error: ${err.message}`);
  }
};

const updateBranchProtectionRules = async (
  config: LastRevConfig,
  githubApiWrapper: GithubApiWrapper
): Promise<void> => {
  if (config.hasCompletedAction(ACTION_UPDATE_GITHUB_BRANCH_PROTECTION_RULES)) {
    return;
  }
  await githubApiWrapper.updateBranchProtectionRules();
  config.completeAction(ACTION_UPDATE_GITHUB_BRANCH_PROTECTION_RULES);
};

const writeLocalEnvFile = async (config: LastRevConfig): Promise<void> => {
  if (config.hasCompletedAction(ACTION_WRITE_LOCAL_ENV_FILE)) {
    return;
  }
  const spinner = ora('Writing local .env file').start();
  try {
    const root = config.getStateValue(VAL_RESOLVED_APP_ROOT);
    const envFilePath = join(root, '.env');
    const envVars = {
      ...config.getStateValue(VAL_ENV_VARS),
      LOG_LEVEL: 'debug',
      CONTENTFUL_USE_PREVIEW: 'true'
    };
    const envLines = map(envVars, (value, key) => `${key}=${value}`);
    const content = envLines.join('\n');
    await writeFile(envFilePath, content);
    spinner.succeed('Wrote local .env file');
    config.completeAction(ACTION_WRITE_LOCAL_ENV_FILE);
  } catch (err: any) {
    spinner.fail();
    throw Error(`writeLocalEnvFile error: ${err.message}`);
  }
};

const performAppCreateFunctions = async (config: LastRevConfig, githubApiWrapper: GithubApiWrapper): Promise<void> => {
  await createApp(config, githubApiWrapper);
  await createGetGithubRepo(config, githubApiWrapper);
  await initGitRepo(config);
  await pushFirstCommitToGithub(config);
  await updateBranchProtectionRules(config, githubApiWrapper);
  await writeLocalEnvFile(config);
};

export default performAppCreateFunctions;
