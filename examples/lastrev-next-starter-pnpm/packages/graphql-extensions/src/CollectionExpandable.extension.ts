import gql from 'graphql-tag';
import type { Mappers } from '@last-rev/types';

export const typeDefs = gql`
  extend type CollectionExpandable {
    items: [CollectionExpandableItem]
    introText: Text
  }
`;

export const mappers: Mappers = {
  CollectionExpandable: {
    CollectionExpandable: {}
  }
};
