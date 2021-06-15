import * as dotenv from 'dotenv';

dotenv.config();

import { ApolloServer } from 'apollo-server';
import { getContentTypes, getLocales } from '@last-rev/integration-contentful';
import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServerPluginInlineTrace } from 'apollo-server-core';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import generateSchema from '@last-rev/graphql-schema-gen';
import find from 'lodash/find';
import get from 'lodash/get';
import merge from 'lodash/merge';
import { resolve } from 'path';
import lastRevTypeDefs from './typeDefs';
import createResolvers from './resolvers/createResolvers';
import loadExtensions from './utils/loadExtensions';
import createLoaders from '@last-rev/contentful-fs-loader';

export const getServer = async ({
  cms = 'Contentful',
  extensionsDir,
  contentDir
}: {
  cms?: 'Contentful';
  extensionsDir?: string;
  contentDir: string;
}) => {
  const {
    typeDefs: clientTypeDefs,
    resolvers: clientResolvers,
    mappers: clientMappers,
    typeMappings: clientTypeMappings
  } = await loadExtensions(extensionsDir && resolve(process.cwd(), extensionsDir));

  const mergedMappers = merge({}, ...clientMappers);
  const mergedTypeMappings = merge({}, ...clientTypeMappings);

  const baseTypeDefs = await generateSchema({
    source: cms,
    typeMappings: mergedTypeMappings,
    connectionParams: {
      accessToken: process.env.CONTENTFUL_ACCESSTOKEN || '',
      space: process.env.CONTENTFUL_SPACE_ID || '',
      host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com',
      environment: process.env.CONTENTFUL_ENV || 'master'
    }
  });

  const [{ items: contentTypes }, locales] = await Promise.all([getContentTypes(), getLocales()]);

  const defaultLocale = get(
    find(locales, (locale) => locale.default),
    'code',
    'en-US'
  );

  const loaders = await createLoaders(
    resolve(process.cwd(), contentDir),
    process.env.CONTENTFUL_SPACE_ID || '',
    process.env.CONTENTFUL_ENV || 'master',
    (process.env.CONTENTFUL_HOST || 'cdn.contentful.com').startsWith('preview') ? 'preview' : 'production'
  );

  const defaultResolvers = createResolvers({
    contentTypes,
    mappers: mergedMappers,
    typeMappings: mergedTypeMappings
  });

  const typeDefs = mergeTypeDefs([lastRevTypeDefs, baseTypeDefs, ...clientTypeDefs]);
  const resolvers = mergeResolvers([defaultResolvers, ...clientResolvers]);

  return new ApolloServer({
    schema: buildFederatedSchema([{ resolvers, typeDefs }]),
    introspection: true,
    debug: true,
    plugins: [ApolloServerPluginInlineTrace()],

    context: () => {
      return {
        loaders,
        mappers: mergedMappers,
        defaultLocale,
        typeMappings: mergedTypeMappings
      };
    }
  });
};
