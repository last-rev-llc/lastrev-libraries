import { ApolloServer } from 'apollo-server-lambda';
import { buildFederatedSchema } from '@apollo/federation';
import { ServerProps } from './types';
import prepareServer from './prepareServer';
import logger from 'loglevel';
import Timer from '@last-rev/timer';

export const createHandler = (props: ServerProps) => {
  logger.setLevel(props.logLevel);
  return async (event: any, context: any, cb: any) => {
    const timer = new Timer('Graphql handler created');
    const { resolvers, typeDefs, loaders, defaultLocale, pathToIdLookup } = await prepareServer(props);

    const server = new ApolloServer({
      schema: buildFederatedSchema([{ resolvers, typeDefs }]),
      introspection: true,
      debug: true,
      context: () => {
        return {
          loaders,
          mappers: props.extensions?.mappers || {},
          defaultLocale,
          pathToIdLookup,
          typeMappings: props.extensions?.typeMappings || {},
          pathsConfigs: props.extensions?.pathsConfigs || {}
        };
      }
    });

    const handler = server.createHandler();
    logger.debug(timer.end());
    return handler(event, context, cb);
  };
};
