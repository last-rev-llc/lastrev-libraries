import gql from 'graphql-tag';
import type { ApolloContext, Mappers } from '@last-rev/types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';

import { pageFooterResolver } from './utils/pageFooterResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pathResolver } from './utils/pathResolver';
import { resolveField } from './utils/resolveField';
import { breadcrumbsResolver } from './utils/breadcrumbsResolver';
import { createType } from './utils/createType';

export const typeDefs = gql`
  extend type Person {
    header: Header
    footer: Footer
    path: String
    body: RichText
    socialLinks: [Link]
    mainImage: Media
    breadcrumbs: [Link]
    hero: Hero
  }
`;

export const mappers: Mappers = {
  Person: {
    Person: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver,
      breadcrumbs: breadcrumbsResolver,
      hero: async (person: any, _args: any, ctx: ApolloContext) =>
        createType('Hero', {
          variant: 'mediaOnRight',
          overline: getLocalizedField(person.fields, 'jobTitle', ctx),
          title: getLocalizedField(person.fields, 'name', ctx),
          sideImageItems: [getLocalizedField(person.fields, 'mainImage', ctx)]
        })
    },

    Link: {
      text: 'name',
      href: pathResolver
    },

    NavigationItem: {
      text: 'name',
      href: pathResolver
    },

    Card: {
      body: async (person: any, _args: any, ctx: ApolloContext) =>
        createRichText(getLocalizedField(person.fields, 'promoSummary', ctx)),

      media: async (blog: any, _args: any, ctx: ApolloContext) => {
        const promoImage =
          getLocalizedField(blog.fields, 'promoImage', ctx) ?? getLocalizedField(blog.fields, 'mainImage', ctx);
        if (!promoImage) return null;
        return [promoImage];
      },

      variant: () => 'default',

      link: async (person: any, _args: any, ctx: ApolloContext) => {
        return person;
      },

      actions: async (person: any, args: any, ctx: ApolloContext) => {
        return [
          createType('Link', {
            id: person.id,
            text: 'Read More',
            href: await pathResolver(person, args, ctx),
            variant: 'buttonContained'
          })
        ];
      }
    }
  }
};
