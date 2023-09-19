import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Header {
    logo: Media
    logoUrl: Link
    navigationItems: [NavigationItem]
    ctaItems: [Link]
    supernavLink: Link
    supernavIcon: Media
  }
`;

export const mappers = {
  Header: {
    Header: {}
  }
};
