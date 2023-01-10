import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault
} from '@apollo/server/plugin/landingPage/default';
import { getWinstonLogger } from '@last-rev/logging';
import Timer from '@last-rev/timer';
import LastRevAppConfig from '@last-rev/app-config';
import SchemaCache from './SchemaCache';
import merge from 'lodash/merge';

const logger = getWinstonLogger({
  package: 'graphql-contentful-core',
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
