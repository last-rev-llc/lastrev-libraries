// import type { Mappers } from '@last-rev/types';
import { type Mappers } from '@last-rev/types';
import gql from 'graphql-tag';
import { defaultResolver } from './utils/defaultResolver';

export const typeDefs = gql`
  type Text {
    body: RichText
  }
`;

export const mappers: Mappers = {
  Text: {
    Text: {
      variant: defaultResolver('variant')
    }
  }
};
