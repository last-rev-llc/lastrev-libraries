import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type GlobalSettings {
    footerNavigation: [NavigationItem!]
    headerNavigation: [NavigationItem!]
    mainNavigation: [NavigationItem!]
  }
`;
