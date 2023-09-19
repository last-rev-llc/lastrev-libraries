import { ApolloContext } from '@last-rev/types';
import gql from 'graphql-tag';
import merge from 'lodash/merge';
import { createType } from './utils/createType';

export const typeMappings = {};

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

      const content = await ctx.loaders.entryLoader.load({ id, preview: true });

      if (content && overrideContent) {
        return merge(content, createType(content.sys.contentType.sys.id, overrideContent, ctx.locale));
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
