require('dotenv').config();

const { createHandler } = require('@last-rev/graphql-contentful-core');

const extensions = require('lrns-graphql-extensions');

const testForEnvVar = (name) => {
  const envVar = process.env[name];
  if (!envVar) {
    throw Error(`Environment variable ${name} is required`);
  }
  return envVar;
};

const apiUrl = testForEnvVar('LAST_REV_API_URL');
const apiKey = testForEnvVar('LAST_REV_API_KEY');
const spaceId = testForEnvVar('CONTENTFUL_SPACE_ID');
const accessToken = testForEnvVar('CONTENTFUL_ACCESSTOKEN');
const environment = testForEnvVar('CONTENTFUL_ENV');

module.exports.handler = async (event, context, cb) => {
  const handle = createHandler({
    cms: 'Contentful',
    environment,
    spaceId,
    accessToken,
    extensions,
    apiUrl,
    apiKey,
    isPreview: true,
    loaderType: 's3'
  });

  return handle({ ...event, requestContext: { elb: true } }, context, cb);
};
