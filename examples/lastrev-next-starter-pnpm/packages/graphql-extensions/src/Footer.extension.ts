import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Footer {
    introContents: [Content]
    logo: Media
    logoUrl: Link
    navigationItems: [NavigationItem]
    socialLinks: [Link]
    disclaimerText: RichText
    copyrightDisclaimer: RichText
    legalLinks: [Link]
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
