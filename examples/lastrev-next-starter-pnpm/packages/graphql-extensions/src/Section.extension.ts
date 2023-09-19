import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Section {
    contents: [Content]
    background: Media
    introText: Text
    hasBackground: boolean
  }
`;

export const typeMappings = {};

export const mappers = {
  Section: {
    Section: {
      hasBackground: async (section: any, _args: any, ctx: ApolloContext) =>
        !!getLocalizedField(section.fields, 'background', ctx)
    }
  }
};
