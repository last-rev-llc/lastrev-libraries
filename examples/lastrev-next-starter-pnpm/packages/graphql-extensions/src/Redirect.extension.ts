import gql from 'graphql-tag';
import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

import processRedirects from './utils/processRedirects';
import processRewrites from './utils/processRewrites';

export const SITE_ID = process.env.DEFAULT_SITE_ID || process.env.SITE_ID;

export const typeDefs = gql`
  extend type Query {
    redirects(preview: Boolean!): [SiteRedirect]
    rewrites(preview: Boolean!): [SiteRedirect]
  }
`;

export const mappers: any = {
  Query: {
    Query: {
      redirects: async (_: any, { preview }: { preview: boolean }, ctx: ApolloContext) => {
        const site = await ctx.loaders.entryLoader.load({ id: SITE_ID as string, preview });
        const redirectsRef = getLocalizedField(site?.fields, 'redirects', ctx);
        const itemsIds =
          redirectsRef?.map((content: any) => {
            return { id: content?.sys.id, preview };
          }) ?? [];
        const redirects: any[] = (await ctx.loaders.entryLoader.loadMany(itemsIds))
          .filter(Boolean)
          .map((redirect: any) => {
            return {
              source: getLocalizedField(redirect?.fields, 'source', ctx),
              destination: getLocalizedField(redirect?.fields, 'destination', ctx),
              permanent: getLocalizedField(redirect?.fields, 'permanent', ctx)
            };
          })
          .filter(
            (redirect: any) =>
              redirect.source &&
              redirect.source.trim() !== '' &&
              redirect.destination &&
              redirect.destination.trim() !== ''
          );
        const response = redirects ?? [];
        return processRedirects(response);
      },
      rewrites: async (_: any, { preview }: { preview: boolean }, ctx: ApolloContext) => {
        const site = await ctx.loaders.entryLoader.load({ id: SITE_ID as string, preview });
        const rewritesRef = getLocalizedField(site?.fields, 'rewrites', ctx);
        const itemsIds =
          rewritesRef?.map((content: any) => {
            return { id: content?.sys.id, preview };
          }) ?? [];
        const rewrites: any[] = (await ctx.loaders.entryLoader.loadMany(itemsIds)).filter(Boolean);
        const items: any[] = await processRewrites(rewrites, ctx, preview);

        const response = items ?? [];

        return processRedirects(response);
      }
    }
  }
};
