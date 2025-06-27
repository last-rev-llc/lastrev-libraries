import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault
} from '@apollo/server/plugin/landingPage/default';
import { getWinstonLogger } from '@last-rev/logging';
import { SimpleTimer as Timer } from '@last-rev/timer';
import { contextFunction } from '@last-rev/graphql-cms-helpers';
import LastRevAppConfig from '@last-rev/app-config';
import SchemaCache from './SchemaCache';
import merge from 'lodash/merge';

const logger = getWinstonLogger({
  package: 'graphql-cms-core',
  module: 'createServer'
});

export const createServer = async (config: LastRevAppConfig) => {
  const timer = new Timer();

  const schema = await SchemaCache.getInstance().getSchema(config);

  const server = new ApolloServer({
    ...merge(
      {
        schema,
        introspection: process.env.NODE_ENV !== 'production',
        csrfPrevention: process.env.STAGE !== 'build' && process.env.NODE_ENV === 'production',
        cache: 'bounded',
        persistedQueries: process.env.APOLLO_PERSISTED_QUERIES_ENABLED === 'true',
        context: contextFunction({
          config,
          extractFromArgs: (lambdaArg) => {
            return lambdaArg.event.queryStringParameters?.env
              ? {
                  environment: lambdaArg.event.queryStringParameters?.env
                }
              : {};
          }
        }),
        plugins: config.apolloServerOptions?.plugins || [
          ApolloServerPluginInlineTrace(),
          process.env.NODE_ENV === 'production'
            ? ApolloServerPluginLandingPageProductionDefault({
                embed: true,
                graphRef: `${process.env.APOLLO_GRAPH_REF}@current`
              })
            : ApolloServerPluginLandingPageLocalDefault({ embed: true })
        ]
      },
      config.apolloServerOptions
    )
  });

  logger.debug('Graphql server initialized', {
    caller: 'createServer',
    elapsedMs: timer.end().millis
  });
  return server;
};

export default createServer;
