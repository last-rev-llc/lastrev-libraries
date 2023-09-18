// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// require('dotenv').config();
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { createVercelHandler } from '@last-rev/graphql-contentful-core';

import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';

import lrConfig from 'graphql-sdk/config';

function initMiddleware(middleware: any) {
  return (req: NextApiRequest, res: NextApiResponse<any>) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS']
  })
);

const handler: NextApiHandler = async (req, res) => {
  await cors(req, res);

  return await createVercelHandler(
    lrConfig.clone({
      contentStrategy: 'cms',
      // If you have Redis configured you can get better preview performance

      apolloServerOptions: {
        introspection: false,
        plugins: [ApolloServerPluginLandingPageDisabled()]
      }
    })
  )(req, res);
};

export default handler;
