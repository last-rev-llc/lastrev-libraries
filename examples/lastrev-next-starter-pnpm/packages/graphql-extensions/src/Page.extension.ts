import gql from 'graphql-tag';
import type { Mappers } from '@last-rev/types';
import type { ApolloContext } from './types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';

import { pathResolver } from './utils/pathResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pageFooterResolver } from './utils/pageFooterResolver';
import { breadcrumbsResolver } from './utils/breadcrumbsResolver';
import { createType } from './utils/createType';

export const typeMappings = {};

export const typeDefs = gql`
  extend type Page {
    header: Header
    footer: Footer
    path: String
    hero: Hero
    contents: [Content]
    breadcrumbs: [Link]
    footerDisclaimerOverride: RichText
    isHomepage: Boolean
  }
`;

export const mappers: Mappers = {
  Page: {
    Page: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver,
      breadcrumbs: breadcrumbsResolver,
      isHomepage: async (page: any, _args: any, ctx: ApolloContext) => {
        const slug = getLocalizedField(page.fields, 'slug', ctx);
        console.log({ slug });
        return slug === '/';
      }
    },

    Link: {
      href: pathResolver,
      text: 'title'
    },

    NavigationItem: {
      href: pathResolver,
      text: 'title'
    },

    Card: {
      body: async (page: any, _args: any, ctx: ApolloContext) =>
        createRichText(getLocalizedField(page.fields, 'promoSummary', ctx)),

      media: async (page: any, _args: any, ctx: ApolloContext) => {
        const promoImage =
          getLocalizedField(page.fields, 'promoImage', ctx) ?? getLocalizedField(page.fields, 'mainImage', ctx);
        if (!promoImage) return null;
        return [promoImage];
      },

      variant: () => 'buttonText',

      link: async (page: any, _args: any, ctx: ApolloContext) => {
        return page;
      },

      actions: async (page: any, _args: any, ctx: ApolloContext) => {
        return [
          createType('Link', {
            id: page.id,
            text: 'Read More',
            icon: 'logo',
            iconPosition: 'Left',
            href: await pathResolver(page, _args, ctx),
            // linkedContent: page,
            variant: 'buttonText'
          })
        ];
      }
    }
  }
};
