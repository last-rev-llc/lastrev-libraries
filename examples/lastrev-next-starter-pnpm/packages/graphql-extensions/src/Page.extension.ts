import gql from 'graphql-tag';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';

import pathResolver from './utils/pathResolver';
import pageHeaderResolver from './utils/pageHeaderResolver';
import pageFooterResolver from './utils/pageFooterResolver';
import createType from './utils/createType';

export const typeMappings = {};

export const typeDefs = gql`
  extend type Page {
    header: Header
    footer: Content
    hero: Hero
    contents: [Content]
    path: String
  }
`;

export const mappers = {
  Page: {
    Page: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver,
      seo: async (page: any, _args: any, ctx: ApolloContext) => {
        const seo: any = getLocalizedField(page.fields, 'seo', ctx);
        return {
          ...seo
        };
      }
    },

    Link: {
      href: pathResolver,
      text: 'title'
    },

    Card: {
      body: async (page: any, _args: any, ctx: ApolloContext) =>
        createRichText(getLocalizedField(page.fields, 'promoSummary', ctx)),

      media: async (page: any, _args: any, ctx: ApolloContext) => {
        const promoImageRef: any = getLocalizedField(page?.fields, 'promoImage', ctx);
        if (promoImageRef) return promoImageRef;

        return getLocalizedField(page?.fields, 'featuredMedia', ctx);
      },

      variant: () => 'default',

      actions: async (page: any, _args: any, ctx: ApolloContext) => {
        return [page];
      }
    }
  }
};
