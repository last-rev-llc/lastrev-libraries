// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// require('dotenv').config();
import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { createVercelHandler } from '@last-rev/graphql-contentful-core';

import lrConfig from '../../../../config';

// @ts-ignore
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
// @ts-ignore
const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS']
  })
);

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req: any, res: any) {
  await cors(req, res);
  return await createVercelHandler(lrConfig, '/api/graphql')(req, res);
}
