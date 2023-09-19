import gql from 'graphql-tag';
import { getLocalizedField, createRichText } from '@last-rev/graphql-contentful-core';
import { ApolloContext, Mappers } from '@last-rev/types';

export const typeDefs = gql`
  extend type Quote {
    media: [Media]
    title: String
    body: RichText
    variant: String
  }
`;

export const mappers: Mappers = {
  Quote: {
    Quote: {
      title: 'source',
      media: async (quote: any, _args: any, ctx: ApolloContext) => {
        const image: any = getLocalizedField(quote.fields, 'image', ctx);
        return [image];
      },
      body: async (quote: any, _args: any, ctx: ApolloContext) => {
        const body: any = getLocalizedField(quote.fields, 'quote', ctx);
        return createRichText(body);
      },
      variant: () => 'quote'
    }
  }
};
