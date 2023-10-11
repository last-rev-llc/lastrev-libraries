import gql from 'graphql-tag';

import { defaultResolver } from './utils/defaultResolver';
import { pathResolver } from './utils/pathResolver';
import { pascalCase } from './utils/pascalCase';

const SUB_NAVIGATION_ITEM_TYPES = ['Link', 'NavigationItem'];

export const typeDefs = gql`
  extend type NavigationItem {
    actions: [Link]
    navMedia: Media
    subNavigation: [SubNavigationItem]
    href: String!
    summary: RichText,
    icon: String
    iconPosition: String
  }

  union SubNavigationItem = ${SUB_NAVIGATION_ITEM_TYPES.join('| ')}
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

const ITEM_MAPPING: { [key: string]: string } = {
  NavigationItem: 'NavigationItem',
  Link: 'Link'
};

export const resolvers = {
  SubNavigationItem: {
    __resolveType: (item: any) => {
      const type =
        ITEM_MAPPING[pascalCase(item?.sys?.contentType?.sys?.id) ?? ''] ?? pascalCase(item?.sys?.contentType?.sys?.id);
      if (SUB_NAVIGATION_ITEM_TYPES.includes(type)) return type;

      return 'Link';
    }
  }
};
