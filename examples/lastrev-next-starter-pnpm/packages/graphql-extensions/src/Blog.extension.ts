import gql from 'graphql-tag';
import type { Mappers, ApolloContext } from '@last-rev/types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';

import { createType } from './utils/createType';
import { pageFooterResolver } from './utils/pageFooterResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pathResolver } from './utils/pathResolver';

import { breadcrumbsResolver } from './utils/breadcrumbsResolver';

export const typeDefs = gql`
  extend type Blog {
    header: Header
    footer: Footer
    path: String
    relatedItems: Content
    categories: [CategoryBlog]
    breadcrumbs: [Link]
    author: Person
    hero: Content
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
      breadcrumbs: breadcrumbsResolver,
      // contents: blogGlobalContentsResolver,
      relatedItems: async (blog: any, _args: any, ctx: ApolloContext) =>
        createType('Collection', {
          introText: createType('Text', { title: 'Related Blogs' }),
          items: getLocalizedField(blog.fields, 'relatedItems', ctx),
          variant: 'Three Per Row',
          itemsVariant: 'Blog'
        }),
      hero: async (blog: any, _args: any, ctx: ApolloContext) =>
        createType('Hero', {
          variant: 'default',
          overline: getLocalizedField(blog.fields, 'pubDate', ctx),
          title: getLocalizedField(blog.fields, 'title', ctx),
          sideImageItems: getLocalizedField(blog.fields, 'featuredMedia', ctx)
        })
    },

    Link: {
      text: 'title',
      href: pathResolver
    },

    NavigationItem: {
      text: 'title',
      href: pathResolver
    },

    Card: {
      title: 'title',
      // body: async (blog: any, _args: any, ctx: ApolloContext) =>
      //   createRichText(getLocalizedField(blog.fields, 'promoSummary', ctx)),

      media: async (blog: any, _args: any, ctx: ApolloContext) => {
        const promoImage =
          getLocalizedField(blog.fields, 'promoImage', ctx) ?? getLocalizedField(blog.fields, 'featuredMedia', ctx);
        if (!promoImage) return null;
        return [promoImage];
      },

      variant: () => 'default',

      link: async (blog: any, _args: any, ctx: ApolloContext) => {
        return blog;
      }

      // actions: async (blog: any, _args: any, ctx: ApolloContext) => {
      //   return [
      //     createType('Link', {
      //       id: blog.id,
      //       text: 'Read More',
      //       linkedContent: blog,
      //       variant: 'buttonContained'
      //     })
      //   ];
      // }
    }
  }
};
