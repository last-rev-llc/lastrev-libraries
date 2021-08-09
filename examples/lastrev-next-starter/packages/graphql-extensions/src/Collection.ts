// import { ApolloContext, getLocalizedField } from '@last-rev/graphql-contentful-core';
import gql from 'graphql-tag';
import { camelCase, toUpper } from 'lodash';

const pascalCase = (str: string) => camelCase(str).replace(/^(.)/, toUpper);
export const typeDefs = gql`
  union CollectionItem = Card | Link | NavigationItem
  extend type Collection {
    items: [CollectionItem]
  }
`;

// export const typeMappings = {
//   sectionContentCards: 'Collection'
// };

// const filterToContentTypeMap: Record<string, string> = {
//   'All Blog Posts': 'blogPost'
// };

export const mappers = {
  Collection: {
    Collection: {
      // items: async (collection: any, _args: any, ctx: ApolloContext) => {
      //   try {
      //     const items = await getLocalizedField(collection.fields, 'items', ctx);
      //     return items;
      //   } catch (error) {
      //     console.log('error', error);
      //   }
      //   return [];
      // }
    }
  }
};

// TODO: include the collection variant for resolving the Collection Item type
const ITEM_MAPPING: { [key: string]: string } = {
  Page: 'Link'
};

export const resolvers = {
  CollectionItem: {
    __resolveType: (item: any) => {
      return (
        ITEM_MAPPING[pascalCase(item?.sys?.contentType?.sys?.id) ?? ''] ?? pascalCase(item?.sys?.contentType?.sys?.id)
      );
    }
  }
};
