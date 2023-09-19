import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Footer {
    introContents: [Content]
    navigationItems: [NavigationItem]
    socialLinks: [Link]
    disclaimer: RichText
    logo: Media
    logoUrl: Link
    disclaimer: RichText
    navigationItems: [NavigationItem]
    introContents: [Content]
    copyrightDisclaimer: RichText
    legalLinks: [Link]
    localeLinks: [Link]
  }
`;

export const mappers = {
  Footer: {
    Footer: {}
  }
};
