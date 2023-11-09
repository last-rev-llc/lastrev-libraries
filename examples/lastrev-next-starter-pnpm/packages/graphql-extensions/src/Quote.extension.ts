import gql from 'graphql-tag';
import type { ApolloContext, Mappers } from '@last-rev/types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';
import { createType } from './utils/createType';

export const typeDefs = gql`
  extend type Quote {
    image: Media
    logo: Media
    actions: [Link]
  }
`;

export const mappers: Mappers = {
  Quote: {
    Card: {}
  }
};
