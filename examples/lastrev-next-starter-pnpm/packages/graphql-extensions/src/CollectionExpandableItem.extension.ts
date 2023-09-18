import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type CollectionExpandableItem {
    content: [Content]
  }
`;

export const mappers: any = {
  CollectionExpandableItem: {
    CollectionExpandableItem: {}
  }
};
