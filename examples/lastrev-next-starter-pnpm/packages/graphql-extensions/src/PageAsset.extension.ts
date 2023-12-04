import type { Mappers } from '@last-rev/types';
import type { ApolloContext } from './types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';

export const mappers: Mappers = {
  PageAsset: {
    Card: {
      title: async (pageAsset: any, _args: any, ctx: ApolloContext) => {
        return '';
      },

      media: async (pageAsset: any, _args: any, ctx: ApolloContext) => {
        const promoImage = getLocalizedField(pageAsset.fields, 'promoImage', ctx);
        if (!promoImage) return null;
        return [promoImage];
      },

      subtitle: async (pageAsset: any, _args: any, ctx: ApolloContext) => {
        const tags = [];
        const strategy = getLocalizedField(pageAsset.fields, 'strategy', ctx);
        if (strategy) tags.push(strategy);

        const sector = getLocalizedField(pageAsset.fields, 'sector', ctx);
        if (sector) tags.push(sector);

        const location = getLocalizedField(pageAsset.fields, 'location', ctx);
        if (location) tags.push(location);

        if (tags.length) return tags.join(' • ');

        return null;
      },

      body: async (pageAsset: any, _args: any, ctx: ApolloContext) => {
        const promoSummary = getLocalizedField(pageAsset.fields, 'promoSummary', ctx) || '';

        if (promoSummary) await createRichText(promoSummary);

        return null;
      }
    }
  }
};
