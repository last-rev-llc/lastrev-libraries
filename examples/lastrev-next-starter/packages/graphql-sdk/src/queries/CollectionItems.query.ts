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
            ...CollectionItemsLinkFragment
            ...CollectionItemsNavigationItemFragment
          }
        }
      }
    }
  }

  fragment CollectionItems_OptionsFragment on CollectionOptions {
    __typename
    # Collection options that get exposed to the UI
    # These are the same as the options in the Collection extension
    # i.e
    # topics {
    #   label
    #   value
    # }
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
      ...CollectionItemsLinkFragment
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
        ...CollectionItemsLinkFragment
      }
      assets {
        ...CollectionItemsMediaFragment
      }
    }
  }

  fragment CollectionItemsLinkFragment on Link {
    ...CollectionItemsBaseContentFragment
    text
    href
    variant
  }
  fragment CollectionItemsMediaFragment on Media {
    ...CollectionItemsBaseContentFragment
    id
    __typename
    title
    variant
    file {
      url
      extension
      fileName
    }
  }

  fragment CollectionItemsLinkFragment on Link {
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
