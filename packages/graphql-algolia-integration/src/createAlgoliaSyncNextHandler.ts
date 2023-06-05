import LastRevAppConfig from '@last-rev/app-config';
import algoliasearch from 'algoliasearch';
import { NextApiRequest, NextApiResponse } from 'next';

import handleIncomingRequest from './handleIncomingRequest';

const createAlgoliaSyncNextHandler = (config: LastRevAppConfig, graphQlUrl: string) => {
  const { algolia } = config;

  const algoliaClient = algoliasearch(algolia.applicationId, algolia.adminApiKey);

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;
    const headers = req.headers as Record<string, any>;
    try {
      const response = await handleIncomingRequest(config, algoliaClient, graphQlUrl, body, headers);
      return res.status(response?.statusCode || 200).json({ message: response?.body || '' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };
};

export default createAlgoliaSyncNextHandler;
