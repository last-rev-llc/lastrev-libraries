import { ApolloServer } from 'apollo-server';
import {
  ApolloServerPluginInlineTrace,
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core';
import logger from 'loglevel';
import Timer from '@last-rev/timer';
import { createContext } from '@last-rev/graphql-contentful-helpers';
import createPathReaders from './createPathReaders';
import LastRevAppConfig from '@last-rev/app-config';
import SchemaCache from './SchemaCache';

export const getServer = async (config: LastRevAppConfig) => {
  logger.setLevel(config.logLevel);

  const timer = new Timer('Graphql server initialized');

  const pathReaders = createPathReaders(config);

  const schema = await SchemaCache.getInstance().getSchema(config);

  const server = new ApolloServer({
    schema,
    introspection: true,
    debug: true,
    csrfPrevention: process.env.STAGE !== 'build' && process.env.NODE_ENV === 'production',
    plugins: [
      ApolloServerPluginInlineTrace(),
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault({
            embed: true,
            graphRef: `${process.env.APOLLO_GRAPH_REF}@current`
          })
        : ApolloServerPluginLandingPageLocalDefault({ embed: true })
    ],
    context: async ({ req }) => createContext({ config, expressReq: req, pathReaders }),
    cors: {
      // TODO: Add CORS options through config
      origin: ['http://localhost:3000', 'https://studio.apollographql.com']
    }
  });

  logger.trace(timer.end());
  return server;
};
