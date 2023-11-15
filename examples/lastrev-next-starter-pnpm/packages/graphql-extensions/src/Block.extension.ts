import gql from 'graphql-tag';

import { defaultResolver } from './utils/defaultResolver';

import type { Mappers } from '@last-rev/types';
import type { ApolloContext } from './types';
import { createType } from './utils/createType';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

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

        if (body) return createType('Text', { body, variant: 'smallText' });

        return null;
      }
    }
  }
};
