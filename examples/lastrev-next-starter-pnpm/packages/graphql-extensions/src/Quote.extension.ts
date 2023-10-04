import gql from 'graphql-tag';
import type { Mappers } from '@last-rev/types';

export const typeDefs = gql`
  extend type Quote {
    image: Media
    logo: Media
  }
`;

export const mappers: Mappers = {
  Quote: {
    Quote: {}
  }
};
