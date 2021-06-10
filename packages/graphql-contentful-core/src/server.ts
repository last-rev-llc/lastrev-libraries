import * as dotenv from 'dotenv';

dotenv.config();

import { ApolloServer } from 'apollo-server';
import { getContentTypes, getLocales } from '@last-rev/integration-contentful';
import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServerPluginInlineTrace } from 'apollo-server-core';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import find from 'lodash/find';
import get from 'lodash/get';
import { DocumentNode } from 'apollo-link';

import client from './contentful-client';
import lastRevTypeDefs from './typeDefs';
import { createLoader } from './createLoader';
import createResolvers from './resolvers/createResolvers';
import { Mappers } from './types';
import EntryFetcher from './EntryFetcher';

export const getServer = async ({
  typeDefs: clientTypeDefs,
  resolvers: clientResolvers,
  mappers,
  typeMappings
}: {
  typeDefs?: DocumentNode;
  resolvers?: any;
  mappers?: Mappers;
  typeMappings?: { [contentfulType: string]: string };
} = {}) => {
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

  const resolvers = createResolvers({
    contentTypes,
    mappers,
    typeMappings,
    entryFetcher
  });

  const typeDefs = clientTypeDefs ? mergeTypeDefs([clientTypeDefs, lastRevTypeDefs]) : lastRevTypeDefs;

  return new ApolloServer({
    schema: buildFederatedSchema([{ resolvers: mergeResolvers([resolvers, clientResolvers]), typeDefs }]),
    introspection: true,
    debug: true,
    plugins: [ApolloServerPluginInlineTrace()],

    context: () => {
      return {
        loaders,
        mappers,
        defaultLocale,
        typeMappings
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
