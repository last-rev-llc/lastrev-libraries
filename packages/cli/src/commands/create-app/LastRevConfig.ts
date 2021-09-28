import envPaths from 'env-paths';
import { join } from 'path';
import Configstore from 'configstore';
import { isNil } from 'lodash';
import { DistinctQuestion, prompt } from 'inquirer';

const OSBasedPaths = envPaths('last-rev', { suffix: '' });

export const DETERMINE_ACTIONS_ACTION = 'determineActions';

export const CREATE_APP_ACTION = 'createApp';
export const CA_CREATE_APP_SUB_ACTION = 'createApp';
export const CA_CREATE_REPO_SUB_ACTION = 'createRepo';
export const CA_INIT_GIT_SUB_ACTION = 'initGit';

export const MIGRATE_CONTENT_ACTION = 'migrateContent';

export const SETUP_NETLIFY_ACTION = 'setupNetlify';
export const SN_PICK_ACCOUNT_SUB_ACTION = 'pickAccount';
export const SN_CREATE_SITE_SUB_ACTION = 'createSite';
export const SN_ADD_GITHUB_REPO_SUB_ACTION = 'addGithubRepo';
export const SN_CREATE_DEPLOY_KEY_SUB_ACTION = 'createDeployKey';
export const SN_ADD_DEPLOY_HOOK_SUB_ACTION = 'addDeployHook';
export const SN_ADD_NOTIFICATION_HOOK_SUB_ACTION = 'addNotificationHook';

type CliStateItem = {
  values: Record<string, any>;
  completedActions: [];
  shouldPerform: boolean;
  hasPerformed: boolean;
};

type CliState = {
  createApp: CliStateItem;
  migrateContent: CliStateItem;
  setupNetlify: CliStateItem;
  determineActions: CliStateItem;
  inProgress: boolean;
};

const emptyStateItem: CliStateItem = {
  values: {},
  completedActions: [],
  shouldPerform: true,
  hasPerformed: false
};

const emptyState: CliState = {
  createApp: emptyStateItem,
  migrateContent: emptyStateItem,
  setupNetlify: emptyStateItem,
  determineActions: emptyStateItem,
  inProgress: false
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
    console.log('configPath', configPath);
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

  getStateRootKey(): string {
    return 'cli.state';
  }

  getStateValueKey(action: string, valKey: string): string {
    return `${stateRootKey}.${action}.values.${valKey}`;
  }

  getStateActionsKey(action: string): string {
    return `${stateRootKey}.${action}.action`;
  }

  getStateHasPerformedKey(action: string): string {
    return `${stateRootKey}.${action}.hasPerformed`;
  }

  getStateShouldPerformKey(action: string): string {
    return `${stateRootKey}.${action}.shouldPerform`;
  }

  getStateValue(action: string, key: string): any {
    return this.get(this.getStateValueKey(action, key));
  }

  updateStateValue(action: string, key: string, value: any): void {
    this.set(this.getStateValueKey(action, key), value);
  }

  completeAction(action: string): void {
    this.set(this.getStateHasPerformedKey(action), true);
  }

  completeSubAction(action: string, subAction: string): void {
    const subActions = this.get(`${this.getStateActionsKey(action)}.completedActions`) || [];
    subActions.push(subAction);
    this.set(`${this.getStateActionsKey(action)}.completedActions`, subActions);
  }

  hasCompletedAction(action: string): boolean {
    const shouldPerform = this.get(this.getStateShouldPerformKey(action));
    const hasPerformed = this.get(this.getStateHasPerformedKey(action));
    return hasPerformed || !shouldPerform;
  }

  hasCompletedSubAction(action: string, subAction: string): boolean {
    const completedActions = this.get(`${this.getStateActionsKey(action)}.completedActions`) || [];
    return completedActions.includes(subAction);
  }

  clearState(): void {
    this.set(stateRootKey, emptyState);
  }

  inProgress(): boolean {
    return !!this.get(`${stateRootKey}.inProgress`);
  }

  async askAndUpdate(action: string, valKey: string, question: DistinctQuestion<any>): Promise<void> {
    if (isNil(this.getStateValue(action, valKey))) {
      const answers = await prompt({
        ...question,
        name: valKey
      });
      this.updateStateValue(action, valKey, answers[valKey]);
    }
  }
}
