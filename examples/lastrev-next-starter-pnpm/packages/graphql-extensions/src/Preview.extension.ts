import gql from 'graphql-tag';
import { deepMerge } from './utils/deepMerge';
import { createType } from './utils/createType';
import type { ApolloContext } from './types';

export const typeMappings = {};
const SITE_ID = process.env.DEFAULT_SITE_ID || process.env.SITE_ID;

export const resolvers = {
  Query: {
    contentPreview: async (
      _: any,
      {
        id,
        locale,
        displayType,
        overrideContent
      }: { id?: string; locale?: string; displayType?: string; overrideContent?: any },
      ctx: ApolloContext
    ) => {
      if (!id) throw new Error('MissingArgumentId');
      ctx.preview = true;
      ctx.locale = locale || ctx.defaultLocale;
      ctx.displayType = displayType;

      const siteSettings = await ctx.loaders.entryLoader.load({ id: SITE_ID!, preview: !!ctx.preview });
      ctx.siteSettings = siteSettings;

      const content = await ctx.loaders.entryLoader.load({ id, preview: true });

      if (content && overrideContent) {
        return deepMerge(content, createType(content.sys.contentType.sys.id, overrideContent, ctx.locale));
      }
      return content;
    }
  }
};

export const typeDefs = gql`
  extend type Query {
    contentPreview(id: String!, locale: String, displayType: String, overrideContent: JSON): Content
  }
`;
