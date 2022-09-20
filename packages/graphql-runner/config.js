require('dotenv').config();

const extensions = require('@ias/graphql-extensions');
const { resolve } = require('path');
const LastRevAppConfig = require('@last-rev/app-config');
// TODO extract this function into a package that doesnt required the runner
// const { parseBooleanEnvVar } = require('@ias/utils');
const parseBooleanEnvVar = (value = '') => {
  // values parsed as true: true, 1, yes, y, => ignore caps
  const val = value.toString().toLowerCase();
  return /^(true|1|yes|y)$/.test(val);
};
const parseNumberEnvVar = (value = '') => {
  if (!value.length) return undefined;
  const result = parseInt(value, 10);
  return Number.isNaN(result) ? undefined : result;
};
const config = new LastRevAppConfig({
  cms: 'Contentful',
  strategy: process.env.GRAPHQL_RUNNER_STRATEGY || 'fs',
  sites: [process.env.SITE],
  extensions,
  contentful: {
    contentPreviewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
    contentDeliveryToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    env: process.env.CONTENTFUL_ENV,
    usePreview: parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW),
    maxBatchSize: parseNumberEnvVar(process.env.CONTENTFUL_MAX_BATCH_SIZE),
    syncLimit: 50
  },
  algolia: {
    applicationId: process.env.ALGOLIA_APPLICATION_ID,
    adminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
    contentTypeIds: ['article'],
    indexDraftContent: parseBooleanEnvVar(process.env.ALGOLIA_INDEX_DRAFT_CONTENT)
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    tls: {},
    maxBatchSize: parseNumberEnvVar(process.env.CONTENTFUL_MAX_BATCH_SIZE)
  },
  fs: { contentDir: resolve(__dirname, './cms-sync') },
  logLevel: 'debug',
  paths: {
    version: 'v1'
  }
});

module.exports = config;
