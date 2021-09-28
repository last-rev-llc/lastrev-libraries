import gql from 'graphql-tag';

export const mappers = {};
export const typeDefs = gql`
  extend type Hero {
    actions: [Link]
    image: [Media]
  }
`;
