import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Footer {
    introContents: [Content]
    navigationItems: [NavigationItem]
    socialLinks?: [Link]
    logo: Media
    logoUrl: Link
    disclaimer?: RichText
    introContents: [Content]
    copyrightDisclaimer?: RichText
    legalLinks?: [Link]
    localeLinks?: [Link]
    hasSocialLinks: Boolean
  }
`;

export const mappers = {
  Footer: {
    Footer: {
      hasSocialLinks: async (footer: any, _args: any, ctx: ApolloContext) => {
        const socialLinks: any = getLocalizedField(footer.fields, 'socialLinks', ctx);
        return !!socialLinks.length;
      }
    }
  }
};
