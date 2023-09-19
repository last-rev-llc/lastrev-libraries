import gql from 'graphql-tag';
import { camelCase, toUpper } from 'lodash';

import defaultResolver from './utils/defaultResolver';
import pathResolver from './utils/pathResolver';

const pascalCase = (str: string) => camelCase(str).replace(/^(.)/, toUpper);

export const typeDefs = gql`
  extend type NavigationItem {
    actions: [Link]
    media: [Media]
    subNavigation: [Content]
    href: String
    summary: RichText
  }
`;

export const mappers = {
  NavigationItem: {
    NavigationItem: {
      variant: defaultResolver('variant'),
      // image: (item: any, _args: any, ctx: ApolloContext) => {
      //   const mediaRef: any = getLocalizedField(item.fields, 'media', ctx);
      //   return mediaRef;
      // },
      href: pathResolver,
      subNavigation: 'subNavigation'
    }
  }
};

const ITEM_MAPPING: { [key: string]: string } = {
  media: 'Media',
  mediaVideo: 'MediaVideo'
};

export const resolvers = {
  NavMediaItem: {
    __resolveType: (item: any) => {
      return ITEM_MAPPING[pascalCase(item?.sys?.contentType?.sys?.id)];
    }
  }
};
