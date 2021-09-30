require('dotenv').config();

const { createHandler } = require('@last-rev/graphql-contentful-core');

const extensions = require('@lrns/graphql-extensions');

const testForEnvVar = (name) => {
  const envVar = process.env[name];
  if (!envVar) {
    throw Error(`Environment variable ${name} is required`);
  }
  return envVar;
};

const spaceId = testForEnvVar('CONTENTFUL_SPACE_ID');
const contentDeliveryToken = testForEnvVar('CONTENTFUL_DELIVERY_TOKEN');
const contentPreviewToken = testForEnvVar('CONTENTFUL_PREVIEW_TOKEN');
const environment = testForEnvVar('CONTENTFUL_ENV');

module.exports.handler = async (event, context, cb) => {
  const { queryStringParameters } = event;

  const handle = createHandler({
    cms: 'Contentful',
    environment: queryStringParameters.env || environment,
    spaceId,
    contentDeliveryToken,
    contentPreviewToken,
    extensions,
    loaderType: 'cms',
    logLevel: process.env.LOG_LEVEL
  });

  return handle({ ...event, requestContext: { elb: true } }, context, cb);
};
