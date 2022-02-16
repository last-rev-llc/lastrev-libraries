import logger from 'loglevel';
import Timer from '@last-rev/timer';
import { ApolloServer } from 'apollo-server-micro';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';
import { createLoaders, createContext } from '@last-rev/graphql-contentful-helpers';
import buildSchema from './buildSchema';
import createPathReaders from './createPathReaders';
import LastRevAppConfig from '@last-rev/app-config';

export const createVercelHandler = (config: LastRevAppConfig, path: string) => {
  config.logLevel && logger.setLevel(config.logLevel);
  return async (req: MicroRequest, res: ServerResponse) => {
    const timer = new Timer('Graphql handler created');

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
      context: () => context
    });

    await server.start();

    const handler = server.createHandler({ path });
    logger.trace(timer.end());
    handler(req, res);
  };
};
