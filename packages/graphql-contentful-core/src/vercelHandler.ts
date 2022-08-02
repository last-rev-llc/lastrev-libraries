import logger from 'loglevel';
import Timer from '@last-rev/timer';
import { ApolloServer } from 'apollo-server-micro';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';
import { createContext } from '@last-rev/graphql-contentful-helpers';
import createPathReaders from './createPathReaders';
import LastRevAppConfig from '@last-rev/app-config';
import SchemaCache from './SchemaCache';

export const createVercelHandler = (config: LastRevAppConfig, path: string) => {
  config.logLevel && logger.setLevel(config.logLevel);
  return async (req: MicroRequest, res: ServerResponse) => {
    const timer = new Timer('Graphql handler created');

    const pathReaders = createPathReaders(config);

    const schema = await SchemaCache.getInstance().getSchema(config);

    const server = new ApolloServer({
      schema,
      introspection: true,
      debug: true,
      context: async () => createContext({ config, microReq: req, pathReaders })
    });

    await server.start();

    const handler = server.createHandler({ path });
    logger.trace(timer.end());
    handler(req, res);
  };
};
