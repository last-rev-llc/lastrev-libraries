import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Header {
    logoLink: Link
    leftNav: [NavigationItem]
    rightNav: [NavigationItem]
    actions: [Link]
    indexName: String
  }
`;

export const mappers: any = {
  Header: {
    Header: {
      indexName: async () => {
        return process.env.ALGOLIA_INDEX_NAME;
      }
    }
  }
};
