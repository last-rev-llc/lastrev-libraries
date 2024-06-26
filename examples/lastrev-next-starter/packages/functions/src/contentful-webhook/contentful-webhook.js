require('dotenv').config();

const handleWebhook = require('@last-rev/contentful-webhook-handler');
const config = require('../../../../config');

module.exports.handler = async (event) => {
  try {
    await handleWebhook(
      config.clone({
        contentStrategy: 'cms',
        cmsCacheStrategy: 'redis'
      }),
      JSON.parse(event.body),
      event.headers
    );
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/plain' },
      body: `Success`
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: `There was an error, we are on it. ${err}`
    };
  }
};
