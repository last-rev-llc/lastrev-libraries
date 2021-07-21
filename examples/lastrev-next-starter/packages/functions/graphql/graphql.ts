import dotenv from 'dotenv';

dotenv.config();

import { Handler } from '@netlify/functions';
import { getHandler } from '@last-rev/graphql-contentful-core';

import extensions from 'lrns-graphql-extensions';

const handler: Handler = async (event) => {
  const { queryStringParameters } = event;

  const { id, locale } = queryStringParameters || {};

  const server = await getHandler({
    cms: 'Contentful',
    extensions,
    apiUrl: process.env.LAST_REV_API_URL,
    apiKey: process.env.LAST_REV_API_KEY,
    isPreview: true,
    loaderType: 's3'
  });

  const handler = server.createHandler();
  return handler({
    id,
    locale
  });
};

export { handler };
