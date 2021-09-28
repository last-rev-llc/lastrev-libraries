import { gql } from '@apollo/client';

export const PageQuery = gql`
  query CollectionItems(
    $locale: String
    $preview: Boolean
    $id: String!
    $limit: Int = 10
    $offset: Int = 0
    $filter: CollectionFilterInput
  ) {
    content(id: $id, locale: $locale, preview: $preview) {
      __typename
      id
      ... on Collection {
        ...CollectionItemsBaseContentFragment
        itemsConnection(limit: $limit, offset: $offset, filter: $filter) {
          pageInfo {
            allOptions {
              ...CollectionItems_OptionsFragment
            }
            options {
              ...CollectionItems_OptionsFragment
            }
          }
          items {
            ...CollectionItemsBaseContentFragment
            ...CollectionItemsCardFragment
            ...CollectionItemsPageLinkFragment
            ...CollectionItemsNavigationItemFragment
          }
        }
      }
    }
  }
  fragment CollectionItems_OptionsFragment on CollectionOptions {
    topics {
      label
      value
    }
    tags {
      label
      value
    }
  }
  fragment CollectionItemsBaseContentFragment on Content {
    id
    __typename
    sidekickLookup
  }

  fragment CollectionItemsMediaFragment on Media {
    # ...BaseContentFragment
    title
    variant
    file {
      url
    }
  }
  fragment CollectionItemsCardFragment on Card {
    ...CollectionItemsBaseContentFragment
    variant
    media {
      ...CollectionItemsMediaFragment
    }
    title
    subtitle
    body {
      ...CollectionItemsCardRichTextFragment
    }
    actions {
      ...CollectionItemsPageLinkFragment
    }
    link {
      ...CollectionItemsLinkFragment
    }
  }
  fragment CollectionItemsCardRichTextFragment on RichText {
    json
    links {
      entries {
        __typename
        id
        ...CollectionItemsArtDirectedMediaFragment
        ...CollectionItemsLinkFragment
      }
      assets {
        id
        __typename
        file {
          url
        }
        # title
        # width
        # height
        # description
      }
    }
  }

  fragment CollectionItemsLinkFragment on Link {
    ...CollectionItemsBaseContentFragment
    text
    href
    variant
  }
  fragment CollectionItemsArtDirectedMediaFragment on Media {
    ...CollectionItemsBaseContentFragment
    # desktop {
    #   title
    #   file {
    #     url
    #   }
    # }
  }

  fragment CollectionItemsPageLinkFragment on Link {
    ...CollectionItemsBaseContentFragment
    text
    href
    variant
  }

  fragment CollectionItemsNavigationItemFragment on NavigationItem {
    ...CollectionItemsBaseContentFragment
    text
    href
    variant
    subNavigation {
      ... on Link {
        id
        __typename
        text
        href
        variant
      }
    }
  }
`;
