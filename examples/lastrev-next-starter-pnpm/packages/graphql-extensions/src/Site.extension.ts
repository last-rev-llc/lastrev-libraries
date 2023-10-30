import gql from 'graphql-tag';
import type { Mappers } from '@last-rev/types';

import { siteSettingsResolver } from './utils/siteSettingsResolver';

export const typeMappings = {};

export const typeDefs = gql`
  extend type Query {
    siteSettings(preview: Boolean!): Site
  }
`;

export const mappers: Mappers = {
  Query: {
    Query: {
      siteSettings: siteSettingsResolver
    }
  }
};
