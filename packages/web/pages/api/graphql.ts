// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// require('dotenv').config();
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { createVercelHandler } from '@last-rev/graphql-contentful-core';

import lrConfig from '../../../../config';

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

const whitelist: string[] = [
  'http://localhost:3000',
  'ias-rc-develop.netlify.app',
  'prc.integralads.com',
  'ias-rc-prod.netlify.app',
  'develop.helpcenter.integralads.com',
  'ias-kb-develop.netlify.app',
  'helpcenter.integralads.com',
  'ias-kb-prod.netlify.app',
  'reporting.integralplatform.com'
];

const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
    origin(origin, callback) {
      try {
        const isAllowed = whitelist.reduce((prev, curr) => {
          return prev || !!origin?.includes(curr);
        }, false);
        console.log('*************** IS ALLOWED', isAllowed, origin);
        if (isAllowed || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      } catch (err) {
        console.log(err);
        callback(null, true);
      }
    }
  })
);

// @ts-ignore
const handler: NextApiHandler = async (req, res) => {
  await cors(req, res);

  return await createVercelHandler(
    lrConfig.clone({
      strategy: 'redis', // always use redis strategy for live api
      apolloServerOptions: {
        introspection: true
      }
    })
  )(req, res);
};

export default handler;
