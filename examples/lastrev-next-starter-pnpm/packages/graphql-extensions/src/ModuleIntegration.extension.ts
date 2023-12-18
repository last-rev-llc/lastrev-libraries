import gql from 'graphql-tag';

import { defaultResolver } from './utils/defaultResolver';

import type { ApolloContext, Mappers } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

// export const typeDefs = gql`
//   extend type ModuleIntegration {

//   }
// `;

export const mappers: Mappers = {
  ModuleIntegration: {
    ModuleIntegration: {
      variant: defaultResolver('variant')
    }
  }
};
