import type { ApolloContext } from '../types';

import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type ApolloContext {
    siteSettings: Site
  }
`;

const SITE_ID = process.env.DEFAULT_SITE_ID || process.env.SITE_ID;

export const siteSettingsResolver = async (_root: any, _args: any, ctx: ApolloContext) => {
  const site = await ctx.loaders.entryLoader.load({ id: SITE_ID!, preview: !!ctx.preview });
  ctx.siteSettings = site;
  return site;
};
