/* eslint-disable no-console */
require('dotenv').config();

const { generateSitemap } = require('@last-rev/sitemap-generator');
const { resolve } = require('path');
const config = require('../../../config');
const { graphqlEndpoint } = require('@lrns/utils');

generateSitemap({
  config,
  graphqlEndpoint,
  outdir: resolve(__dirname, '../public'),
  site: process.env.SITE
})
  .catch((e) => {
    console.log(`Problem generating sitemap: ${e.message}`);
    process.exit(1);
  })
  .then(() => {
    console.log('Sitemap generated successfully');
    process.exit(0);
  });
