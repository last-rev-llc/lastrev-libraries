import envPaths from 'env-paths';
import { join } from 'path';
import Configstore from 'configstore';
import { isNil } from 'lodash';
import { DistinctQuestion, prompt } from 'inquirer';
import Messager from './Messager';

import { version } from '../../../package.json';

const messager = Messager.getInstance();

const OSBasedPaths = envPaths('last-rev', { suffix: '' });

export const VAL_SELECTED_ACTIONS = 'selectedActions';
export const VAL_RESOLVED_APP_ROOT = 'resolvedAppRoot';
export const VAL_EXAMPLE_NAME = 'exampleName';
export const VAL_PARENT_DIR = 'parentDir';
export const VAL_PROJECT_NAME = 'projectName';
export const VAL_SHOULD_CREATE_GITHUB_REPO = 'shouldCreateGithubRepo';
export const VAL_GITHUB_REPO_NAME = 'githubRepoName';
export const VAL_GITHUB_REPO_DESCRIPTION = 'githubRepoDescription';
export const VAL_GITHUB_REPO_ORG = 'githubRepoOrg';
export const VAL_GITHUB_REPO_PRIVACY = 'githubRepoPrivacy';
export const VAL_GITHUB_REPO_HOMEPAGE = 'githubRepoHomepage';
export const VAL_GITHUB_REPO_URL = 'githubRepoUrl';
export const VAL_GITHUB_REPO = 'githubRepo';
export const VAL_CONTENTFUL_EXPORT_SPACE_ID = 'contentfulExportSpaceId';
export const VAL_CONTENTFUL_EXPORT_ENV_ID = 'contentfulExportEnvId';
export const VAL_CONTENTFUL_SPACE_ID = 'contentfulSpaceId';
export const VAL_CONTENTFUL_ENV_ID = 'contentfulEnvId';
export const VAL_CONTENTFUL_MIGRATE_CMS_TYPES = 'contentfulMigrateCmsTypes';
export const VAL_CONTENTFUL_DELIVERY_KEY = 'contentfulDeliveryKey';
export const VAL_CONTENTFUL_PREVIEW_KEY = 'contentfulPreviewKey';
export const VAL_NETLIFY_SITE_NAME = 'netlifySiteName';
export const VAL_NETLIFY_ACCOUNT_SLUG = 'netlifyAccountSlug';
export const VAL_NETLIFY_SITE = 'netlifySite';
export const VAL_NETLIFY_DEPLOY_KEY = 'netlifyDeployKey';
export const VAL_SHOULD_FETCH_GITHUB_REPO = 'shouldFetchGithubRepo';
export const VAL_SHOULD_INSTALL_DEPENDENCIES = 'shouldInstallDependencies';
export const VAL_REDIS_HOST = 'redisHost';
export const VAL_REDIS_PORT = 'redisPort';
export const VAL_REDIS_PASSWORD = 'redisPassword';
export const VAL_ENV_VARS = 'envVars';
export const VAL_CONTENTFUL_PROCEED_WITH_MIGRATION = 'contentfulProceedWithMigration';

export const ACTION_DETERMINE_ACTIONS = 'determineActions';
export const ACTION_EXTRACT_ARCHIVE = 'extractArchive';
export const ACTION_CREATE_APP = 'createApp';
export const ACTION_CREATE_PROJECT_ROOT_DIR = 'createProjectRootDir';
export const ACTION_CREATE_GITHUB_REPO = 'createGithubRepo';
export const ACTION_GIT_INIT = 'gitInit';
export const ACTION_PUSH_REPO_TO_GITHUB = 'pushRepoToGithub';
export const ACTION_UPDATE_GITHUB_BRANCH_PROTECTION_RULES = 'updateGithubBranchProtectionRules';
export const ACTION_NETLIFY_ADD_DEPLOY_KEY = 'netlifyAddDeployKey';
export const ACTION_CONTENTFUL_MIGRATION = 'contentfulMigration';
export const ACTION_PICK_NETLIFY_ACCOUNT = 'pickNetlifyAccount';
export const ACTION_CREATE_NETLIFY_SITE = 'createNetlifySite';
export const ACTION_NETLIFY_ADD_DEPLOY_HOOK = 'netlifyAddDeployHook';
export const ACTION_NETLIFY_ADD_NOTIFICATION_HOOKS = 'netlifyAddNotificationHook';
export const ACTION_ADD_GITHUB_REPO_TO_NETLIFY = 'addGithubRepoToNetlify';
export const ACTION_UPDATE_NETLIFY_BUILD_ENV = 'updateNetlifyBuildEnv';
export const ACTION_WRITE_LOCAL_ENV_FILE = 'writeLocalEnvFile';

type CliState = {
  messages: string[];
  completedActions: Record<string, boolean>;
  inProgress: boolean;
  values: Record<string, any>;
  version: string;
};

const emptyState: CliState = {
  messages: [],
  values: {},
  completedActions: {},
  inProgress: false,
  version
};

const defaults = {
  cli: {
    providers: {
      github: {
        token: null
      },
      netlify: {
        token: null
      },
      contentful: {
        token: null
      }
    },
    state: emptyState
  }
};

const stateRootKey = 'cli.state';

export default class LastRevConfig {
  private _config: Configstore;

  constructor() {
    const configPath = join(OSBasedPaths.config, 'config.json');
    this._config = new Configstore('', defaults, { configPath });
    if (!this.inProgress()) {
      this.clearState();
    }
  }

  startProgress(): void {
    this.set(`${stateRootKey}.inProgress`, true);
  }

  get(key: string): any {
    return this._config.get(key);
  }

  set(key: string, value: any): void {
    return this._config.set(key, value);
  }

  getStateValue(key: string): any {
    return this.get(`${stateRootKey}.values.${key}`);
  }

  updateStateValue(key: string, value: any): void {
    this.set(`${stateRootKey}.values.${key}`, value);
  }

  completeAction(action: string): void {
    this.set(`${stateRootKey}.completedActions.${action}`, true);
  }

  hasCompletedAction(action: string): boolean {
    return !!this.get(`${stateRootKey}.completedActions.${action}`);
  }

  clearState(): void {
    this.set(stateRootKey, emptyState);
  }

  inProgress(): boolean {
    // We can't trust a previous version of the state to have the everything we need, so we check that versions match.
    return this.get(`${stateRootKey}.version`) === version && !!this.get(`${stateRootKey}.inProgress`);
  }

  getStateMessages(): string[] {
    return this.get(`${stateRootKey}.messages`);
  }

  setStateMessages(messages: string[]): void {
    this.set(`${stateRootKey}.messages`, messages);
  }

  async askAndUpdate(valKey: string, question: DistinctQuestion<any>): Promise<void> {
    if (isNil(this.getStateValue(valKey))) {
      messager.log('');
      const answers = await prompt({
        ...question,
        name: valKey
      });
      this.updateStateValue(valKey, answers[valKey]);
      messager.log('');
    }
  }
}
