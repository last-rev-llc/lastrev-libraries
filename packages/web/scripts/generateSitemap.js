/* eslint-disable no-console */
require('dotenv').config();

const generate = require('@last-rev/sitemap-generator');
const { resolve } = require('path');
const { client, parseBooleanEnvVar } = require('@ias/utils');

const usePreview = parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW);

const run = async () => {
  if (process.env.SITE === 'RESOURCE') return;
  const { data } = await client.Sitemap({
    root: process.env.DOMAIN,
    locales: ['en-US'],
    preview: usePreview,
    site: process.env.SITE
  });

  await generate(data.sitemap, resolve(__dirname, '../public'));
};

run()
  .catch((e) => {
    console.log(`Problem generating sitemap: ${e.message}`);
    process.exit(1);
  })
  .then(() => {
    console.log('Sitemap generated successfully');
    process.exit(0);
  });
