require('dotenv').config();

const config = require('../../../../config');

let handleWebhook;

if (process.env.CMS === 'Sanity') {
  handleWebhook = require('@last-rev/sanity-webhook-handler');
} else {
  handleWebhook = require('@last-rev/contentful-webhook-handler');
}

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
