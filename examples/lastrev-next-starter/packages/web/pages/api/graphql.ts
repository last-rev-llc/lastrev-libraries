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

const handler: NextApiHandler = async (req, res) => {
  await cors(req, res);

  const query = req.query;
  const config =
    query && query.env && query.env !== lrConfig.contentful.env
      ? lrConfig.clone({
          contentful: {
            env: query.env
          }
        })
      : lrConfig;
  return await createVercelHandler(config, '/api/graphql')(req, res);
};

export default handler;
