import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type CategoryArticleLinkHierarchyNode {
    id: String
    text: String
    href: String
    subCategories: [CategoryArticleLinkHierarchyNode]
  }
`;