import gql from 'graphql-tag';

import { defaultResolver } from './utils/defaultResolver';

import type { Mappers } from '@last-rev/types';

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
      variant: defaultResolver('variant')
    }
  }
};
