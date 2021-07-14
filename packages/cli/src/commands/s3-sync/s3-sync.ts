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
  apiKey
}: {
  contentDir: string;
  cms: string;
  apiUrl: string;
  contentfulEnv?: string;
  preview?: boolean;
  bucket: string;
  apiKey: string;
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
    environment: contentfulEnv
  });
};

program
  .requiredOption('-d, --contentDir <content directory>', 'Directory in which to write synced files')
  .requiredOption('-a, --api-key <LastRev API Key>', 'LastRev API Key')
  .option('-c, --cms <string>', 'CMS to sync ', 'Contentful')
  .option('-u --api-url <api URL>', 'URL of LastRev API to generate credentials from')
  .option('-p --preview', 'Sync preview content?, defaults to false', false)
  .option(
    '-e --contentful-env <contentful environement>',
    'Contentful environment, defaults to env variable CONTENTFUL_ENV or "master"',
    process.env.CONTENTFUL_ENV || 'master'
  )
  .parse(process.argv);

const { contentDir, cms, apiUrl, preview, contentfulEnv, bucket, apiKey } = program.opts();

run({ contentDir, cms, apiUrl, preview, contentfulEnv, bucket, apiKey }).catch((err) => {
  console.error(err.message);
  process.exit();
});
