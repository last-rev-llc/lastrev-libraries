import { ApolloServer } from 'apollo-server-lambda';
import logger from 'loglevel';
import Timer from '@last-rev/timer';
import { createContext } from '@last-rev/graphql-contentful-helpers';
import createPathReaders from './createPathReaders';
import LastRevAppConfig from '@last-rev/app-config';
import SchemaCache from './SchemaCache';

export const createHandler = (config: LastRevAppConfig) => {
  logger.setLevel(config.logLevel);
  return async (event: any, ctx: any, cb: any) => {
    const timer = new Timer('Graphql handler created');

    const pathReaders = createPathReaders(config);

    const schema = await SchemaCache.getInstance().getSchema(config);

    const server = new ApolloServer({
      schema,
      introspection: true,
      debug: true,
      context: async ({ express }) => createContext({ config, expressReq: express.req, pathReaders })
    });

    const handler = server.createHandler();
    logger.trace(timer.end());
    return handler(event, ctx, cb);
  };
};
