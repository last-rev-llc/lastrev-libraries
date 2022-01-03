require('dotenv').config();

const { createHandler } = require('@last-rev/graphql-contentful-core');
let config = require('../../shared/config');

module.exports.handler = async (event, context, cb) => {
  const { queryStringParameters } = event;

  if (queryStringParameters && queryStringParameters.env && queryStringParameters.env !== config.contentful.env) {
    config = config.clone({
      contentful: {
        env: queryStringParameters.env
      }
    });
  }

  const handle = createHandler(config);

  return handle({ ...event, requestContext: { elb: true } }, context, cb);
};
