require('dotenv').config();

const LastRevAppConfig = require('@last-rev/app-config');
const extensions = require('graphql-extensions');
const { resolve } = require('path');
// const { ApolloServerPluginInlineTrace } = require('@apollo/server/plugin/inlineTrace');
// const Keyv = require('keyv');
// const { KeyvAdapter } = require('@apollo/utils.keyvadapter');
// const { ErrorsAreMissesCache } = require('@apollo/utils.keyvaluecache');
// const KeyvRedis = require('@keyv/redis');

// const Redis = require('ioredis');

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
  return Number.isNaN(result) ? undefined : result;
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
  contentStrategy: process.env.NODE_ENV !== 'production' ? 'fs' : undefined,
  cmsCacheStrategy: 'redis',
  sites: [process.env.SITE],
  extensions,
  graphql: { port: 8888 },
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
    contentDir: resolve(__dirname, '.cms-sync')
  },
  sitemap: {
    domain: `${process.env.DOMAIN}`,
    excludePages: ['error_404']
  },
  apolloServerOptions: {
    introspection: true
    // plugins: [ApolloServerPluginInlineTrace()],
    // cache: new ErrorsAreMissesCache(
    //   new KeyvAdapter(
    //     new Keyv({
    //       store: new KeyvRedis(
    //         new Redis({
    //           port: process.env.REDIS_PORT,
    //           host: process.env.REDIS_HOST,
    //           password: process.env.REDIS_PASSWORD,
    //           username: process.env.REDIS_USERNAME,
    //           tls: {}
    //         })
    //       )
    //     })
    //   )
    // )
  },
  features: {
    disableCoreSidekickLookup: true
  }
});

module.exports = config;
