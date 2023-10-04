import gql from 'graphql-tag';

import type { ApolloContext, Mappers } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

export const typeDefs = gql`
  extend type CollectionExpandableItem {
    content: [Content]
    body: RichText
  }
`;

export const mappers: Mappers = {
  CollectionExpandableItem: {
    CollectionExpandableItem: {
      content: async (collectionExpandableItem: any, _args: any, ctx: ApolloContext) => {
        // Check if body exists, if so, this should override items;
        // TODO: check body and bodyRte?
        let body = getLocalizedField(collectionExpandableItem.fields, 'bodyRte', ctx) ?? [];
        if (body) return null;
      }
    }
  }
};
