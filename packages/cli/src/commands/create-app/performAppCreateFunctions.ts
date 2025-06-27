import { join } from 'path';
import { replaceInFile } from 'replace-in-file';
import { writeFile, readFile } from 'fs-extra';
import GithubApiWrapper from './apiWrappers/GithubApiWrapper';
import simpleGit from 'simple-git';
import {
  LastRevConfig,
  VAL_CREATE_APP_CONFIG,
  VAL_SKIP_GIT_PUSH,
  VAL_GITHUB_REPO,
  ACTION_EXTRACT_ARCHIVE,
  ACTION_CREATE_APP,
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
import { CreateAppConfig } from './types';

const messager = Messager.getInstance();

const downloadAndExtractArchive = async (config: LastRevConfig, githubApiWrapper: GithubApiWrapper): Promise<void> => {
  if (config.hasCompletedAction(ACTION_EXTRACT_ARCHIVE)) {
    return;
  }

  const root = process.cwd();

  const result = await githubApiWrapper.downloadLastrevStarterTarballArchive();

  const spinner = ora('Extracting code from archive').start();
  try {
    await new Promise((resolve, reject) => {
      https.get(result.url, (res) => {
        res.on('end', resolve);

        res.on('error', reject);

        res.pipe(
          tar.extract({
            cwd: root,
            strip: 1
          })
        );
      });
    });
    spinner.succeed();
    config.completeAction(ACTION_EXTRACT_ARCHIVE);
  } catch (err) {
    spinner.fail();
    throw Error(`Error untarring archive: ${err.message}`);
  }
};

const renamePackages = async ({ app }: CreateAppConfig): Promise<void> => {
  const spinner = ora('Renaming packages').start();
  const root = process.cwd();
  const name = app!.name!;

  try {
    await replaceInFile({
      glob: {
        dot: true
      },
      files: join(root, '**/*'),
      ignore: [join(root, '**/node_modules/**'), join(root, '**/.git/**')],
      from: /@lrns/g,
      to: `@${name}`
    });
  } catch (err) {
    spinner.fail();
    throw Error(`renaming packages failed: ${err}`);
  }
  spinner.succeed();
};

const createApp = async (
  config: LastRevConfig,
  createAppConfig: CreateAppConfig,
  githubApiWrapper: GithubApiWrapper
): Promise<void> => {
  if (config.hasCompletedAction(ACTION_CREATE_APP)) {
    return;
  }

  await downloadAndExtractArchive(config, githubApiWrapper);
  await renamePackages(createAppConfig);

  config.completeAction(ACTION_CREATE_APP);
};

const createGetGithubRepo = async (
  config: LastRevConfig,
  { app }: CreateAppConfig,
  githubApiWrapper: GithubApiWrapper
): Promise<void> => {
  if (config.hasCompletedAction(ACTION_CREATE_GITHUB_REPO)) {
    return;
  }

  const currentUserLogin = await githubApiWrapper.getCurrentUserLogin();

  const repoOwner = app!.repoOwner || currentUserLogin;

  const existingRepo = await githubApiWrapper.userHasRepoAccess(app!.repoName!, repoOwner);

  if (existingRepo) {
    config.updateStateValue(VAL_GITHUB_REPO, existingRepo);
    config.updateStateValue(VAL_SKIP_GIT_PUSH, true);
    config.completeAction(ACTION_CREATE_GITHUB_REPO);
    return;
  }

  await githubApiWrapper.createGithubRepoInOrg(repoOwner);

  config.completeAction(ACTION_CREATE_GITHUB_REPO);
};

const initGitRepo = async (config: LastRevConfig): Promise<void> => {
  if (config.hasCompletedAction(ACTION_GIT_INIT)) {
    return;
  }
  const git = simpleGit({
    baseDir: process.cwd()
  });
  const repoGitUrl = config.getStateValue(`${VAL_GITHUB_REPO}.ssh_url`);
  await git.init();
  try {
    if (repoGitUrl) {
      await git.addRemote('origin', repoGitUrl);
    }
  } catch (err) {
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
  if (config.getStateValue(VAL_SKIP_GIT_PUSH)) {
    config.completeAction(ACTION_PUSH_REPO_TO_GITHUB);
    messager.warn(
      'It looks like a github repo was not created through this command, so you will have to manually push the repo to remote.'
    );
    return;
  }
  const git = simpleGit({
    baseDir: process.cwd()
  });
  try {
    await git.add('./*');
    await git.commit('Initial commit');
    await git.branch(['-M', 'main']);
    await git.push('origin', 'main', ['-u']);
    messager.log('Initial commit pushed to git repo.');
    config.completeAction(ACTION_PUSH_REPO_TO_GITHUB);
  } catch (err) {
    throw Error(`git pushFirstCommitToGithub error: ${err.message}`);
  }
};

const updateBranchProtectionRules = async (
  config: LastRevConfig,
  githubApiWrapper: GithubApiWrapper
): Promise<void> => {
  if (
    config.getStateValue(VAL_SKIP_GIT_PUSH) ||
    config.hasCompletedAction(ACTION_UPDATE_GITHUB_BRANCH_PROTECTION_RULES)
  ) {
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
    const root = process.cwd();
    const envFilePath = join(root, '.env');
    const templatePath = join(root, '.env.template');
    const template = await readFile(templatePath, 'utf8');
    const lines = template.split(/\r?\n/);

    const envVars = {
      ...config.getStateValue(VAL_ENV_VARS),
      LOG_LEVEL: 'debug',
      CONTENTFUL_USE_PREVIEW: 'true',
      GRAPHQL_SERVER_URL: 'http://localhost:5000/graphql',
      DOMAIN: 'http://localhost:3000'
    };

    const usedKeys: string[] = [];

    const envLines = lines.map((line) => {
      if (!line || line.startsWith('#')) {
        return line;
      }

      const [key] = line.split('=');
      usedKeys.push(key);
      const val = envVars[key] || envVars[key.replace(/^NEXT_PUBLIC_/, '')] || '';
      const pre = val ? '' : '#';
      return `${pre}${key}=${val}`;
    });

    Object.keys(envVars).forEach((key) => {
      if (!usedKeys.includes(key)) {
        envLines.push(`${key}=${envVars[key]}`);
      }
    });

    const content = envLines.join('\n');
    await writeFile(envFilePath, content);
    spinner.succeed('Wrote local .env file');
    config.completeAction(ACTION_WRITE_LOCAL_ENV_FILE);
  } catch (err) {
    spinner.fail();
    throw Error(`writeLocalEnvFile error: ${err.message}`);
  }
};

const performAppCreateFunctions = async (config: LastRevConfig, githubApiWrapper: GithubApiWrapper): Promise<void> => {
  const createAppConfig: CreateAppConfig = config.getStateValue(VAL_CREATE_APP_CONFIG);
  await createApp(config, createAppConfig, githubApiWrapper);
  await createGetGithubRepo(config, createAppConfig, githubApiWrapper);
  await initGitRepo(config);
  await pushFirstCommitToGithub(config);
  await updateBranchProtectionRules(config, githubApiWrapper);
  await writeLocalEnvFile(config);
};

export default performAppCreateFunctions;
