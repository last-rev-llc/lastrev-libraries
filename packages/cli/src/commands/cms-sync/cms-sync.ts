import dotenv from 'dotenv';

dotenv.config();

import sync from '@last-rev/contentful-sync-to-fs';

import program from 'commander';

const run = async ({
  contentDir,
  cms,
  contentDeliveryToken,
  contentPreviewToken,
  contentfulSpaceId,
  preview,
  contentfulEnv
}: {
  contentDir: string;
  cms: string;
  contentDeliveryToken: string;
  contentPreviewToken: string;
  contentfulSpaceId: string;
  preview?: boolean;
  contentfulEnv?: string;
}) => {
  // for now, only supporting contentful
  if (cms != 'Contentful') {
    throw Error(`Unsupported CMS: ${cms}`);
  }
  await sync({
    rootDir: contentDir,
    contentDeliveryToken,
    contentPreviewToken,
    space: contentfulSpaceId,
    preview,
    environment: contentfulEnv
  });
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
    process.env.CONTENTFUL_USE_PREVIEW
  )
  .option(
    '--contentful-env <contentful environement>',
    'Contentful environment, defaults to env variable CONTENTFUL_ENV',
    process.env.CONTENTFUL_ENV
  )
  .parse(process.argv);

const { contentDir, cms, contentDeliveryToken, contentPreviewToken, contentfulSpaceId, preview, contentfulEnv } =
  program.opts();

run({ contentDir, cms, contentDeliveryToken, contentPreviewToken, contentfulSpaceId, preview, contentfulEnv }).catch(
  (err) => {
    console.error(err);
    process.exit();
  }
);
