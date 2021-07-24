import dotenv from 'dotenv';

dotenv.config();

import program from 'commander';
import axios from 'axios';

const run = async ({
  apiUrl,
  environment,
  isPreview,
  apiKey
}: {
  apiUrl: string;
  environment: string;
  isPreview: boolean;
  apiKey: string;
}) => {
  try {
    await axios.post(`${apiUrl}/contentful-full-sync`, { environment, isPreview }, { headers: { 'api-key': apiKey } });
    console.log('Successfully enqueued S3 Init request');
    process.exit(0);
  } catch (err) {
    const data = err.response?.data;
    console.error(`Failed to initialize S3: ${err.message}${data ? ` ${data}` : ''}`);
    process.exit(1);
  }
};

program
  .requiredOption(
    '-a, --api-key <LastRev API Key>',
    'LastRev API Key, defaults to env variable LAST_REV_API_KEY',
    process.env.LAST_REV_API_KEY
  )
  .requiredOption(
    '-u --api-url <api URL>',
    'URL of LastRev API to generate credentials from, defaults to env variable LAST_REV_API_URL',
    process.env.LAST_REV_API_URL
  )
  .requiredOption(
    '-p --preview',
    'Initialize S3 for preview content? defaults to env variable LAST_REV_SYNC_PREVIEW',
    !!process.env.LAST_REV_SYNC_PREVIEW
  )
  .requiredOption(
    '-e --contentful-env <contentful environement>',
    'Contentful environment, defaults to env variable CONTENTFUL_ENV or "master"',
    process.env.CONTENTFUL_ENV || 'master'
  )
  .parse(process.argv);

const { apiKey, apiUrl, preview, contentfulEnv } = program.opts();

run({
  apiKey,
  apiUrl,
  isPreview: !!preview,
  environment: contentfulEnv
}).catch((err) => {
  console.error(err.message);
  process.exit(1);
});
