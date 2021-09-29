import gql from 'graphql-tag';
import RichTextFragment from '../fragments/RichText.fragment';
export const Preview_Query = gql`
  ${RichTextFragment}
  query Preview($id: String!, $locale: String) {
    content(id: $id, locale: $locale, preview: true) {
      id
      __typename
      ...Preview_PageContentFragment
      ...Preview_HeaderFragment
      ...Preview_HeroFragment
      ...Preview_BaseSectionFragment
      ...Preview_CollectionFragment
      ...Preview_SectionFragment
      ...Preview_MediaFragment
      ...Preview_TextFragment
      ...Preview_CardFragment
      ...Preview_LinkFragment
      ...Preview_NavigationItemFragment
      ...Preview_TopicContentFragment
      ...Preview_BlogContentFragment
      ...Preview_ModuleIntegrationFragment
    }
  }

  fragment Preview_PageContentFragment on Page {
    seo
    sidekickLookup
    header {
      __typename
      ...Preview_HeaderFragment
      navigationItems {
        ...Preview_CollectionFragment
      }
    }
    footer {
      ...Preview_SectionFragment
    }

    hero {
      ...Preview_HeroFragment
    }

    contents {
      ...Preview_BaseContentFragment
      ...Preview_SectionFragment
      # ...Preview_ArtDirectedMediaFragment
      ...Preview_TextFragment
      ...Preview_CardFragment
      ...Preview_CollectionFragment
    }
  }

  fragment Preview_TopicContentFragment on Topic {
    seo
    title
    slug
    sidekickLookup
    header {
      __typename
      ...Preview_HeaderFragment
      navigationItems {
        ...Preview_CollectionFragment
      }
    }
    footer {
      ...Preview_SectionFragment
    }

    hero {
      ...Preview_HeroFragment
    }

    contents {
      ...Preview_BaseContentFragment
      ...Preview_SectionFragment
      #     ...Preview_ArtDirectedMediaFragment
      ...Preview_TextFragment
      ...Preview_CardFragment
      ...Preview_CollectionFragment
    }
  }

  fragment Preview_BlogContentFragment on Blog {
    __typename
    id
    slug
    title
    author
    quote
    tags
    sidekickLookup
    seo
    footer {
      ...Preview_SectionFragment
    }
    header {
      __typename
      ...Preview_HeaderFragment
      navigationItems {
        ...Preview_CollectionFragment
      }
    }
    featuredMedia {
      ...Preview_MediaFragment
    }
    body {
      ...RichText_RichTextFragment
    }
    topics {
      id
      slug
      title
    }
    relatedLinks {
      ...Preview_LinkFragment
    }
    contents {
      ...Preview_BaseContentFragment
      ...Preview_SectionFragment
      ...Preview_MediaFragment
      ...Preview_TextFragment
      ...Preview_CardFragment
      ...Preview_CollectionFragment
    }
    seo
  }

  fragment Preview_LinkFragment on Link {
    ...Preview_BaseContentFragment
    text
    href
    variant
    icon
    iconPosition
  }

  fragment Preview_HeaderFragment on Header {
    ...Preview_BaseContentFragment
    logo {
      ...Preview_MediaFragment
    }
    logoUrl
    navigationItems {
      id
    }
  }

  fragment Preview_HeroFragment on Hero {
    ...Preview_BaseContentFragment
    backgroundColor
    # theme
    contentWidth
    contentHeight
    variant
    internalTitle
    title
    subtitle
    body {
      ...RichText_RichTextFragment
    }
    image {
      ...Preview_MediaFragment
    }
    actions {
      ...Preview_LinkFragment
    }
  }

  fragment Preview_BaseSectionFragment on Section {
    ...Preview_BaseContentFragment
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
      ...Preview_MediaFragment
    }
  }
  fragment Preview_CollectionFragment on Collection {
    ...Preview_BaseContentFragment
    variant
    itemsVariant
    itemsWidth
    itemsSpacing
    theme {
      id
      components
      typography
    }
    settings
    items {
      ...Preview_CardFragment
      ...Preview_LinkFragment
      ...Preview_NavigationItemFragment
    }
  }

  # This will go 3 levels deep recursive
  fragment Preview_SectionFragment on Section {
    ...Preview_BaseSectionFragment
    contents {
      ...Preview_ContentSectionFragment
      ... on Section {
        ...Preview_BaseSectionFragment
        contents {
          ...Preview_ContentSectionFragment
          ... on Section {
            ...Preview_BaseSectionFragment
            contents {
              ...Preview_ContentSectionFragment
              ... on Section {
                ...Preview_BaseSectionFragment
              }
            }
          }
        }
      }
    }
  }

  # This fragment is almost identical to the Preview_Fragment but skips Section
  # Preview_SectionFragment recursion is handled in Preview_SectionFragment
  fragment Preview_ContentSectionFragment on Content {
    ...Preview_BaseContentFragment
    theme {
      id
      components
      typography
    }
    ... on Section {
      ...Preview_BaseSectionFragment
    }
    # ...Preview_ArtDirectedMediaFragment
    ... on Text {
      ...Preview_TextFragment
    }
    ... on Card {
      ...Preview_CardFragment
    }
    ... on Media {
      ...Preview_MediaFragment
    }
    ... on Link {
      ...Preview_LinkFragment
    }
    ... on Collection {
      ...Preview_CollectionFragment
    }
    ... on ModuleIntegration {
      ...Preview_ModuleIntegrationFragment
    }
  }

  fragment Preview_MediaFragment on Media {
    # ...Preview_BaseContentFragment
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
  # fragment Preview_ArtDirectedMediaFragment on Media {
  #   # ...Preview_BaseContentFragment
  #   desktop {
  #     title
  #     file {
  #       url
  #     }
  #   }
  # }

  fragment Preview_TextFragment on Text {
    ...Preview_BaseContentFragment
    variant
    align
    body {
      ...RichText_RichTextFragment
    }
    # body {
    #   raw
    # }
  }
  fragment Preview_CardRichTextFragment on RichText {
    json
    links {
      entries {
        __typename
        id
        # ...Preview_ArtDirectedMediaFragment
        ...Preview_LinkFragment
      }
      assets {
        ...Preview_MediaFragment
      }
    }
  }

  fragment Preview_CardFragment on Card {
    ...Preview_BaseContentFragment
    variant
    media {
      ...Preview_MediaFragment
    }
    title
    subtitle
    body {
      ...Preview_CardRichTextFragment
    }
    actions {
      ...Preview_LinkFragment
    }
    link {
      ...Preview_LinkFragment
    }
  }

  fragment Preview_NavigationItemFragment on NavigationItem {
    ...Preview_BaseContentFragment
    text
    href
    variant
    subNavigation {
      ...Preview_BaseContentFragment
      ... on NavigationItem {
        id
        __typename
        text
        href
        variant
      }
      ... on Link {
        id
        __typename
        text
        href
        variant
      }
    }
  }
  fragment Preview_BaseContentFragment on Content {
    id
    __typename
    sidekickLookup
  }

  fragment Preview_ModuleIntegrationFragment on ModuleIntegration {
    variant
    settings
  }
`;
