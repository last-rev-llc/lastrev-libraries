import { isNil } from 'lodash';
import { DistinctQuestion, prompt } from 'inquirer';
import Messager from './Messager';

import { version } from '../../../package.json';
import getLastRevConfig, { emptyState } from '../../helpers/getLastRevConfig';
import Configstore from 'configstore';

const messager = Messager.getInstance();

export const VAL_CREATE_APP_CONFIG = 'createAppConfig';

export const VAL_SKIP_GIT_PUSH = 'skipGitPush';

// export const VAL_GITHUB_REPO_URL = 'githubRepoUrl';
export const VAL_GITHUB_REPO = 'githubRepo';

export const VAL_CONTENTFUL_DELIVERY_KEY = 'contentfulDeliveryKey';
export const VAL_CONTENTFUL_PREVIEW_KEY = 'contentfulPreviewKey';
export const VAL_CONTENTFUL_DEFAULT_SITE_ID = 'contentfulDefaultSiteId';
export const VAL_CONTENTFUL_DEFAULT_SITE_KEY = 'contentfulDefaultSiteKey';

export const VAL_NETLIFY_SITE = 'netlifySite';
export const VAL_NETLIFY_DEPLOY_KEY = 'netlifyDeployKey';
export const VAL_NETLIFY_BUILD_HOOK = 'netlifyBuildHook';

export const VAL_ENV_VARS = 'envVars';
export const VAL_CONTENTFUL_PROCEED_WITH_MIGRATION = 'contentfulProceedWithMigration';

export const ACTION_DETERMINE_ACTIONS = 'determineActions';
export const ACTION_EXTRACT_ARCHIVE = 'extractArchive';
export const ACTION_CREATE_APP = 'createApp';
export const ACTION_CREATE_GITHUB_REPO = 'createGithubRepo';
export const ACTION_GIT_INIT = 'gitInit';
export const ACTION_PUSH_REPO_TO_GITHUB = 'pushRepoToGithub';
export const ACTION_UPDATE_GITHUB_BRANCH_PROTECTION_RULES = 'updateGithubBranchProtectionRules';
export const ACTION_NETLIFY_ADD_DEPLOY_KEY = 'netlifyAddDeployKey';
export const ACTION_CONTENTFUL_MIGRATION = 'contentfulMigration';
export const ACTION_CREATE_NETLIFY_SITE = 'createNetlifySite';
export const ACTION_NETLIFY_ADD_DEPLOY_HOOK = 'netlifyAddDeployHook';
export const ACTION_NETLIFY_ADD_NOTIFICATION_HOOKS = 'netlifyAddNotificationHook';
export const ACTION_ADD_GITHUB_REPO_TO_NETLIFY = 'addGithubRepoToNetlify';
export const ACTION_UPDATE_NETLIFY_BUILD_ENV = 'updateNetlifyBuildEnv';
export const ACTION_WRITE_LOCAL_ENV_FILE = 'writeLocalEnvFile';
export const ACTION_CONTENTFUL_MIGRATE_EXTENSIONS = 'contentfulMigrateExtensions';
export const ACTION_CREATE_CONTENTFUL_CACHE_WEBHOOK = 'createContentfulCacheWebhook';
export const ACTION_CREATE_CONTENTFUL_PROD_WEBHOOK = 'createContentfulProdWebhook';

const stateRootKey = 'cli.state';

export default class LastRevConfig {
  private _config: Configstore;

  constructor() {
    this._config = getLastRevConfig();
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
