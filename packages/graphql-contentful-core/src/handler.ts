import { ApolloServer } from 'apollo-server-lambda';
import { buildFederatedSchema } from '@apollo/federation';
import { ServerProps } from './types';
import prepareServer from './prepareServer';

export const createHandler = (props: ServerProps) => {
  return async (event: any, context: any, cb: any) => {
    const { resolvers, typeDefs, loaders, defaultLocale, pathToIdMapping } = await prepareServer(props);

    const server = new ApolloServer({
      schema: buildFederatedSchema([{ resolvers, typeDefs }]),
      introspection: true,
      debug: true,
      context: () => {
        return {
          loaders,
          mappers: props.extensions?.mappers || {},
          defaultLocale,
          typeMappings: props.extensions?.typeMappings || {},
          pathToIdMapping
        };
      }
    });

    const handler = server.createHandler();

    return handler(event, context, cb);
  };
};
