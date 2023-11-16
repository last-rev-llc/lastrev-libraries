import gql from 'graphql-tag';

import createRichText from '@last-rev/graphql-contentful-core/dist/utils/createRichText';
import getLocalizedField from '@last-rev/graphql-contentful-core/dist/utils/getLocalizedField';
import type { ApolloContext, Mappers } from '@last-rev/types';

import { pageFooterResolver } from './utils/pageFooterResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pageContentsResolver } from './utils/pageContentsResolver';
import { pathResolver } from './utils/pathResolver';
import { resolveField } from './utils/resolveField';

export const typeDefs = gql`
  extend type CategoryBlog {
    header: Header
    footer: Footer
    path: String
    hero: Hero
    contents: [Content]
  }
`;

export const mappers: Mappers = {
  CategoryBlog: {
    CategoryBlog: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver,
      contents: pageContentsResolver
    },

    Link: {
      // TODO: When pathLookup is implemented remove this in favour of Link generic resolver
      text: 'title',
      href: pathResolver
    },

    Card: {
      body: async (categoryBlog: any, _args: any, ctx: ApolloContext) =>
        createRichText(getLocalizedField(categoryBlog.fields, 'promoSummary', ctx)),

      media: resolveField(['promoImage', 'featuredMedia']),

      variant: () => 'default',

      link: async (categoryBlog: any) => categoryBlog,

      actions: async (categoryBlog: any, _args: any, ctx: ApolloContext) => {
        return [categoryBlog];
      }
    }
  }
};
