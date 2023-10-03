import gql from 'graphql-tag';

import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from '@last-rev/types';

export const typeDefs = gql`
  extend type Header {
    logo: Media
    logoUrl: Link
    navigationItems: [NavigationItem]
    ctaItems: [Link]
    supernavLink: Link
    supernavIcon: Media
    hasCtaItems: Boolean
  }
`;

export const mappers = {
  Header: {
    Header: {
      hasCtaItems: async (header: any, _args: any, ctx: ApolloContext) => {
        const ctaItems: any = getLocalizedField(header.fields, 'ctaItems', ctx);
        return !!ctaItems.length;
      }
    }
  }
};
