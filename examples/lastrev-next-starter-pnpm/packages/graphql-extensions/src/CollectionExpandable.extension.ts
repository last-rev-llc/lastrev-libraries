import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type CollectionExpandable {
    items: [CollectionExpandableItem]
    introText: Text
  }
`;

export const mappers: any = {
  CollectionExpandable: {
    CollectionExpandable: {}
  }
};
