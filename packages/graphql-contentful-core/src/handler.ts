import { ApolloServer } from 'apollo-server-lambda';
import logger from 'loglevel';
import Timer from '@last-rev/timer';
import { createLoaders, prepareContext } from '../../graphql-contentful-helpers/dist';
import buildSchema from './buildSchema';
import createPathReaders from 'createPathReaders';
import LastRevAppConfig from '../../app-config/dist';

export const createHandler = (config: LastRevAppConfig) => {
  logger.setLevel(config.logLevel);
  return async (event: any, ctx: any, cb: any) => {
    const timer = new Timer('Graphql handler created');

    const loaders = createLoaders(config);
    const pathReaders = createPathReaders(config);

    const [context, schema] = await Promise.all([
      prepareContext(config, loaders),
      buildSchema(config, loaders, pathReaders)
    ]);

    const server = new ApolloServer({
      schema,
      introspection: true,
      debug: true,
      context: () => context
    });

    const handler = server.createHandler();
    logger.debug(timer.end());
    return handler(event, ctx, cb);
  };
};
