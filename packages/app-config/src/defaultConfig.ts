import { LastRevAppConfigArgs } from './types';

const defaultConfig: LastRevAppConfigArgs = {
  cms: 'Contentful',
  strategy: 'fs',
  contentful: {
    env: 'master',
    usePreview: false
  },
  logLevel: 'warn',
  graphql: {
    port: 5000,
    host: 'localhost'
  },
  sites: []
};

export default defaultConfig;
