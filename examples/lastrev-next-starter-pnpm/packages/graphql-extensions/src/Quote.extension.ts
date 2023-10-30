import gql from 'graphql-tag';
import type { Mappers } from '@last-rev/types';
import type { ApolloContext } from './types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';
import { createType } from './utils/createType';

export const typeDefs = gql`
  extend type Quote {
    image: Media
    logo: Media
  }
`;

export const mappers: Mappers = {
  Quote: {
    Quote: {},
    Card: {
      body: async (quote: any, _args: any, ctx: ApolloContext) =>
        createRichText(getLocalizedField(quote.fields, 'quote', ctx)),

      media: async (quote: any, _args: any, ctx: ApolloContext) => {
        const image = getLocalizedField(quote.fields, 'image', ctx);
        if (!image) return null;
        return [image];
      },

      variant: () => 'default',

      actions: async (quote: any, _args: any, ctx: ApolloContext) => {
        const actionsRef = getLocalizedField(quote.fields, 'actions', ctx);
        const actions: any[] = (
          await ctx.loaders.entryLoader.loadMany(
            actionsRef?.map((x: any) => ({ id: x?.sys?.id, preview: !!ctx.preview }))
          )
        )
          .filter(Boolean)
          .map((x: any) => {
            return {
              ...x,
              text: 'hello',
              variant: 'buttonContained'
            };
          });
        return actions;
      }
    }
  }
};
