import gql from 'graphql-tag';

export const typeDefs = gql`
  type NavigationItem implements Content {
    id: String
    sidekickLookup: JSON
    animation: JSON
    theme: [Theme]
    link: Link
    children: [NavigationItem!]
  }
`;
