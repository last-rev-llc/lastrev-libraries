import gql from 'graphql-tag';

export const typeMappings = {};

export const typeDefs = gql`
  extend type Card {
    # Unccoment if using Media reference
    # media: [Media]
    actions: [Link]
    link: Link
  }
`;
