import dotenv from 'dotenv';

dotenv.config();

import { Handler } from '@netlify/functions';
import { getServer } from '@last-rev/graphql-contentful-core';
import { resolve } from 'path';
import { GraphQLClient } from 'graphql-request';

import extensions from 'lrns-graphql-extensions';
import { getSdk } from 'lrns-graphql-sdk';

const handler: Handler = async (event) => {
  const { queryStringParameters } = event;

  const { id, locale } = queryStringParameters || {};

  const server = await getServer({
    cms: 'Contentful',
    extensions,
    contentDir: resolve(__dirname, '../cms-sync')
  });

  const { url } = await server.listen({ port: 5000, host: 'localhost' });

  const sdk = getSdk(new GraphQLClient(url));

  const data = await sdk.Preview({ id, locale });

  await server.stop();

  // space, env, "preview", extensions
  return {
    statusCode: 200,
    body: JSON.stringify({ data })
  };
};

export { handler };
