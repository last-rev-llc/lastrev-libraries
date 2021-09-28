import gql from 'graphql-tag';

export const typeMappings = {};

export const typeDefs = gql`
  extend type Card {
    media: [Media]
    actions: [Link]
    link: Link
  }
`;
