import gql from 'graphql-tag';
import RichTextFragment from '../fragments/RichText.fragment';
export const PageQuery = gql`
  ${RichTextFragment}
  query Page($path: String!, $locale: String, $preview: Boolean, $site: String) {
    page(path: $path, locale: $locale, preview: $preview, site: $site) {
      id
      ...Page_BaseContentFragment
      ...Page_PageContentFragment
      ...Page_TopicContentFragment
      ...Page_BlogContentFragment
      ...Page_ArticleContentFragment
    }
  }

  fragment Page_PageContentFragment on Page {
    sidekickLookup
    header {
      __typename
      ...Page_HeaderFragment
      navigationItems {
        ...Page_CollectionFragment
      }
    }
    footer {
      ...Page_SectionFragment
    }

    hero {
      ...Page_HeroFragment
    }

    contents {
      ...Page_ContentFragment
    }

    seo
  }

  fragment Page_TopicContentFragment on Topic {
    title
    slug
    sidekickLookup
    header {
      __typename
      ...Page_HeaderFragment
      navigationItems {
        ...Page_CollectionFragment
      }
    }
    footer {
      ...Page_SectionFragment
    }

    hero {
      ...Page_HeroFragment
    }

    contents {
      ...Page_ContentFragment
    }

    seo
  }

  fragment Page_ContentFragment on Content {
    ...Page_BaseContentFragment
    ...Page_SectionFragment
    # ...Page_ArtDirectedMediaFragment
    ...RichText_TextFragment
    ...Page_CardFragment
    ...Page_CollectionFragment
    ...Page_QuizFragment
  }

  fragment Page_BlogContentFragment on Blog {
    __typename
    id
    title
    slug
    author
    quote
    tags
    sidekickLookup
    footer {
      ...Page_SectionFragment
    }
    header {
      __typename
      ...Page_HeaderFragment
      navigationItems {
        ...Page_CollectionFragment
      }
    }
    featuredMedia {
      ...Page_MediaFragment
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
      ...Page_LinkFragment
    }
    contents {
      ...Page_ContentFragment
    }
    seo
  }

  fragment Page_ArticleContentFragment on Article {
    __typename
    id
    slug
    title
    footer {
      ...Page_SectionFragment
    }
    header {
      __typename
      ...Page_HeaderFragment
      navigationItems {
        ...Page_CollectionFragment
      }
    }
    featuredMedia {
      ...Page_MediaFragment
    }
    body {
      ...RichText_RichTextFragment
    }
    seo
  }

  fragment Page_LinkFragment on Link {
    ...Page_BaseContentFragment
    text
    href
    variant
    icon
    iconPosition
  }

  fragment Page_HeaderFragment on Header {
    ...Page_BaseContentFragment
    logo {
      ...Page_MediaFragment
    }
    logoUrl
    navigationItems {
      id
    }
  }

  fragment Page_HeroFragment on Hero {
    ...Page_BaseContentFragment
    # theme
    variant
    internalTitle
    title
    subtitle
    backgroundColor
    contentWidth
    contentHeight
    body {
      ...RichText_RichTextFragment
    }
    image {
      ...Page_MediaFragment
    }
    actions {
      ...Page_LinkFragment
    }
  }

  fragment Page_CollectionFragment on Collection {
    ...Page_BaseContentFragment
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
      ...Page_CardFragment
      ...Page_LinkFragment
      ...Page_NavigationItemFragment
    }
  }

  # This will go 3 levels deep recursive
  fragment Page_SectionFragment on Section {
    ...Page_BaseSectionFragment
    contents {
      ...Page_ContentSectionFragment

      ... on Section {
        ...Page_BaseSectionFragment
        contents {
          ...Page_ContentSectionFragment
          ... on Section {
            ...Page_BaseSectionFragment
            contents {
              ...Page_ContentSectionFragment
              ... on Section {
                ...Page_BaseSectionFragment
              }
            }
          }
        }
      }
    }
  }

  fragment Page_BaseSectionFragment on Section {
    ...Page_BaseContentFragment
    variant
    styles

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
      ...Page_MediaFragment
    }
  }
  # This fragment is almost identical to the Page_Fragment but skips Section
  # Page_SectionFragment recursion is handled in Page_SectionFragment
  fragment Page_ContentSectionFragment on Content {
    ...Page_BaseContentFragment
    ...RichText_TextFragment
    ... on Text {
      body {
        ...RichText_RichTextFragment
      }
    }

    ...Page_BaseSectionFragment
    ...Page_CardFragment
    ...Page_MediaFragment
    ...Page_LinkFragment
    ...Page_CollectionFragment
    ...Page_ModuleIntegrationFragment
  }

  fragment Page_MediaFragment on Media {
    ...Page_BaseContentFragment
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

  fragment Page_CardRichTextFragment on RichText {
    json
    links {
      entries {
        __typename
        id
        # ...Page_ArtDirectedMediaFragment
        ...Page_LinkFragment
      }
      assets {
        ...Page_MediaFragment
      }
    }
  }

  fragment Page_CardFragment on Card {
    ...Page_BaseContentFragment
    variant
    media {
      ...Page_MediaFragment
    }
    title
    subtitle
    body {
      ...Page_CardRichTextFragment
    }
    actions {
      ...Page_LinkFragment
    }
    link {
      ...Page_LinkFragment
    }
  }

  fragment Page_NavigationItemFragment on NavigationItem {
    ...Page_BaseContentFragment
    text
    href
    variant
    subNavigation {
      ...Page_BaseContentFragment
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
  fragment Page_BaseContentFragment on Content {
    id
    __typename
    sidekickLookup
  }
  fragment Page_QuizFragment on Quiz {
    ...Page_BaseContentFragment
    title
    intro {
      ...RichText_RichTextFragment
    }
    outro {
      ...RichText_RichTextFragment
    }
    image {
      ...Page_MediaFragment
    }
    settings
  }

  fragment Page_ModuleIntegrationFragment on ModuleIntegration {
    variant
    settings
  }
`;
