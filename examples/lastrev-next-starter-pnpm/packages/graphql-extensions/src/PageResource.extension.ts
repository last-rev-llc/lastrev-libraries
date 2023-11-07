import gql from 'graphql-tag';
import type { Mappers, ApolloContext } from '@last-rev/types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';

import { createType } from './utils/createType';
import { pageFooterResolver } from './utils/pageFooterResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pathResolver } from './utils/pathResolver';

import { breadcrumbsResolver } from './utils/breadcrumbsResolver';

export const typeDefs = gql`
  extend type PageResource {
    header: Header
    footer: Footer
    hero: Hero
    path: String
    jsonLd: JSON
    breadcrumbs: [Link]
    author: Person
  }
`;

// Controls which site the PageResources gets it's global config from
// const PAGERESOURCES_SITE_ID = process.env.PAGERESOURCES_SITE_ID ?? (process.env.DEFAULT_SITE_ID || process.env.SITE_ID);

// const pageresourceGlobalContentsResolver = async (page: any, _args: any, ctx: ApolloContext) => {
//   // TODO: Make getting a localized resolved link a single function
//   const siteRef: any = getLocalizedField(page.fields, 'site', ctx);
//   const site = await ctx.loaders.entryLoader.load({ id: siteRef?.sys?.id ?? PAGERESOURCES_SITE_ID, preview: !!ctx.preview });
//   const sitepageresourceGlobalContents: any = getLocalizedField(site?.fields, 'pageresourceGlobalContents', ctx);
//   return sitepageresourceGlobalContents;
// };

export const mappers: Mappers = {
  PageResource: {
    PageResource: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver,
      breadcrumbs: breadcrumbsResolver
      // contents: pageresourceGlobalContentsResolver,
      // relatedItems: async (pageresource: any, _args: any, ctx: ApolloContext) =>
      //   createType('Collection', {
      //     introText: createType('Text', { title: 'Related PageResources' }),
      //     items: getLocalizedField(pageresource.fields, 'relatedItems', ctx),
      //     variant: 'Three Per Row',
      //     itemsVariant: 'PageResource'
      //   })
      // hero: async (pageresource: any, _args: any, ctx: ApolloContext) =>
      //   createType('Hero', {
      //     variant: 'default',
      //     overline: getLocalizedField(pageresource.fields, 'pubDate', ctx),
      //     title: getLocalizedField(pageresource.fields, 'title', ctx),
      //     sideImageItems: getLocalizedField(pageresource.fields, 'featuredMedia', ctx)
      //   })
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
      body: () => null,
      overline: 'resourceType',
      media: async (pageresource: any, _args: any, ctx: ApolloContext) => {
        const promoImage =
          getLocalizedField(pageresource.fields, 'promoImage', ctx) ??
          getLocalizedField(pageresource.fields, 'featuredMedia', ctx);
        if (!promoImage) return null;
        return [promoImage];
      },

      variant: () => 'blog',

      link: async (pageresource: any, _args: any, ctx: ApolloContext) => {
        return pageresource;
      }

      // actions: async (pageresource: any, _args: any, ctx: ApolloContext) => {
      //   return [
      //     createType('Link', {
      //       id: pageresource.id,
      //       text: 'Read More',
      //       linkedContent: pageresource,
      //       variant: 'buttonContained'
      //     })
      //   ];
      // }
    }
  }
};
