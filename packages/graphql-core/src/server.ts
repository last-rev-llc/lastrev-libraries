import * as dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server';
import { getContentTypes } from '@last-rev/integration-contentful';
import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServerPluginInlineTrace } from 'apollo-server-core';
import client from './contentful-client';

import typeDefs from './typeDefs';
import { createLoader, primeLoader } from './createLoader';
import createResolvers from './resolvers/createResolvers';

export const getServer = async () => {
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

  // console.log('GraphQLServer -> ', JSON.stringify(resolvers, null, 2));

  return new ApolloServer({
    schema: buildFederatedSchema([{ resolvers, typeDefs }]),
    introspection: true,
    debug: true,
    plugins: [ApolloServerPluginInlineTrace()],

    context: () => {
      return { loaders };
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
