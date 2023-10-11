import gql from 'graphql-tag';
import type { ApolloContext, Mappers, PathInfo } from '@last-rev/types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';

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
      breadcrumbs: breadcrumbsResolver,
      href: async (person: any, _args: any, ctx: ApolloContext) => {
        // const currentPath = ctx.path;
        const pathInfos: PathInfo[] = await ctx.loadPathsForContent(person, ctx, process.env.SITE);

        // if you are under a specific category, show the blog post link containing that
        // category, otherwise, show the base path
        // const match = currentPath?.match(/\/blogs\/([^\/]*)\/.*/); // Fixed the regex by closing it properly
        // const currentCategory = match && match[1];

        let path: string | null = null;

        for (let pathInfo of pathInfos) {
          if (!path) path = pathInfo.path;
          // Added `let` before pathInfo
          // if (pathInfo.path.startsWith(`/blogs/${currentCategory}`)) {
          //   path = pathInfo.path;
          // } else if (!path && pathInfo.pathEntries && pathInfo.pathEntries.length === 2) {
          //   path = pathInfo.path;
          // }
        }
        // return path;
        return '/#test';
      }
    },

    Link: {
      text: 'name',
      // href: pathResolver
      href: pathResolver
    },

    NavigationItem: {
      href: pathResolver,
      text: 'title'
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
