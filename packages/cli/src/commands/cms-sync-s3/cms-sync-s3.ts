import dotenv from 'dotenv';

dotenv.config();

import s3sync from '@last-rev/contentful-s3-sync';

import program from 'commander';

const run = async ({
  contentDir,
  cms,
  apiUrl,
  contentfulEnv,
  preview,
  apiKey,
  verbose
}: {
  contentDir: string;
  cms: string;
  apiUrl: string;
  contentfulEnv?: string;
  preview?: boolean;
  bucket: string;
  apiKey: string;
  verbose?: boolean;
}) => {
  // for now, only supporting contentful
  if (cms != 'Contentful') {
    throw Error(`Unsupported CMS: ${cms}`);
  }
  await s3sync({
    rootDir: contentDir,
    apiUrl,
    apiKey,
    isPreview: preview,
    environment: contentfulEnv,
    verbose
  });
};

program
  .requiredOption('-d, --contentDir <content directory>', 'Directory in which to write synced files')
  .requiredOption(
    '-a, --api-key <LastRev API Key>',
    'LastRev API Key, defaults to env variable LAST_REV_API_KEY',
    process.env.LAST_REV_API_KEY
  )
  .option('-c, --cms <string>', 'CMS to sync ', 'Contentful')
  .requiredOption(
    '-u --api-url <api URL>',
    'URL of LastRev API to generate credentials from, defaults to env variable LAST_REV_API_URL',
    process.env.LAST_REV_API_URL
  )
  .option(
    '-p --preview',
    'Sync preview content?, defaults to env variable LAST_REV_SYNC_PREVIEW or false',
    !!process.env.LAST_REV_SYNC_PREVIEW
  )
  .option(
    '-e --contentful-env <contentful environement>',

    'Contentful environment, defaults to env variable CONTENTFUL_ENV or "master"',
    process.env.CONTENTFUL_ENV || 'master'
  )
  .option('-v, --verbose', 'Output operation status', false)
  .parse(process.argv);

const { contentDir, cms, apiUrl, preview, contentfulEnv, bucket, apiKey, verbose } = program.opts();

run({ contentDir, cms, apiUrl, preview, contentfulEnv, bucket, apiKey, verbose }).catch((err) => {
  console.error(err.message);
  process.exit();
});
