import gql from 'graphql-tag';

import createRichText from '@last-rev/graphql-contentful-core/dist/utils/createRichText';
import getLocalizedField from '@last-rev/graphql-contentful-core/dist/utils/getLocalizedField';
import { ApolloContext, Mappers } from '@last-rev/types';

import { categoryBlogV1 } from './PathsConfigs.extension';
import pageFooterResolver from './utils/pageFooterResolver';
import pageHeaderResolver from './utils/pageHeaderResolver';
import pathResolver from './utils/pathResolver';
import resolveField from './utils/resolveField';

const BLOGS_LANDING_ID = process.env.BLOGS_LANDING_ID;

export const pathsConfigs = {
  ...categoryBlogV1
};
export const typeDefs = gql`
  extend type CategoryBlog {
    header: Header
    footer: Content
    path: String
    hero: Hero
    contents: [Content]
  }
`;

export const mappers: Mappers = {
  CategoryBlog: {
    CategoryBlog: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver,
      contents: async (_: any, _args: any, ctx: ApolloContext) => {
        // TODO: Update once path lookup is implemented to remove dependency on env ID
        if (BLOGS_LANDING_ID) {
          const blogsLanding = await ctx.loaders.entryLoader.load({ id: BLOGS_LANDING_ID, preview: !!ctx.preview });
          return getLocalizedField(blogsLanding?.fields, 'contents', ctx);
        }
      }
    },

    Link: {
      // TODO: When pathLookup is implemented remove this in favour of Link generic resolver
      text: 'title',
      href: pathResolver
    },

    Card: {
      body: async (categoryBlog: any, _args: any, ctx: ApolloContext) =>
        createRichText(getLocalizedField(categoryBlog.fields, 'promoSummary', ctx)),

      media: resolveField(['promoImage', 'featuredMedia']),

      variant: () => 'default',

      link: async (categoryBlog: any) => categoryBlog,

      actions: async (categoryBlog: any, _args: any, ctx: ApolloContext) => {
        return [categoryBlog];
      }
    }
  }
};
