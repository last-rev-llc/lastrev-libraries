import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';

export const mappers: any = {
  ModuleIntegration: {
    ModuleIntegration: {
      settings: async (ref: any, _args: any, ctx: ApolloContext) => {
        const settings: any = await getLocalizedField(ref.fields, 'settings', ctx);
        const variant: any = await getLocalizedField(ref.fields, 'variant', ctx);
        if (variant === 'autocomplete-search-box') return { ...settings, indexName: process.env.ALGOLIA_INDEX_NAME };
        return settings;
      }
    },
    Link: {
      href: () => '#'
    }
  }
};