import gql from 'graphql-tag';

export const PathsQuery = gql`
  query Paths($locales: [String!], $preview: Boolean) {
    paths(locales: $locales, preview: $preview) {
      params {
        slug
        locale
      }
    }
  }
`;
