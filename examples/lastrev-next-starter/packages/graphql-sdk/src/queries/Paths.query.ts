import gql from 'graphql-tag';

export const PathsQuery = gql`
  query Paths($locales: [String!], $preview: Boolean, $site: String) {
    paths(locales: $locales, preview: $preview, site: $site) {
      params {
        slug
        locale
      }
    }
  }
`;
