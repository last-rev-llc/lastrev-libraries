import gql from 'graphql-tag';
import type { Mappers, ApolloContext } from '@last-rev/types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';

import { blogV1 } from './PathsConfigs.extension';
import { createType } from './utils/createType';
import { pageFooterResolver } from './utils/pageFooterResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pathResolver } from './utils/pathResolver';
import { resolveField } from './utils/resolveField';

export const typeDefs = gql`
  extend type Blog {
    header: Header
    footer: Footer
    path: String
    relatedItems: Content
    categories: [CategoryBlog]
    author: Person
    # Uncomment next line if using Media references instead
    # featuredMedia: [Media]
  }
`;

// Controls which site the Blogs gets it's global config from
// const BLOGS_SITE_ID = process.env.BLOGS_SITE_ID ?? (process.env.DEFAULT_SITE_ID || process.env.SITE_ID);

// const blogGlobalContentsResolver = async (page: any, _args: any, ctx: ApolloContext) => {
//   // TODO: Make getting a localized resolved link a single function
//   const siteRef: any = getLocalizedField(page.fields, 'site', ctx);
//   const site = await ctx.loaders.entryLoader.load({ id: siteRef?.sys?.id ?? BLOGS_SITE_ID, preview: !!ctx.preview });
//   const siteblogGlobalContents: any = getLocalizedField(site?.fields, 'blogGlobalContents', ctx);
//   return siteblogGlobalContents;
// };

export const mappers: Mappers = {
  Blog: {
    Blog: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver,
      // contents: blogGlobalContentsResolver,
      relatedItems: async (blog: any, _args: any, ctx: ApolloContext) =>
        createType('Collection', {
          items: getLocalizedField(blog.fields, 'relatedItems', ctx),
          variant: 'Three Per Row',
          itemsVariant: 'Blog'
        })
    },

    Link: {
      text: 'title',
      href: pathResolver
    },

    Card: {
      body: async (blog: any, _args: any, ctx: ApolloContext) =>
        createRichText(getLocalizedField(blog.fields, 'promoSummary', ctx)),

      media: resolveField(['promoImage', 'featuredMedia']),

      variant: () => 'default',

      link: async (blog: any) => blog,

      actions: async (blog: any, _args: any, ctx: ApolloContext) => {
        return [blog];
      }
    }
  }
};

export const pathsConfigs = {
  ...blogV1
};
