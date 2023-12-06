import gql from 'graphql-tag';

import { defaultResolver } from './utils/defaultResolver';

import type { Mappers } from '@last-rev/types';

export const typeDefs = gql`
  extend type Hero {
    actions: [Link]
    sideImageItems: [Media]
    showFullImage: Boolean
    background: Media
    bottomContent: Content
  }
`;

export const mappers: Mappers = {
  Hero: {
    Hero: {
      variant: defaultResolver('variant'),
      showFullImage: ''
    }
  }
};
