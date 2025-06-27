import NetlifyApiWrapper from './apiWrappers/NetlifyApiWrapper';
import GithubApiWrapper from './apiWrappers/GithubApiWrapper';
import {
  LastRevConfig,
  VAL_GITHUB_REPO,
  ACTION_NETLIFY_ADD_DEPLOY_KEY,
  ACTION_NETLIFY_ADD_DEPLOY_HOOK,
  ACTION_NETLIFY_ADD_NOTIFICATION_HOOKS,
  ACTION_ADD_GITHUB_REPO_TO_NETLIFY,
  VAL_CREATE_APP_CONFIG,
  ACTION_CREATE_NETLIFY_SITE
} from './LastRevConfig';
import ora from 'ora';
import { CreateAppConfig } from './types';
import Messager from './Messager';

const messager = Messager.getInstance();

const getSiteName = (type: 'dev' | 'prod' | 'storybook', netlify: CreateAppConfig['netlify']) => {
  switch (type) {
    case 'dev':
      return netlify!.devSiteName!;
    case 'prod':
      return netlify!.prodSiteName!;
    case 'storybook':
      return netlify!.storybookSiteName!;
  }
};

const createNetlifySite = async (
  config: LastRevConfig,
  { app, netlify }: CreateAppConfig,
  type: 'dev' | 'prod' | 'storybook',
  netlifyApiWrapper: NetlifyApiWrapper
): Promise<any> => {
  const action = `${ACTION_CREATE_NETLIFY_SITE}-${type}`;
  if (config.hasCompletedAction(action)) {
    return;
  }

  const siteName = getSiteName(type, netlify) || `${app!.name!}-${type}`;
  await netlifyApiWrapper.createSiteInTeam(siteName, netlify!.accountSlug!, type);
  config.completeAction(action);
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

const addDeployHook = async (config: LastRevConfig, type: string, githubApiWrapper: GithubApiWrapper) => {
  const action = `${ACTION_NETLIFY_ADD_DEPLOY_HOOK}-${type}`;
  if (config.hasCompletedAction(action)) {
    return;
  }
  await githubApiWrapper.createWebhookForNetlifSite(type);
  config.completeAction(action);
};

const addNotificationHooks = async (
  config: LastRevConfig,
  githubToken: string,
  type: string,
  netlifyApiWrapper: NetlifyApiWrapper
) => {
  const spinner = ora(`Adding Netlify notification hooks for ${type} site`).start();
  const action = `${ACTION_NETLIFY_ADD_NOTIFICATION_HOOKS}-${type}`;
  if (config.hasCompletedAction(action)) {
    return;
  }

  try {
    await Promise.all(
      ['deploy_created', 'deploy_failed', 'deploy_building'].map(
        async (event) => await netlifyApiWrapper.createHookBySiteId(event, githubToken, type)
      )
    );
    spinner.succeed();
    config.completeAction(action);
  } catch (err) {
    spinner.fail();
    throw err;
  }
};

const addGithubRepoToSite = async (
  config: LastRevConfig,
  type: string,
  githubApiWrapper: GithubApiWrapper,
  netlifyApiWrapper: NetlifyApiWrapper
): Promise<void> => {
  const action = `${ACTION_ADD_GITHUB_REPO_TO_NETLIFY}-${type}`;
  if (config.hasCompletedAction(action)) {
    return;
  }

  const githubRepository = config.getStateValue(VAL_GITHUB_REPO);

  if (!githubRepository) {
    messager.log(`No github repo found. Skipping github linking for ${type} Netlify site.`);

    config.completeAction(action);
    return;
  }

  await netlifyApiWrapper.updateSiteWithRepo(type);
  await addDeployHook(config, type, githubApiWrapper);
  await addNotificationHooks(config, githubApiWrapper.getToken()!, type, netlifyApiWrapper);

  config.completeAction(action);
};

const performNetlifyFunctions = async (
  config: LastRevConfig,
  netlifyApiWrapper: NetlifyApiWrapper,
  githubApiWrapper: GithubApiWrapper
) => {
  const createAppConfig: CreateAppConfig = config.getStateValue(VAL_CREATE_APP_CONFIG);

  await addDeployKey(config, githubApiWrapper, netlifyApiWrapper);

  const siteTypes: ('dev' | 'prod' | 'storybook')[] = ['dev', 'prod', 'storybook'];
  for (const type of siteTypes) {
    await createNetlifySite(config, createAppConfig, type, netlifyApiWrapper);
    await addGithubRepoToSite(config, type, githubApiWrapper, netlifyApiWrapper);
    // TODO: update netlify with env key
  }
};

export default performNetlifyFunctions;
