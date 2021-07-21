require('dotenv').config();

// const extensions = require('lrns-graphql-extensions');

module.exports = {
  // extensions,
  contentfulAccessToken: process.env.CONTENTFUL_ACCESSTOKEN,
  contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
  contentfulEnv: process.env.CONTENTFUL_ENV,
  contentfulHost: process.env.CONTENTFUL_HOST,
  contentDir: './cms-sync'
};
