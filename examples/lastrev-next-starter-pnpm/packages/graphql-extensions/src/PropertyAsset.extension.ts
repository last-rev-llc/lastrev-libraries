import gql from 'graphql-tag';
import type { Mappers } from '@last-rev/types';
import type { ApolloContext } from './types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';

export const typeDefs = gql`
  extend type PageAsset {
    body: RichText
    mainImage: Media
  }
`;

export const mappers: Mappers = {
  PageAsset: {
    Card: {
      title: 'name',

      body: async (propertyAsset: any, _args: any, ctx: ApolloContext) =>
        createRichText(getLocalizedField(propertyAsset.fields, 'promoSummary', ctx)),

      media: async (propertyAsset: any, _args: any, ctx: ApolloContext) => {
        const promoImage = getLocalizedField(propertyAsset.fields, 'promoImage', ctx);
        if (!promoImage) return null;
        return [promoImage];
      }
    }
  }
};
