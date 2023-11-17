import gql from 'graphql-tag';
import type { Mappers } from '@last-rev/types';
import type { ApolloContext } from './types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';

import { createType } from './utils/createType';
import { pageFooterResolver } from './utils/pageFooterResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pathResolver } from './utils/pathResolver';

import { breadcrumbsResolver } from './utils/breadcrumbsResolver';
// import { siteMediaContactNameResolver } from './utils/siteMediaContactNameResolver';
// import { siteMediaContactEmailResolver } from './utils/siteMediaContactEmailResolver';
// import { siteMediaContactPhoneResolver } from './utils/siteMediaContactPhoneResolver';
// import { siteNewsDefaultAboutUsResolver } from './utils/siteNewsDefaultAboutUsResolver';

export const typeDefs = gql`
  extend type Blog {
    header: Header
    footer: Footer
    path: String
    relatedItems: Content
    categories: [CategoryBlog]
    breadcrumbs: [Link]
    author: Person
    hero: Content
    aboutText: RichText
    mediaContactName: String
    mediaContactEmail: String
    mediaContactPhone: JSON
  }
`;

export const mappers: Mappers = {
  Blog: {
    Blog: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver,
      breadcrumbs: breadcrumbsResolver,
      // mediaContactName: siteMediaContactNameResolver,
      // mediaContactEmail: siteMediaContactEmailResolver,
      // mediaContactPhone: siteMediaContactPhoneResolver,
      // aboutText: siteNewsDefaultAboutUsResolver,
      relatedItems: async (blog: any, _args: any, ctx: ApolloContext) =>
        createType('CollectionDynamic', {
          introText: createType('Text', { title: 'Related News' }),
          items: getLocalizedField(blog.fields, 'relatedItems', ctx) ?? [],
          variant: 'threePerRow',
          itemsVariant: 'news',
          settings: {
            limit: 3,
            contentType: 'blog'
          }
        }),
      hero: async (blog: any, _args: any, ctx: ApolloContext) =>
        createType('Hero', {
          variant: 'mediaOnRightFullBleed',
          overline: getLocalizedField(blog.fields, 'pubDate', ctx),
          title: getLocalizedField(blog.fields, 'title', ctx),
          sideImageItems: getLocalizedField(blog.fields, 'featuredMedia', ctx) ?? []
        })
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
      body: async (blog: any, _args: any, ctx: ApolloContext) =>
        createRichText(getLocalizedField(blog.fields, 'promoSummary', ctx)),

      media: async (blog: any, args: any, ctx: ApolloContext) => {
        const promoImage =
          getLocalizedField(blog.fields, 'promoImage', ctx) ?? getLocalizedField(blog.fields, 'featuredMedia', ctx);
        if (!promoImage) return null;
        return [promoImage];
      },

      variant: () => 'buttonText',

      link: async (blog: any, _args: any, ctx: ApolloContext) => {
        return blog;
      },

      actions: async (blog: any, _args: any, ctx: ApolloContext) => {
        return [
          createType('Link', {
            id: blog.id,
            text: 'Read More',
            icon: 'logo',
            iconPosition: 'Left',
            href: await pathResolver(blog, _args, ctx),
            // linkedContent: page,
            variant: 'buttonText'
          })
        ];
      }
    }
  }
};
