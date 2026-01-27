import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { generateSchema } from '@last-rev/graphql-schema-gen';
import lastRevTypeDefs from './typeDefs';
import createResolvers from './resolvers/createResolvers';
import { ContentfulLoaders } from '@last-rev/types';
import { GraphQLSchema } from 'graphql';

import { buildSubgraphSchema } from '@apollo/subgraph';
import { addResolversToSchema, makeExecutableSchema } from '@graphql-tools/schema';
import LastRevAppConfig from '@last-rev/app-config';
import { createLoaders } from '@last-rev/graphql-cms-helpers';

/**
 * Get content types for schema generation.
 * - Sanity: returns schema types directly from config (no API call needed)
 * - Contentful: fetches from API via loader
 */
const getContentTypes = async (config: LastRevAppConfig, loaders: ContentfulLoaders): Promise<any[]> => {
  if (config.cms === 'Sanity') {
    // Sanity schemas come from local config, not from an API
    return config.sanity?.schemaTypes || [];
  }

  // Contentful: fetch from API - try production first, then preview
  const contentTypes = await loaders.fetchAllContentTypes(false);
  if (!contentTypes || !contentTypes.length) {
    return loaders.fetchAllContentTypes(true);
  }
  return contentTypes;
};

const buildSchema = async (config: LastRevAppConfig): Promise<GraphQLSchema> => {
  // locale doesn't matter for this use case
  const { loaders } = createLoaders(config, 'en-US');
  // contentTypes type depends on CMS - generateSchema/createResolvers handle both via source param
  // For Sanity, we get schemas from config; for Contentful, from the loader
  const contentTypes = await getContentTypes(config, loaders as ContentfulLoaders);

  const baseTypeDefs = await generateSchema({
    source: config.cms,
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
