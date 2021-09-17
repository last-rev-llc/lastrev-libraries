import dotenv from 'dotenv';

dotenv.config();

import sync from '@last-rev/contentful-sync-to-fs';
import LastRevAppConfig from '@last-rev/app-config';

import program from 'commander';

const parseBooleanEnvVar = (value: string = '') => {
  // values parsed as true: true, 1, yes, y, => ignore caps
  const val = value.toString().toLowerCase();
  return /^(true|1|yes|y)$/.test(val);
};

const run = async (config: LastRevAppConfig) => {
  await sync(config);
};

program
  .requiredOption('-d, --contentDir <content directory>', 'Directory in which to write synced files')
  .requiredOption('-c, --cms <string>', 'CMS to sync ', 'Contentful')
  .requiredOption(
    '--content-delivery-token <content delivery token>',
    'Contentful Content Delivery Access Token, defaults to env variable CONTENTFUL_DELIVERY_TOKEN ',
    process.env.CONTENTFUL_DELIVERY_TOKEN
  )
  .requiredOption(
    '--content-preview-token <content preview token>',
    'Contentful Content Preview Access Token, defaults to env variable CONTENTFUL_PREVIEW_TOKEN ',
    process.env.CONTENTFUL_PREVIEW_TOKEN
  )
  .requiredOption(
    '--contentful-space-id <space id>',
    'Contentful Space ID, defaults to env variable CONTENTFUL_SPACE_ID',
    process.env.CONTENTFUL_SPACE_ID
  )
  .option(
    '-p, --preview',
    'Should sync preview content?, defaults to CONTENTFUL_USE_PREVIEW',
    parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW)
  )
  .option(
    '--contentful-env <contentful environement>',
    'Contentful environment, defaults to env variable CONTENTFUL_ENV',
    process.env.CONTENTFUL_ENV
  )
  .parse(process.argv);

const { contentDir, cms, contentDeliveryToken, contentPreviewToken, contentfulSpaceId, preview, contentfulEnv } =
  program.opts();

const config = new LastRevAppConfig({
  cms,
  strategy: 'fs',
  fs: {
    contentDir
  },
  contentful: {
    spaceId: contentfulSpaceId,
    contentDeliveryToken,
    contentPreviewToken,
    usePreview: preview,
    env: contentfulEnv
  }
});

run(config).catch((err) => {
  console.error(err);
  process.exit();
});
