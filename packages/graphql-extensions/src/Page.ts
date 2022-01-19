import gql from 'graphql-tag';
//import { getLocalizedField } from '@last-rev/graphql-contentful-core';
//import { ApolloContext } from '@last-rev/types';

export const typeDefs = gql`
  extend type Page {
  }
`;

export const mappers: any = {
  Page: {
    Page: {}
  }
};
