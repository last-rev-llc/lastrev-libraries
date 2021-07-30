require('dotenv').config();

const extensions = require('lrns-graphql-extensions');

module.exports = {
  extensions,
  contentDeliveryToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
  contentPreviewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
  contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
  contentfulEnv: process.env.CONTENTFUL_ENV,
  contentDir: './cms-sync',
  logLevel: process.env.LOG_LEVEL || 'info'
};
