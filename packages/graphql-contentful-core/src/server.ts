import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginInlineTrace } from 'apollo-server-core';
import buildSchema from './buildSchema';
import logger from 'loglevel';
import Timer from '@last-rev/timer';
import { createLoaders, createContext } from '@last-rev/graphql-contentful-helpers';
import createPathReaders from './createPathReaders';
import LastRevAppConfig from '@last-rev/app-config';

export const getServer = async (config: LastRevAppConfig) => {
  logger.setLevel(config.logLevel);

  const timer = new Timer('Graphql server initialized');

  const loaders = createLoaders(config);
  const pathReaders = createPathReaders(config);

  const [context, schema] = await Promise.all([
    createContext(config, loaders, pathReaders),
    buildSchema(config, loaders)
  ]);

  const server = new ApolloServer({
    schema,
    introspection: true,
    debug: true,
    plugins: [ApolloServerPluginInlineTrace()],
    context: () => context
  });

  logger.debug(timer.end());
  return server;
};
