import gql from 'graphql-tag';
import type { Mappers, ApolloContext } from '@last-rev/types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';

import { pathResolver } from './utils/pathResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pageFooterResolver } from './utils/pageFooterResolver';
import { resolveField } from './utils/resolveField';
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
  }
`;

export const mappers: Mappers = {
  Page: {
    Page: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver,
      breadcrumbs: breadcrumbsResolver
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

      variant: () => 'default',

      actions: async (page: any, _args: any, ctx: ApolloContext) => {
        return [
          createType('Link', {
            id: page.id,
            text: 'Read More',
            linkedContent: page,
            variant: 'buttonContained'
          })
        ];
      }
    }
  }
};
