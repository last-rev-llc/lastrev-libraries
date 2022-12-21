require('dotenv').config();

const LastRevAppConfig = require('@last-rev/app-config');
const extensions = require('@lrns/graphql-extensions');
const { resolve } = require('path');

const testForEnvVar = (name) => {
  const envVar = process.env[name];
  if (!envVar) {
    throw Error(`Environment variable ${name} is required`);
  }
  return envVar;
};

const parseNumberEnvVar = (value = '') => {
  if (!value.length) return undefined;
  const result = parseInt(value, 10);
  return isNaN(result) ? undefined : result;
};

const spaceId = testForEnvVar('CONTENTFUL_SPACE_ID');
const contentDeliveryToken = testForEnvVar('CONTENTFUL_DELIVERY_TOKEN');
const contentPreviewToken = testForEnvVar('CONTENTFUL_PREVIEW_TOKEN');
const env = testForEnvVar('CONTENTFUL_ENV');
const parseBooleanEnvVar = (value = '') => {
  // values parsed as true: true, 1, yes, y, => ignore caps
  const val = value.toString().toLowerCase();
  return /^(true|1|yes|y)$/.test(val);
};

const config = new LastRevAppConfig({
  cms: 'Contentful',
  strategy: process.env.GRAPHQL_RUNNER_STRATEGY || 'fs',
  sites: [process.env.SITE],
  extensions,
  contentful: {
    contentPreviewToken,
    contentDeliveryToken,
    spaceId,
    env,
    usePreview: parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW),
    maxBatchSize: parseNumberEnvVar(process.env.CONTENTFUL_MAX_BATCH_SIZE)
  },
  algolia: {
    applicationId: process.env.ALGOLIA_APPLICATION_ID,
    adminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
    contentTypeIds: ['blog'],
    indexDraftContent: parseBooleanEnvVar(process.env.ALGOLIA_INDEX_DRAFT_CONTENT)
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME,
    tls: {},
    maxBatchSize: parseNumberEnvVar(process.env.REDIS_MAX_BATCH_SIZE)
  },
  logLevel: 'debug',
  fs: {
    contentDir: resolve(__dirname, './packages/graphql-runner/cms-sync')
  },
  apolloServerOptions: {
    introspection: true
  }
});

module.exports = config;
