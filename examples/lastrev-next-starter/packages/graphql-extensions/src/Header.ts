import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Header {
    logoLink: Link
    navigationItems: [Collection]
    actions: [Link]
  }
`;
