require('dotenv').config();

const LastRevAppConfig = require('@last-rev/app-config');
const extensions = require('@ias/graphql-extensions');

const testForEnvVar = (name) => {
  const envVar = process.env[name];
  if (!envVar) {
    throw Error(`Environment variable ${name} is required`);
  }
  return envVar;
};

export const parseBooleanEnvVar = (value) => {
  // values parsed as true: true, 1, yes, y, => ignore caps
  const val = value.toString().toLowerCase();
  return /^(true|1|yes|y)$/.test(val);
};


const spaceId = testForEnvVar('CONTENTFUL_SPACE_ID');
const contentDeliveryToken = testForEnvVar('CONTENTFUL_DELIVERY_TOKEN');
const contentPreviewToken = testForEnvVar('CONTENTFUL_PREVIEW_TOKEN');
const env = testForEnvVar('CONTENTFUL_ENV');

const config = new LastRevAppConfig({
  cms: 'Contentful',
  strategy: 'redis',
  sites: [process.env.SITE],
  extensions,
  contentful: {
    contentPreviewToken,
    contentDeliveryToken,
    spaceId,
    env,
    usePreview: parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW)
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    tls: {}
  },
  logLevel: 'debug'
});

module.exports = config;
