import gql from 'graphql-tag';
import { Mappers } from '@last-rev/types';

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
