import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';

export const mappers: any = {
  Collection: {
    Collection: {
      settings: async (ref: any, _args: any, ctx: ApolloContext) => {
        const settings: any = await getLocalizedField(ref.fields, 'settings', ctx);
        const variant: any = await getLocalizedField(ref.fields, 'variant', ctx);
        if (variant === 'Search Filters' && !settings?.attribute) return { attribute: 'categories.level-1' };
        return settings;
      }
    }
  }
};
