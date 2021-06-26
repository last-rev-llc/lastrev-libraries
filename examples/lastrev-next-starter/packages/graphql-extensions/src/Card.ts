import gql from 'graphql-tag';

export const typeMappings = {
  promoCard: 'card'
};

export const typeDefs = gql`
  extend type Card {
    cta: Link
  }
`;
