import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Header {
    logoUrl: Link
    navigationItems: [NavigationItem]
    ctaItems: [Link]
    supernavLink: Link
  }
`;

export const mappers = {
  Header: {
    Header: {}
  }
};
