import gql from 'graphql-tag';

import camelCase from 'lodash/camelCase';
import toUpper from 'lodash/toUpper';

import defaultResolver from './utils/defaultResolver';
import pathResolver from './utils/pathResolver';

const pascalCase = (str: string) => camelCase(str).replace(/^(.)/, toUpper);

const SUB_NAVIGATION_ITEM_TYPES = ['Link', 'NavigationItem'];

export const typeDefs = gql`
  extend type NavigationItem {
    actions: [Link]
    navMedia: Media
    #subNavigation: [SubNavigationItem]
    href: String!
    summary: RichText
  }

  #union SubNavigationItem = ${SUB_NAVIGATION_ITEM_TYPES.join('| ')}
`;

export const mappers = {
  NavigationItem: {
    NavigationItem: {
      variant: defaultResolver('variant'),
      // image: (item: any, _args: any, ctx: ApolloContext) => {
      //   const mediaRef: any = getLocalizedField(item.fields, 'media', ctx);
      //   return mediaRef;
      // },
      href: pathResolver
    }
  }
};
