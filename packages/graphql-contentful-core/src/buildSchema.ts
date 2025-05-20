import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import generateSchema from '@last-rev/graphql-schema-gen';
import lastRevTypeDefs from './typeDefs';
import createResolvers from './resolvers/createResolvers';
import { CmsLoaders } from '@last-rev/types';
import { GraphQLSchema } from 'graphql';

import { buildSubgraphSchema } from '@apollo/subgraph';
import { addResolversToSchema, makeExecutableSchema } from '@graphql-tools/schema';
import LastRevAppConfig from '@last-rev/app-config';
import { createLoaders, createSanityLoaders } from '@last-rev/graphql-contentful-helpers';

const fetchAllContentTypes = async (loaders: CmsLoaders) => {
  // may not have production content, if none there, use preview (only needed for filesystem builds)
  const contentTypes = await loaders.fetchAllContentTypes(false);
  if (!contentTypes || !contentTypes.length) {
    return loaders.fetchAllContentTypes(true);
  }
  return contentTypes;
};

const buildSchema = async (config: LastRevAppConfig): Promise<GraphQLSchema> => {
  // locale doesn't matter for this use case
  const loaders =
    config.cms === 'Sanity' ? createSanityLoaders(config, 'en-US') : createLoaders(config, 'en-US');
  const contentTypes = await fetchAllContentTypes(loaders);

  const baseTypeDefs = await generateSchema({
    source: 'Contentful',
    typeMappings: config.extensions.typeMappings,
    contentTypes,
    skipReferenceFields: true
  });

  const defaultResolvers = createResolvers({
    contentTypes,
    config
  });

  const typeDefs = mergeTypeDefs([lastRevTypeDefs, baseTypeDefs, config.extensions.typeDefs]);
  const resolvers: Record<string, any> = mergeResolvers([defaultResolvers, config.extensions.resolvers]);

  const schema = config.features.disableFederatedSchema
    ? makeExecutableSchema({ typeDefs })
    : buildSubgraphSchema({ typeDefs });

  return addResolversToSchema({
    schema,
    resolvers,
    inheritResolversFromInterfaces: true,
    resolverValidationOptions: {
      requireResolversToMatchSchema: 'ignore'
    }
  });
};
export default buildSchema;
