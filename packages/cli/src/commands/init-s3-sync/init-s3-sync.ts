import dotenv from 'dotenv';

dotenv.config();

import program from 'commander';
import axios from 'axios';
import contentful from 'contentful-management';

const initS3 = async ({
  apiUrl,
  environment,
  isPreview,
  accessToken,
  apiKey
}: {
  apiUrl: string;
  environment: string;
  isPreview: boolean;
  accessToken: string;
  apiKey: string;
}) => {
  try {
    await axios.post(
      `${apiUrl}/contentful-full-sync`,
      { environment, isPreview, accessToken },
      { headers: { 'api-key': apiKey } }
    );
    console.log('Successfully enqueued S3 Init request');
  } catch (err) {
    const data = err.response?.data;
    throw Error(`Failed to initialize S3: ${err.message}${data ? ` ${data}` : ''}`);
  }
};

const webhookExists = async (space: any, webhookId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    space
      .getWebhook(webhookId)
      .then((existing: any) => {
        resolve(!!existing);
      })
      .catch(() => resolve(false));
  });
};

const setupWebhook = async ({
  spaceId,
  apiUrl,
  managementToken,
  environment
}: {
  spaceId: string;
  apiUrl: string;
  managementToken: string;
  environment: string;
}) => {
  try {
    const client = contentful.createClient({
      accessToken: managementToken
    });

    const webhookId = `lastrev_s3_webhook_${environment}`;

    // Create webhook
    const space = await client.getSpace(spaceId);

    if (await webhookExists(space, webhookId)) {
      console.log(`Webhook ${webhookId} already exists. Skipping creation.`);
      return;
    }

    await space.createWebhookWithId(webhookId, {
      name: `S3 Sync - ${environment}`,
      url: `${apiUrl}/contentful_webhook`,
      topics: ['*.*'],
      filters: [{ in: [{ doc: 'sys.environment.sys.id' }, [environment]] }],
      headers: [
        {
          key: 'api-key',
          value: apiKey,
          secret: true
        }
      ]
    });
  } catch (err) {
    throw Error(`Problem setting up webhook: ${err.message}`);
  }
};

const run = async ({
  apiUrl,
  environment,
  isPreview,
  accessToken,
  apiKey,
  spaceId,
  managementToken
}: {
  apiUrl: string;
  environment: string;
  isPreview: boolean;
  accessToken: string;
  apiKey: string;
  spaceId: string;
  managementToken: string;
}) => {
  await Promise.all([
    initS3({
      apiUrl,
      environment,
      isPreview,
      accessToken,
      apiKey
    }),

    setupWebhook({
      spaceId,
      managementToken,
      apiUrl,
      environment
    })
  ]);

  process.exit(0);
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
  .requiredOption(
    '-s --contentful-space-id <contentful spaceId>',
    'Contentful space ID, defaults to env variable CONTENTFUL_SPACE_ID',
    process.env.CONTENTFUL_SPACE_ID
  )
  .requiredOption(
    '--cat <contentful access token>',
    'Contentful Delivery API Access Token, defaults to env variable CONTENTFUL_ACCESSTOKEN',
    process.env.CONTENTFUL_ACCESSTOKEN
  )
  .requiredOption(
    '--cmt <contentful management token>',
    'Contentful Management API Access Token, defaults to env variable CONTENTFUL_MANAGEMENT_TOKEN',
    process.env.CONTENTFUL_MANAGEMENT_TOKEN
  )
  .parse(process.argv);

const { apiKey, apiUrl, preview, contentfulEnv, contentfulSpaceId, cat, cmt } = program.opts();

run({
  apiKey,
  apiUrl,
  isPreview: !!preview,
  environment: contentfulEnv,
  spaceId: contentfulSpaceId,
  accessToken: cat,
  managementToken: cmt
}).catch((err) => {
  console.error(err.message);
  process.exit(1);
});
