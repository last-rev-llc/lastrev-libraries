import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import generateSchema from '@last-rev/graphql-schema-gen';
import lastRevTypeDefs from './typeDefs';
import createResolvers from './resolvers/createResolvers';
import { ContentfulLoaders } from '@last-rev/types';
import { GraphQLSchema } from 'graphql';
import { buildFederatedSchema } from '@apollo/federation';
import LastRevAppConfig from '@last-rev/app-config';
import { addResolversToSchema } from '@graphql-tools/schema';

const fetchAllContentTypes = async (loaders: ContentfulLoaders) => {
  // may not have production content, if none there, use preview
  const contentTypes = await loaders.fetchAllContentTypes(false);
  if (!contentTypes || !contentTypes.length) {
    return loaders.fetchAllContentTypes(true);
  }
  return contentTypes;
};

const buildSchema = async (config: LastRevAppConfig, loaders: ContentfulLoaders): Promise<GraphQLSchema> => {
  const contentTypes = await fetchAllContentTypes(loaders);

  const baseTypeDefs = await generateSchema({
    source: 'Contentful',
    typeMappings: config.extensions.typeMappings,
    contentTypes,
    logLevel: config.logLevel,
    skipReferenceFields: config.skipReferenceFields
  });

  const defaultResolvers = createResolvers({
    contentTypes,
    mappers: config.extensions.mappers,
    typeMappings: config.extensions.typeMappings
  });

  const typeDefs = mergeTypeDefs([lastRevTypeDefs, baseTypeDefs, config.extensions.typeDefs]);
  const resolvers: Record<string, any> = mergeResolvers([defaultResolvers, config.extensions.resolvers]);

  const federatedSchema = buildFederatedSchema([{ typeDefs }]);

  return addResolversToSchema({
    schema: federatedSchema,
    resolvers,
    inheritResolversFromInterfaces: true,
    resolverValidationOptions: {
      requireResolversToMatchSchema: 'ignore'
    }
  });
};
export default buildSchema;
