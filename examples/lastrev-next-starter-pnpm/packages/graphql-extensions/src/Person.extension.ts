import gql from 'graphql-tag';
import type { ApolloContext, Mappers } from '@last-rev/types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';

import { pageV1 } from './PathsConfigs.extension';
import { pageFooterResolver } from './utils/pageFooterResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pathResolver } from './utils/pathResolver';
import { resolveField } from './utils/resolveField';
import { breadcrumbsResolver } from './utils/breadcrumbsResolver';

export const typeDefs = gql`
  extend type Person {
    header: Header
    footer: Footer
    path: String
    body: RichText
    socialLinks: [Link]
    mainImage: Media
    breadcrumbs: [Link]
  }
`;

export const mappers: Mappers = {
  Person: {
    Person: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver,
      breadcrumbs: breadcrumbsResolver
    },

    Link: {
      text: 'name',
      href: pathResolver
    },

    Card: {
      body: async (person: any, _args: any, ctx: ApolloContext) =>
        createRichText(getLocalizedField(person.fields, 'promoSummary', ctx)),

      media: resolveField(['promoImage', 'mainImage']),

      variant: () => 'default',

      link: async (person: any) => person,

      actions: async (person: any, _args: any, ctx: ApolloContext) => {
        return [person];
      }
    }
  }
};

export const pathsConfigs = {
  ...pageV1
};
