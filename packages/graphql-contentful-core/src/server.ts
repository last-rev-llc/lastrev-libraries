import * as dotenv from 'dotenv';

dotenv.config();

import { ApolloServer } from 'apollo-server';
import { getLocales } from '@last-rev/integration-contentful';
import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServerPluginInlineTrace } from 'apollo-server-core';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import generateSchema from '@last-rev/graphql-schema-gen';
import createLoaders from '@last-rev/contentful-fs-loader';
import { find, get, map } from 'lodash';
import { resolve } from 'path';

import lastRevTypeDefs from './typeDefs';
import createResolvers from './resolvers/createResolvers';
import generatePathToIdMapping from './utils/generatePathToIdMapping';
import { Extensions } from './types';

export const getServer = async ({
  cms = 'Contentful',
  extensions,
  contentDir
}: {
  cms?: 'Contentful';
  extensions?: Extensions;
  contentDir: string;
}) => {
  const loaders = await createLoaders(
    resolve(process.cwd(), contentDir),
    process.env.CONTENTFUL_SPACE_ID || '',
    process.env.CONTENTFUL_ENV || 'master',
    (process.env.CONTENTFUL_HOST || 'cdn.contentful.com').startsWith('preview') ? 'preview' : 'production'
  );

  const baseTypeDefs = await generateSchema({
    source: cms,
    typeMappings: extensions?.typeMappings || {},
    contentTypes: await loaders.fetchAllContentTypes()
  });

  const [contentTypes, locales] = await Promise.all([loaders.fetchAllContentTypes(), getLocales()]);

  const defaultLocale = get(
    find(locales, (locale) => locale.default),
    'code',
    'en-US'
  );

  const pathToIdMapping = await generatePathToIdMapping(
    extensions?.pathsConfigs || {},
    loaders,
    defaultLocale,
    map(locales, 'code'),
    extensions?.typeMappings
  );

  const defaultResolvers = createResolvers({
    contentTypes,
    mappers: extensions?.mappers,
    typeMappings: extensions?.typeMappings
  });

  const typeDefs = mergeTypeDefs([lastRevTypeDefs, baseTypeDefs, extensions?.typeDefs || ''], {
    // ignoreFieldConflicts: true
  });
  const resolvers = mergeResolvers([defaultResolvers, extensions?.resolvers || {}]);

  return new ApolloServer({
    schema: buildFederatedSchema([{ resolvers, typeDefs }]),
    introspection: true,
    debug: true,
    plugins: [ApolloServerPluginInlineTrace()],

    context: () => {
      return {
        loaders,
        mappers: extensions?.mappers,
        defaultLocale,
        typeMappings: extensions?.typeMappings,
        pathToIdMapping
      };
    }
  });
};
