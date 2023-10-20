import gql from 'graphql-tag';

import { defaultResolver } from './utils/defaultResolver';

import type { ApolloContext, Mappers } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { createType } from './utils/createType';

export const typeDefs = gql`
  extend type Block {
    introText: Text
    mediaItems: [Media]
    actions: [Link]
    link: Link
    supplementalContent: Content
    backgroundImage: Media
  }
`;

export const mappers: Mappers = {
  Block: {
    Block: {
      variant: defaultResolver('variant'),
      actions: async (block: any, _args: any, ctx: ApolloContext) => {
        const actionsRef = getLocalizedField(block.fields, 'actions', ctx);
        if (!actionsRef?.length) return null;

        // const actions: any[] = (
        return (
          await ctx.loaders.entryLoader.loadMany(
            actionsRef?.map((x: any) => ({ id: x?.sys?.id, preview: !!ctx.preview }))
          )
        )
          .filter(Boolean)
          .map((x: any) => {
            return createType('Link', {
              icon: 'logo',
              iconPosition: 'left',
              variant: 'buttonText',
              ...x
            });
          });
        // return actions;
      },
      mediaItems: async (block: any, _args: any, ctx: ApolloContext) => {
        const mediaItem = getLocalizedField(block.fields, 'asset', ctx);
        if (mediaItem) return [mediaItem];
        return null;
      },
      body: async (block: any, _args: any, ctx: ApolloContext) => {
        const mediaItem = getLocalizedField(block.fields, 'asset', ctx);
        const supplementalContent = getLocalizedField(block.fields, 'supplementalContent', ctx);
        if (!mediaItem && !supplementalContent) return null;

        return getLocalizedField(block.fields, 'body', ctx);
      },
      supplementalContent: async (block: any, _args: any, ctx: ApolloContext) => {
        const mediaItem = getLocalizedField(block.fields, 'asset', ctx);
        if (mediaItem) return createType('Media', { file: mediaItem });

        const supplementalContent = getLocalizedField(block.fields, 'supplementalContent', ctx);

        if (supplementalContent) return supplementalContent;

        const body = getLocalizedField(block.fields, 'body', ctx);

        if (body) return createType('Text', { body });

        return null;
      }
    }
  }
};
