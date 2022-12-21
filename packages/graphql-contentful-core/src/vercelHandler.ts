import logger from 'loglevel';
import Timer from '@last-rev/timer';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { contextFunction } from '@last-rev/graphql-contentful-helpers';
import { NextApiRequest, NextApiResponse } from 'next';
import LastRevAppConfig from '@last-rev/app-config';

import createServer from './createServer';

export const createVercelHandler = (config: LastRevAppConfig) => {
  config.logLevel && logger.setLevel(config.logLevel);
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const timer = new Timer('Graphql handler created');

    const server = await createServer(config);

    const handler = startServerAndCreateNextHandler(server, {
      context: contextFunction({ config, environment: req.query?.environment?.toString() })
    });

    logger.trace(timer.end());
    return handler(req, res);
  };
};
