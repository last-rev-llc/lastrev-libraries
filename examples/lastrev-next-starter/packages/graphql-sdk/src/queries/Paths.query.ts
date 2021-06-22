import gql from 'graphql-tag';

export const PathsQuery = gql`
  query Paths($locales: [String!]) {
    paths(locales: $locales) {
      params {
        slug
        locale
      }
    }
  }
`;
