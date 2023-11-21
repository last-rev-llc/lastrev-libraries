import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

import { createAlgoliaSyncHandler } from '@last-rev/graphql-algolia-integration';

// import lrConfig from '../../../../config';
import lrConfig from '../../../../../packages/graphql-sdk/config';

const maxRecords = process.env.ALGOLIA_MAX_RECORDS ? parseInt(process.env.ALGOLIA_MAX_RECORDS) : undefined;

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
    methods: ['POST', 'OPTIONS']
  })
);

export const config = {
  api: {
    bodyParser: true,
    responseLimit: false
  }
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  const url = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/graphql`
    : 'http://localhost:8888/graphql';

  try {
    await createAlgoliaSyncHandler(
      lrConfig,
      url,
      maxRecords
    )({ body: JSON.stringify(req.body), headers: req.headers, rawUrl: req.url });
    res.status(200).json('Success');
  } catch (err) {
    res.status(400).json(`There was an error, we are on it. ${err}`);
  }
};

export default handler;

// Next.js API route
// import { createAlgoliaSyncNextHandler } from '@last-rev/graphql-algolia-integration';
// import config from '../../../../../packages/graphql-sdk/config';

// const url = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/graphql` : 'http://localhost:8888/graphql';

// export default createAlgoliaSyncNextHandler(config, url);
