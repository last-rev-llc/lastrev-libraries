import { startServerAndCreateLambdaHandler, IncomingEvent } from '@as-integrations/aws-lambda';
import logger from 'loglevel';
import Timer from '@last-rev/timer';
import { contextFunction } from '@last-rev/graphql-contentful-helpers';

import LastRevAppConfig from '@last-rev/app-config';
import { createServer } from './createServer';

export const createHandler = (config: LastRevAppConfig) => {
  logger.setLevel(config.logLevel);
  return async (event: IncomingEvent, ctx: any, cb: any) => {
    const timer = new Timer('Graphql handler created');

    const server = await createServer(config);

    const handler = startServerAndCreateLambdaHandler(server, {
      context: contextFunction({ config, environment: event.queryStringParameters?.environment })
    });

    logger.trace(timer.end());
    return handler(event, ctx, cb);
  };
};
