import gql from 'graphql-tag';

export const typeDefs = gql`
  type Footer {
    id: String
    sidekickLookup: JSON
    logoLink: Link
    navigationItems: [Collection]
    lowerNavLinks: [Collection]
    actions: [Link]
  }
`;