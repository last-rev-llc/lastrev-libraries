import * as dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server';
import { getContentTypes } from '@last-rev/integration-contentful';
import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServerPluginInlineTrace, gql } from 'apollo-server-core';
import merge from 'lodash/merge';
import { mergeTypeDefs } from '@graphql-tools/merge';

import client from './contentful-client';
import lastRevTypeDefs from './typeDefs';
import { createLoader, primeLoader } from './createLoader';
import createResolvers from './resolvers/createResolvers';
import MAPPERS, { Mappers } from './mappers';
import { DocumentNode } from 'apollo-link';

export const getServer = async ({
  typeDefs: clientTypeDefs,
  resolvers: clientResolvers,
  mappers
}: {
  typeDefs?: DocumentNode;
  resolvers?: any;
  mappers?: Mappers;
} = {}) => {
  const pages = await createLoader(fetchAllPages, 'fields.slug', true);
  const entries = await createLoader(() =>
    fetchAllEntries().then((entries) => {
      primeLoader(pages, () => Promise.resolve(entries), 'fields.slug');
      return entries;
    })
  );
  const loaders = {
    entries,
    pages,
    assets: await createLoader(fetchAllAssets)
  };
  const { items: contentTypes } = await getContentTypes();

  const resolvers = createResolvers({
    contentTypes
  });

  const typeDefs = clientTypeDefs ? mergeTypeDefs([clientTypeDefs, lastRevTypeDefs]) : lastRevTypeDefs;

  return new ApolloServer({
    schema: buildFederatedSchema([{ resolvers: merge(resolvers, clientResolvers), typeDefs }]),
    introspection: true,
    debug: true,
    plugins: [ApolloServerPluginInlineTrace()],

    context: () => {
      return { loaders, mappers: merge(MAPPERS, mappers) };
    }
  });
};

export const fetchAllPages = () =>
  client
    .getEntries({
      content_type: 'landingPage'
    })
    .then(({ items }) => items);

const fetchAllEntries = () =>
  client
    .sync({
      type: 'Entry',
      initial: true,
      resolveLinks: false
    })
    .then(({ entries }) => entries);

const fetchAllAssets = () =>
  client
    .sync({
      type: 'Asset',
      initial: true,
      resolveLinks: false
    })
    .then(({ assets }) => assets);
