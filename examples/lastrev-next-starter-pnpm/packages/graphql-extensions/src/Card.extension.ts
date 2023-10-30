import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from './types';
import gql from 'graphql-tag';

export const typeMappings = {};

export const typeDefs = gql`
  extend type Card {
    # Unccoment if using Media reference
    # media: [Media]
    actions: [Link]
    link: Link
    variant: String
    aspectRatio: String
  }
`;

export const mappers: any = {
  Media: {
    media: async (media: any, _args: any, ctx: ApolloContext) => {
      const featuredMedia: any = getLocalizedField(media.fields, 'asset', ctx);
      if (featuredMedia) return featuredMedia;
      return;
    },
    variant: () => 'media'
  }
};
