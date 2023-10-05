import gql from 'graphql-tag';
import type { Mappers, ApolloContext } from '@last-rev/types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';

import { pageV1 } from './PathsConfigs.extension';
import { pathResolver } from './utils/pathResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pageFooterResolver } from './utils/pageFooterResolver';
import { resolveField } from './utils/resolveField';
import { breadcrumbsResolver } from './utils/breadcrumbsResolver';

export const typeMappings = {};

export const typeDefs = gql`
  extend type Page {
    header: Header
    footer: Footer
    path: String
    hero: Hero
    contents: [Content]
    breadcrumbs: [Link]
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
