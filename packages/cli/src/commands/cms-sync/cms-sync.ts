import dotenv from 'dotenv';

dotenv.config();

import sync from '@last-rev/contentful-sync-to-fs';

import program from 'commander';

const run = async ({
  contentDir,
  cms,
  contentfulAccessToken,
  contentfulSpaceId,
  contentfulHost,
  contentfulEnv
}: {
  contentDir: string;
  cms: string;
  contentfulAccessToken: string;
  contentfulSpaceId: string;
  contentfulHost?: string;
  contentfulEnv?: string;
}) => {
  // for now, only supporting contentful
  if (cms != 'Contentful') {
    throw Error(`Unsupported CMS: ${cms}`);
  }
  await sync({
    rootDir: contentDir,
    accessToken: contentfulAccessToken,
    space: contentfulSpaceId,
    host: contentfulHost,
    environment: contentfulEnv
  });
};

program
  .requiredOption('-d, --contentDir <content directory>', 'Directory in which to write synced files')
  .requiredOption('-c, --cms <string>', 'CMS to sync ', 'Contentful')
  .requiredOption(
    '--contentful-access-token <access token>',
    'Contentful Access Token, defaults to env variable CONTENTFUL_ACCESSTOKEN ',
    process.env.CONTENTFUL_ACCESSTOKEN
  )
  .requiredOption(
    '--contentful-space-id <space id>',
    'Contentful Space ID, defaults to env variable CONTENTFUL_SPACE_ID',
    process.env.CONTENTFUL_SPACE_ID
  )
  .option(
    '--contentful-host <contentful host>',
    'Contentful host, defaults to env variable CONTENTFUL_HOST',
    process.env.CONTENTFUL_HOST
  )
  .option(
    '--contentful-env <contentful environement>',
    'Contentful environment, defaults to env variable CONTENTFUL_ENV',
    process.env.CONTENTFUL_ENV
  )
  .parse(process.argv);

const { contentDir, cms, contentfulAccessToken, contentfulSpaceId, contentfulHost, contentfulEnv } = program.opts();

run({ contentDir, cms, contentfulAccessToken, contentfulSpaceId, contentfulHost, contentfulEnv }).catch((err) => {
  console.error(err);
  process.exit();
});
