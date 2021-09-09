import { buildFederatedSchema } from '@apollo/federation';
import { ServerProps } from './types';
import prepareServer from './prepareServer';
import logger from 'loglevel';
import Timer from '@last-rev/timer';
import { ApolloServer } from 'apollo-server-micro';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';

export const createVercelHandler = (props: ServerProps & { path: string }) => {
  props.logLevel && logger.setLevel(props.logLevel);
  return async (req: MicroRequest, res: ServerResponse) => {
    const timer = new Timer('Graphql handler created');
    const { resolvers, typeDefs, contentful, loaders, defaultLocale, pathToIdLookup } = await prepareServer(props);
    const server = new ApolloServer({
      schema: buildFederatedSchema([{ resolvers, typeDefs }]),
      introspection: true,
      debug: true,
      context: () => {
        return {
          loaders,
          contentful,
          mappers: props.extensions?.mappers || {},
          defaultLocale,
          pathToIdLookup,
          typeMappings: props.extensions?.typeMappings || {},
          pathsConfigs: props.extensions?.pathsConfigs || {}
        };
      }
    });

    await server.start();

    const handler = server.createHandler({ path: props.path });
    logger.debug(timer.end());
    handler(req, res);
  };
};
