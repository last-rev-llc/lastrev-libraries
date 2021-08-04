import gql from 'graphql-tag';

export const PageQuery = gql`
  query Page($path: String!, $locale: String, $preview: Boolean, $site: String) {
    page(path: $path, locale: $locale, preview: $preview, site: $site) {
      id
      ...BaseContentFragment
      ...PageContentFragment
    }
  }

  fragment PageContentFragment on Page {
    header {
      __typename
      ...HeaderFragment
      navigationItems {
        ...CollectionFragment
      }
    }

    hero {
      ...HeroFragment
    }

    contents {
      ...BaseContentFragment
      ...SectionFragment
      ...ArtDirectedMediaFragment
      ...TextFragment
      ...CardFragment
      ...CollectionFragment
      ...MailchimpFormFragment
      ...QuizFragment
    }
  }

  fragment HeaderFragment on Header {
    ...BaseContentFragment
    logo {
      ...MediaFragment
    }
    logoUrl
    navigationItems {
      id
    }
  }

  fragment HeroFragment on Hero {
    ...BaseContentFragment
    # theme
    variant
    internalTitle
    title
    subtitle
    body {
      ...RichTextFragment
    }
    image {
      file {
        url
      }
    }
    actions {
      ...PageLinkFragment
    }
  }

  fragment MailchimpFormFragment on MailchimpForm {
    ...BaseContentFragment
    # theme
    variant
    internalTitle
    title
    subtitle
    body {
      ...RichTextFragment
    }
    image {
      file {
        url
      }
    }
    actions {
      ...PageLinkFragment
    }
  }

  fragment BaseSectionFragment on Section {
    ...BaseContentFragment
    variant
    styles
    # Style fields
    backgroundColor
    contentWidth
    contentDirection
    contentSpacing
    theme {
      id
      components
      typography
    }
    background {
      ...ArtDirectedMediaFragment
    }
  }
  fragment CollectionFragment on Collection {
    ...BaseContentFragment
    variant
    itemsVariant
    theme {
      id
      components
      typography
    }
    items {
      ...CardFragment
      ...PageLinkFragment
      ...NavigationItemFragment
    }
  }

  # This will go 3 levels deep recursive
  fragment SectionFragment on Section {
    contents {
      ...ContentSectionFragment
      ... on Section {
        contents {
          ...ContentSectionFragment
          ... on Section {
            contents {
              ...ContentSectionFragment
            }
          }
        }
      }
    }
    ...BaseSectionFragment
  }

  # This fragment is almost identical to the PageFragment but skips Section
  # SectionFragment recursion is handled in SectionFragment
  fragment ContentSectionFragment on Content {
    ...BaseContentFragment
    theme {
      id
      components
      typography
    }
    ... on Section {
      ...BaseSectionFragment
    }
    ...ArtDirectedMediaFragment
    ... on Text {
      ...TextFragment
    }
    ... on Card {
      ...CardFragment
    }
    ... on Media {
      file {
        url
      }
    }
    ... on Link {
      ...PageLinkFragment
    }
    ... on Collection {
      ...CollectionFragment
    }
  }

  fragment MediaFragment on Media {
    # ...BaseContentFragment
    title
    file {
      url
    }
  }
  fragment ArtDirectedMediaFragment on Media {
    # ...BaseContentFragment
    desktop {
      title
      file {
        url
      }
    }
  }

  fragment TextFragment on Text {
    ...BaseContentFragment
    variant
    align
    body {
      ...RichTextFragment
    }
    # body {
    #   raw
    # }
  }
  fragment RichTextFragment on RichText {
    json
    links {
      entries {
        __typename
        id
        ...BaseSectionFragment
        ...ArtDirectedMediaFragment
        ...CardFragment
        ...CollectionFragment
        ...PageLinkFragment
      }
      assets {
        id
        __typename
        # url
        # title
        # width
        # height
        # description
      }
    }
  }
  fragment CardFragment on Card {
    ...BaseContentFragment
    variant
    media {
      title
      id
      file {
        url
      }
    }
    title
    subtitle
    cardBody: body
    actions {
      ...PageLinkFragment
    }
  }

  fragment PageLinkFragment on Link {
    ...BaseContentFragment
    text
    href
    variant
  }

  fragment NavigationItemFragment on NavigationItem {
    ...BaseContentFragment
    text
    href
    variant
    subNavigation {
      ...BaseContentFragment
      ... on Link {
        id
        __typename
        text
        href
        variant
      }
    }
  }
  fragment BaseContentFragment on Content {
    id
    __typename
    sidekickLookup
  }
  fragment QuizFragment on Quiz {
    ...BaseContentFragment
    title
    intro {
      ...RichTextFragment
    }
    outro {
      ...RichTextFragment
    }
    image {
      ...MediaFragment
    }
    settings
  }
`;
