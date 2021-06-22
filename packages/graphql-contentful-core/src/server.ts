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
import client from './contentful-client';
import lastRevTypeDefs from './typeDefs';
import { createLoader } from './createLoader';
import createResolvers from './resolvers/createResolvers';
import EntryFetcher from './EntryFetcher';
import loadExtensions from './utils/loadExtensions';

export const getServer = async ({
  cms = 'Contentful',
  extensionsDir
}: {
  cms?: 'Contentful';
  extensionsDir?: string;
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

  const entryFetcher = new EntryFetcher(client, contentTypes);

  const loaders = {
    entries: await createLoader(() => entryFetcher.fetch()),
    pages: await createLoader(() => entryFetcher.fetchPages(), `fields.slug['${defaultLocale}']`),
    assets: await createLoader(fetchAllAssets)
  };

  const defaultResolvers = createResolvers({
    contentTypes,
    mappers: mergedMappers,
    typeMappings: mergedTypeMappings,
    entryFetcher
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

const fetchAllAssets = () =>
  client
    .sync({
      type: 'Asset',
      initial: true,
      resolveLinks: false
    })
    .then(({ assets }) => assets);
