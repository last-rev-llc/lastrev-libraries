import * as dotenv from 'dotenv';

dotenv.config();

import { ApolloServer } from 'apollo-server';
// import { ApolloServer as LambdaServer } from 'apollo-server-lambda';
import { getLocales } from '@last-rev/integration-contentful';
import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServerPluginInlineTrace } from 'apollo-server-core';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import generateSchema from '@last-rev/graphql-schema-gen';
import createFsLoaders from '@last-rev/contentful-fs-loader';
// import createS3Loaders from '@last-rev/contentful-s3-loader';
import { find, get, map } from 'lodash';
import { resolve } from 'path';

import lastRevTypeDefs from './typeDefs';
import createResolvers from './resolvers/createResolvers';
import generatePathToIdMapping from './utils/generatePathToIdMapping';
import { Extensions } from './types';

// export const getHandler = async ({
//   cms = 'Contentful',
//   extensions,
//   contentDir
// }: {
//   cms?: 'Contentful';
//   extensions?: Extensions;
//   contentDir: string;
// }) => {
//   // TODO
// };

export const getServer = async ({
  cms = 'Contentful',
  extensions,
  contentDir,
  spaceId,
  environement,
  isPreview
}: {
  cms?: 'Contentful';
  extensions?: Extensions;
  contentDir: string;
  spaceId: string;
  environement: string;
  isPreview: boolean;
}) => {
  const loaders = await createFsLoaders(
    resolve(process.cwd(), contentDir),
    spaceId,
    environement,
    isPreview ? 'preview' : 'production'
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
