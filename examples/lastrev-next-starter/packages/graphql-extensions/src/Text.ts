import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Text {
    textHeader: String
    textSubheader: String
    textActions: [Link],
    colorScheme: String
  }
`;
