import gql from 'graphql-tag';
import type { Mappers } from '@last-rev/types';
import type { ApolloContext } from './types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';

import { pageFooterResolver } from './utils/pageFooterResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pathResolver } from './utils/pathResolver';
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
    hero: Content
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
          variant: 'mediaOnRightFullBleed',
          backgroundColor: 'navy',
          overline: getLocalizedField(person.fields, 'jobTitle', ctx),
          title: getLocalizedField(person.fields, 'name', ctx),
          sideImageItems: [getLocalizedField(person.fields, 'mainImage', ctx)] ?? []
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
      title: 'name',
      subtitle: 'jobTitle',
      body: async (person: any, _args: any, ctx: ApolloContext) =>
        createRichText(getLocalizedField(person.fields, 'promoSummary', ctx)),

      media: async (blog: any, _args: any, ctx: ApolloContext) => {
        const promoImage =
          getLocalizedField(blog.fields, 'promoImage', ctx) ?? getLocalizedField(blog.fields, 'mainImage', ctx);
        if (!promoImage) return null;
        return [promoImage];
      },

      variant: () => 'buttonText',

      link: async (person: any, _args: any, ctx: ApolloContext) => {
        return person;
      },

      actions: async (person: any, args: any, ctx: ApolloContext) => {
        const text = getLocalizedField(person.fields, 'promoLinkText', ctx) ?? 'Read More';
        return [
          createType('Link', {
            id: person.id,
            text,
            icon: 'logo',
            iconPosition: 'Left',
            href: await pathResolver(person, args, ctx),
            variant: 'buttonText'
          })
        ];
      }
    }
  }
};
