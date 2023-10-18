import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import handleWebhook from '@last-rev/contentful-webhook-handler';
import { cors } from '../../cors';

import lrConfig from 'graphql-sdk/config.serverless';

export const config = {
  api: {
    bodyParser: true
  }
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  try {
    await handleWebhook(lrConfig, JSON.parse(req.body), req.headers as Record<string, string>);
    res.status(200).json('Success');
  } catch (err) {
    res.status(400).json(`There was an error, we are on it. ${err}`);
  }
};

export default handler;
