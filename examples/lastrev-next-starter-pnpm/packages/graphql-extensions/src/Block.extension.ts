import gql from 'graphql-tag';

import { defaultResolver } from './utils/defaultResolver';

import type { ApolloContext, Mappers } from '@last-rev/types';
import { resolveField } from './utils/resolveField';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

export const typeDefs = gql`
  extend type Block {
    introText: Text
    mediaItems: [Media]
    actions: [Link]
    link: Link
    backgroundColor: String
  }
`;

export const mappers: Mappers = {
  Block: {
    Block: {
      variant: defaultResolver('variant'),
      mediaItems: async (blog: any, _args: any, ctx: ApolloContext) => {
        const mediaItem = getLocalizedField(blog.fields, 'asset', ctx);
        return [mediaItem];
      }
    }
  }
};
