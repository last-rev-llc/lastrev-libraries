import { ApolloServer } from 'apollo-server-lambda';
import { buildFederatedSchema } from '@apollo/federation';
import { ServerProps } from './types';
import prepareServer from './prepareServer';

export const getHandler = async (props: ServerProps) => {
  const { resolvers, typeDefs, loaders, defaultLocale, pathToIdMapping } = await prepareServer(props);

  return new ApolloServer({
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
};
