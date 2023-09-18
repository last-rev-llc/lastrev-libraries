import gql from 'graphql-tag';

import createRichText from '@last-rev/graphql-contentful-core/dist/utils/createRichText';
import getLocalizedField from '@last-rev/graphql-contentful-core/dist/utils/getLocalizedField';
import { ApolloContext } from '@last-rev/types';

import { getThumbnailURL } from './utils/getVideoEmbedUrl';
import createPath from './utils/createPath';
import { createType } from './utils/createType';
import { getSlug } from './utils/getSlug';
import pageFooterResolver from './utils/pageFooterResolver';
import pageHeaderResolver from './utils/pageHeaderResolver';
import pathResolver from './utils/pathResolver';

const BLOGS_LANDING_ID = process.env.BLOGS_LANDING_ID;

export const typeDefs = gql`
  extend type CategoryBlog {
    header: Header
    footer: Content
    path: String
    hero: Hero
    contents: [Content]
  }
`;

export const mappers: any = {
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
      },
      seo: async (page: any, _args: any, ctx: ApolloContext) => {
        const seo: any = getLocalizedField(page.fields, 'seo', ctx);
        return {
          ...seo
        };
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

      media: async (page: any, _args: any, ctx: ApolloContext) => {
        const promoImageRef: any = getLocalizedField(page?.fields, 'promoImage', ctx);
        if (promoImageRef) return promoImageRef;

        return getLocalizedField(page?.fields, 'featuredMedia', ctx);
      },

      variant: () => 'default',

      link: async (categoryBlog: any) => categoryBlog,

      actions: async (categoryBlog: any, _args: any, ctx: ApolloContext) => {
        return [categoryBlog];
      }
    }
  }
};
