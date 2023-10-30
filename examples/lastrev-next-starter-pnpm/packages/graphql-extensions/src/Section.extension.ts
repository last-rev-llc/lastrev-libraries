import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from './types';
import gql from 'graphql-tag';
import { defaultResolver } from './utils/defaultResolver';

export const typeDefs = gql`
  extend type Section {
    contents: [Content]
    background: Media
    introText: Text
    hasBackground: Boolean
  }
`;

export const typeMappings = {};

export const mappers = {
  Section: {
    Section: {
      hasBackground: async (section: any, _args: any, ctx: ApolloContext) =>
        !!getLocalizedField(section.fields, 'background', ctx),
      variant: defaultResolver('variant')
    }
  }
};
