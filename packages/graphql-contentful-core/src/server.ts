import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServerPluginInlineTrace } from 'apollo-server-core';
import { ServerProps } from './types';
import prepareServer from './prepareServer';

export const getServer = async (props: ServerProps) => {
  const { resolvers, typeDefs, loaders, defaultLocale, pathToIdMapping } = await prepareServer(props);

  return new ApolloServer({
    schema: buildFederatedSchema([{ resolvers, typeDefs }]),
    introspection: true,
    debug: true,
    plugins: [ApolloServerPluginInlineTrace()],

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
