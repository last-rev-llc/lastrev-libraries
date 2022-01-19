import gql from 'graphql-tag';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';

export const typeDefs = gql`
  extend type Quote {
    variant: String
    quote: String
    authorName: String
    authorTitle: String
    quoteImage: Media
    actions: [Link]
  }
`;

export const mappers: any = {
  Quote: {
    Quote: {
      quoteImage: async (quote: any, _args: any, ctx: ApolloContext) => {
        const image: any = getLocalizedField(quote.fields, 'image', ctx);
        return image;
      }
    }
  }
};
