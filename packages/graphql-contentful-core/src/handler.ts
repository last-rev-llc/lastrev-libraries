import { startServerAndCreateLambdaHandler, IncomingEvent } from '@as-integrations/aws-lambda';
import { getWinstonLogger } from '@last-rev/logging';
import Timer from '@last-rev/timer';
import { contextFunction } from '@last-rev/graphql-contentful-helpers';

import LastRevAppConfig from '@last-rev/app-config';
import { createServer } from './createServer';

const logger = getWinstonLogger({
  package: 'graphql-contentful-core',
  module: 'handler'
});

export const createHandler = (config: LastRevAppConfig) => {
  return async (event: IncomingEvent, ctx: any, cb: any) => {
    const timer = new Timer();

    const server = await createServer(config);

    const handler = startServerAndCreateLambdaHandler(server, {
      context: contextFunction({ config, environment: event.queryStringParameters?.environment })
    });

    logger.debug('Graphql handler created', {
      caller: 'createHandler',
      elapsedMs: timer.end().millis
    });
    return handler(event, ctx, cb);
  };
};
