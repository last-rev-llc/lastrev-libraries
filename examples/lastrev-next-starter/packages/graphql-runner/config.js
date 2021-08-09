require('dotenv').config();
const extensions = require('lrns-graphql-extensions');

module.exports = {
  extensions,
  contentPreviewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
  contentDeliveryToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
  contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
  contentfulEnv: process.env.CONTENTFUL_ENV,
  contentDir: './cms-sync',
  logLevel: process.env.LOG_LEVEL || 'info'
};
