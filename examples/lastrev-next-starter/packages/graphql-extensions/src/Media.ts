import gql from 'graphql-tag';
export const typeDefs = gql`
  extend type Hero {
    background: Content
  }
`;
