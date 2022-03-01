import gql from 'graphql-tag';
export const typeDefs = gql`
  extend type Card {
    pubDate: Date
  }
`;

export const mappers: any = {
  Card: {
    Card: {
      pubDate: 'pubDate'
    }
  }
};
