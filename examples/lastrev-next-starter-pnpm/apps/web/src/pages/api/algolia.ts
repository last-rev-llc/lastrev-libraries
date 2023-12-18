import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { cors } from '../../cors';
import { createAlgoliaSyncHandler } from '@last-rev/graphql-algolia-integration';

import lrConfig from 'graphql-sdk/config.serverless';

const maxRecords = process.env.ALGOLIA_MAX_RECORDS ? parseInt(process.env.ALGOLIA_MAX_RECORDS) : undefined;

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
