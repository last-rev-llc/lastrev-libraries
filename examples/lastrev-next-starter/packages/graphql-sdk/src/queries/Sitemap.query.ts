import gql from 'graphql-tag';

export const PathsQuery = gql`
  query Sitemap($root: String!, $locales: [String!], $preview: Boolean, $site: String) {
    sitemap(root: $root, locales: $locales, preview: $preview, site: $site) {
      pages {
        loc
        lastmod
        filename
        entries {
          loc
          lastmod
        }
      }
    }
  }
`;
