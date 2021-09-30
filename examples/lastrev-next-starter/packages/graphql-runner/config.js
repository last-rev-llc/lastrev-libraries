require('dotenv').config();

const extensions = require('@lrns/graphql-extensions');
const { resolve } = require('path');
const LastRevAppConfig = require('@last-rev/app-config');
const { parseBooleanEnvVar } = require('@lrns/utils');

const config = new LastRevAppConfig({
  cms: 'Contentful',
  strategy: 'fs',
  sites: [process.env.SITE],
  extensions,
  contentful: {
    contentPreviewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
    contentDeliveryToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    env: process.env.CONTENTFUL_ENV,
    usePreview: parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW)
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    tls: {}
  },
  fs: { contentDir: resolve(__dirname, './cms-sync') },
  logLevel: 'debug'
});

module.exports = config;
