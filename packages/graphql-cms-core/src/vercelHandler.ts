import { getWinstonLogger } from '@last-rev/logging';
import Timer from '@last-rev/timer';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { contextFunction } from '@last-rev/graphql-cms-helpers';
import { NextApiRequest, NextApiResponse } from 'next';
import LastRevAppConfig from '@last-rev/app-config';

import createServer from './createServer';

const logger = getWinstonLogger({
  package: 'graphql-cms-core',
  module: 'vercelHandler'
});

export const createVercelHandler = (config: LastRevAppConfig) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const timer = new Timer();

    const server = await createServer(config);

    const handler = startServerAndCreateNextHandler(server, {
      context: contextFunction({
        config,
        extractFromArgs: (req) => {
          return req.query?.env && !Array.isArray(req.query?.env) ? { environment: req.query?.env } : {};
        }
      })
    });

    logger.debug('Graphql handler created', {
      caller: 'createVercelHandler',
      elapsedMs: timer.end().millis
    });
    return handler(req, res);
  };
};
