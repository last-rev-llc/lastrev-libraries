import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import createType from './utils/createType';

export const mappers: any = {
  Person: {
    Card: {
      title: 'name',
      subtitle: 'jobTitle',
      media: async (person: any, _args: any, ctx: ApolloContext) => {
        const imageRef: any = getLocalizedField(person.fields, 'image', ctx);
        if (imageRef) {
          return [await ctx.loaders.assetLoader.load({ id: imageRef.sys.id, preview: !!ctx.preview })];
        }
        return [];
      },
      actions: async (person: any, _args: any, ctx: ApolloContext) => {
        const linkedInUrl: any = getLocalizedField(person.fields, 'linkedInUrl', ctx);
        let actions = [];
        if (linkedInUrl) {
          actions.push(
            createType('Link', {
              manualUrl: linkedInUrl,
              icon: 'linkedin'
            })
          );
        }
        return actions;
      },
      variant: () => 'person-with-image'
    }
  }
};
