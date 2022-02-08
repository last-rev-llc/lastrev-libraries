import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Footer {
    media: [Media]
    navigationItems: [NavigationItem]
    disclaimerText: RichText
    logoLink: Link
    actions: [Link]
  }
`;
