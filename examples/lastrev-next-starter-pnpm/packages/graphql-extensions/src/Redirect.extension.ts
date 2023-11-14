import gql from 'graphql-tag';
import type { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

import { processRedirects } from './utils/processRedirects';
import { processRewrites } from './utils/processRewrites';

export const SITE_ID = process.env.DEFAULT_SITE_ID || process.env.SITE_ID;

export const typeDefs = gql`
  extend type Query {
    redirects(preview: Boolean!): [SiteRedirect]
    rewrites(preview: Boolean!): [SiteRedirect]
  }
  extend type SiteRedirect {
    source: String # In Contentful is String[]
    destination: String
    permanent: Boolean
  }
`;

export const resolvers: any = {
  SiteRedirect: {
    source: (redirect: any) => redirect.source,
    destination: (redirect: any) => redirect.destination,
    permanent: (redirect: any) => redirect.permanent
  },
  Query: {
    redirects: async (_: any, { preview }: { preview: boolean }, ctx: ApolloContext) => {
      const site = await ctx.loaders.entryLoader.load({ id: SITE_ID as string, preview });
      const redirectsRef = getLocalizedField(site?.fields, 'redirects', ctx);
      const itemsIds =
        redirectsRef?.map((content: any) => {
          return { id: content?.sys.id, preview };
        }) ?? [];
      const redirectItems = await ctx.loaders.entryLoader.loadMany(itemsIds);
      const redirects: any[] = redirectItems
        .filter(Boolean)
        .flatMap((redirect: any) => {
          const sources = getLocalizedField(redirect?.fields, 'sourceList', ctx) || [];
          console.log('RedirectItem', { fields: redirect?.fields, sources });
          return sources.map((source: string) => ({
            source,
            destination: getLocalizedField(redirect?.fields, 'destination', ctx),
            permanent: getLocalizedField(redirect?.fields, 'permanent', ctx)
          }));
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
};
