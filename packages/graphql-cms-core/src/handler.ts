import { startServerAndCreateLambdaHandler, handlers, LambdaHandler } from '@as-integrations/aws-lambda';
import { getWinstonLogger } from '@last-rev/logging';
import { SimpleTimer as Timer } from '@last-rev/timer';
import { contextFunction } from '@last-rev/graphql-cms-helpers';

import LastRevAppConfig from '@last-rev/app-config';
import { createServer } from './createServer';
import { ApolloServer } from '@apollo/server';

const logger = getWinstonLogger({
  package: 'graphql-cms-core',
  module: 'handler'
});

export const createHandler: (config: LastRevAppConfig) => LambdaHandler<any> = (config: LastRevAppConfig) => {
  return async (event: any, ctx: any, cb: any) => {
    const timer = new Timer();

    const server = (await createServer(config)) as ApolloServer<any>;

    const handler = startServerAndCreateLambdaHandler(server, handlers.createAPIGatewayProxyEventV2RequestHandler(), {
      context: contextFunction({
        config,
        extractFromArgs: (lambdaArg) => {
          return lambdaArg.event.queryStringParameters?.env
            ? {
                environment: lambdaArg.event.queryStringParameters?.env
              }
            : {};
        }
      })
    });

    logger.debug('Graphql handler created', {
      caller: 'createHandler',
      elapsedMs: timer.end().millis
    });
    return handler(event, ctx, cb);
  };
};
