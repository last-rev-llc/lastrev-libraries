import gql from 'graphql-tag';

import { sideKickLookupResolver } from './utils/sideKickLookupResolver';
export const typeMappings = {};

export const resolvers = {
  Content: {
    sidekickLookup: sideKickLookupResolver
  }
};

export const typeDefs = gql`
  extend type Query {
    contentPreview(id: String!, locale: String, displayType: String, overrideContent: JSON): Content
  }
`;
