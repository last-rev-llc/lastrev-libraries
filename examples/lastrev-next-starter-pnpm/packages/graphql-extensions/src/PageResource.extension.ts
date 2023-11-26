import gql from 'graphql-tag';
import type { Mappers, ApolloContext } from '@last-rev/types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';
import * as types from '@contentful/rich-text-types';

import { createType } from './utils/createType';
import { pageFooterResolver } from './utils/pageFooterResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pathResolver } from './utils/pathResolver';

import { breadcrumbsResolver } from './utils/breadcrumbsResolver';
import { pageSubNavigationResolver } from './utils/pageSubNavigationResolver';

export const typeDefs = gql`
  extend type PageResource {
    variant: String
    header: Header
    footer: Footer
    hero: Hero
    path: String
    jsonLd: JSON
    contents: [Content]
    breadcrumbs: [Link]
    author: Person
    subNavigation: NavigationItem
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
interface Heading {
  [key: string]: number;
}

const HEADINGS: Heading = {
  [types.BLOCKS.HEADING_1]: 1,
  [types.BLOCKS.HEADING_2]: 2,
  [types.BLOCKS.HEADING_3]: 3,
  [types.BLOCKS.HEADING_4]: 4,
  [types.BLOCKS.HEADING_5]: 5,
  [types.BLOCKS.HEADING_6]: 6
};

export const mappers: Mappers = {
  PageResource: {
    PageResource: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver,
      breadcrumbs: breadcrumbsResolver,
      variant: 'resourceType',
      subNavigation: pageSubNavigationResolver,
      body: async (article: any, _args: any, ctx: ApolloContext) => {
        const body = await getLocalizedField(article?.fields, 'body', ctx);
        if (!body || !body.content) return;

        for (let item of body.content) {
          const headingLevel = HEADINGS[item.nodeType];

          if (!headingLevel || headingLevel !== 2) continue;
          const value = item.content[0]?.value?.trim() as string;
          if (!value || value === '') continue;

          const href = value
            // reference: https://gist.github.com/codeguy/6684588
            .normalize('NFKD')
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/[-\s]+/g, '-');

          item.data.id = href;
        }
        return body;
      }
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
      overline: 'resourceType',
      media: async (pageresource: any, _args: any, ctx: ApolloContext) => {
        const promoImage =
          getLocalizedField(pageresource.fields, 'promoImage', ctx) ??
          getLocalizedField(pageresource.fields, 'featuredMedia', ctx);
        if (!promoImage) return null;
        return [promoImage];
      },

      variant: () => 'blog',
      body: async (blog: any, _args: any, ctx: ApolloContext) =>
        getLocalizedField(blog.fields, 'promoSummary', ctx)
          ? createRichText(getLocalizedField(blog.fields, 'promoSummary', ctx))
          : null,
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
