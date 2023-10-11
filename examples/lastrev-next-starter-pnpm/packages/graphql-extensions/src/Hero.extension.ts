import gql from 'graphql-tag';

import { defaultResolver } from './utils/defaultResolver';

import type { Mappers } from '@last-rev/types';

export const typeDefs = gql`
  extend type Hero {
    actions: [Link]
    # Uncomment if using Media reference
    sideImageItems: [Media]

    # Comment this fields if added in Contentful
    contentHeight: String
    background: Media
  }
`;

export const mappers: Mappers = {
  Hero: {
    Hero: {
      variant: defaultResolver('variant')
    }
  }
};
