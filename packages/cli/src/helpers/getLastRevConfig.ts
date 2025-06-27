import { version } from '../../package.json';
import { join } from 'path';
import Configstore from 'configstore';
import envPaths from 'env-paths';

const OSBasedPaths = envPaths('last-rev', { suffix: '' });

type CliState = {
  messages: string[];
  completedActions: Record<string, boolean>;
  inProgress: boolean;
  values: Record<string, any>;
  version: string;
};

export const emptyState: CliState = {
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
  },
  develop: {
    librariesLocation: null,
    projects: {}
  }
};

export const getLastRevConfig = () => {
  const configPath = join(OSBasedPaths.config, 'config.json');
  return new Configstore('', defaults, { configPath });
};
