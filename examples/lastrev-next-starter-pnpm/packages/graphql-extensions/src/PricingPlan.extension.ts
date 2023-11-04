import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from '@last-rev/types';
import gql from 'graphql-tag';
// import { createType } from './utils/createType';
// import { getSlug } from './utils/getSlug';
// import { getThumbnailURL } from './utils/getVideoEmbedUrl';

export const typeMappings = {};

export const typeDefs = gql`
  extend type PricingPlan {
    # Unccoment if using Media reference
    # media: [Media]
    actions: [Link]
    bodyRTE: RichText
  }
`;

export const mappers = {
  PricingPlan: {
    PricingPlan: {
      body: 'bodyRTE'
    }
  }
};
