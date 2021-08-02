import gql from 'graphql-tag';
import { ContentFragment } from '../fragments/Content.fragment';
import { LinkFragment } from '../fragments/Link.fragment';

export const ContentQuery = gql`
  ${ContentFragment}
  ${LinkFragment}

  fragment NavigationItemFragment on NavigationItem {
    ...ContentFragment
    link {
      ...LinkFragment
    }
    children {
      __typename
      id
      sidekickLookup
      theme {
        variant
      }
      link {
        ...LinkFragment
      }
      children {
        __typename
        id
        sidekickLookup
        theme {
          variant
        }
        link {
          ...LinkFragment
        }
        children {
          __typename
          id
          sidekickLookup
          theme {
            variant
          }
          link {
            ...LinkFragment
          }
          children {
            __typename
            id
            sidekickLookup
            theme {
              variant
            }
            link {
              ...LinkFragment
            }
          }
        }
      }
    }
  }

  query Settings($id: String!, $locale: String, $preview: Boolean) {
    content(id: $id, locale: $locale, preview: $preview) {
      ... on GlobalSettings {
        ...ContentFragment
        logo {
          file {
            fileName
            url
          }
        }
        seo
        copyright
        footerNavigation {
          ...NavigationItemFragment
        }
        mainNavigation {
          ...NavigationItemFragment
        }
      }
    }
  }
`;
