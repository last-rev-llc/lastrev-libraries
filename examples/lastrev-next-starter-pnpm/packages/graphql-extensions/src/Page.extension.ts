import gql from 'graphql-tag';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';

import { pageV1 } from './PathsConfigs.extension';
import pathResolver from './utils/pathResolver';
import pageHeaderResolver from './utils/pageHeaderResolver';
import pageFooterResolver from './utils/pageFooterResolver';
import resolveField from './utils/resolveField';

export const typeMappings = {};

export const typeDefs = gql`
  extend type Page {
    header: Header
    footer: Footer
    path: String
    hero: Hero
    contents: [Content]
  }
`;

export const mappers = {
  Page: {
    Page: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver
    },

    Link: {
      href: pathResolver,
      text: 'title'
    },

    Card: {
      body: async (page: any, _args: any, ctx: ApolloContext) =>
        createRichText(getLocalizedField(page.fields, 'promoSummary', ctx)),

      media: resolveField(['promoImage']),

      variant: () => 'default',

      actions: async (page: any, _args: any, ctx: ApolloContext) => {
        return [page];
      }
    }
  }
};

export const pathsConfigs = {
  ...pageV1
};
