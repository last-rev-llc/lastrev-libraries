import gql from 'graphql-tag';

import createRichText from '@last-rev/graphql-contentful-core/dist/utils/createRichText';
import getLocalizedField from '@last-rev/graphql-contentful-core/dist/utils/getLocalizedField';
import { ApolloContext, Mappers } from '@last-rev/types';

import pageFooterResolver from './utils/pageFooterResolver';
import pageHeaderResolver from './utils/pageHeaderResolver';
import pathResolver from './utils/pathResolver';
import resolveField from './utils/resolveField';

export const typeDefs = gql`
  extend type Person {
    header: Header
    footer: Footer
    path: String
    body: RichText
    socialLinks: [Link]
    mainImage: Media
  }
`;

export const mappers: Mappers = {
  Person: {
    Person: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver
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
