import gql from 'graphql-tag';
import RichTextFragment from '../fragments/RichText.fragment';

export const ContentTypes_Fragments = gql`
  ${RichTextFragment}

  fragment Content_Base on Content {
    id
    __typename
    sidekickLookup
  }

  fragment Page_Base on Page {
    seo
    slug
    header {
      __typename
      ...Header_Base
    }

    breadcrumbs {
      ...Link_Base
    }

    footer {
      ...Footer_Base
    }

    hero {
      ...Hero_Base
    }

    contents {
      ...Content_Page_Base
    }
  }

  fragment Content_Page_Base on Content {
    ...Content_Base
    ...Section_Base
    ...Media_Base
    ...RichText_TextFragment
    ...Card_Base
    ...Collection_Base
    ...ModuleIntegration_Base
  }

  fragment Link_Base on Link {
    ...Content_Base
    text
    href
    variant
    icon
    iconPosition
  }

  fragment Header_Base on Header {
    ...Content_Base
    logo {
      ...Media_Base
    }
    logoUrl
    leftNav {
      ...NavigationItem_Base
    }
    rightNav {
      ...NavigationItem_Base
    }
    actions {
      ...Link_Base
    }
    colorScheme
    variant
  }

  fragment Hero_Base on Hero {
    ...Content_Base
    variant
    internalTitle
    title
    subtitle
    backgroundColor
    contentWidth
    contentHeight
    background {
      ...Media_Base
    }
    body {
      ...RichText_RichTextFragment
    }
    image {
      ...Media_Base
    }
    actions {
      ...Link_Base
    }
  }

  fragment Collection_Base on Collection {
    ...Content_Base
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
    styles
    introText {
      ...Content_Base
      body {
        ...RichText_NoEntries
      }
      align
      variant
    }
    items {
      ...Card_Base
      ...Link_Base
      ...Media_Base
    }
  }
  # This will go 3 levels deep recursive

  fragment Section_Base on Section {
    ...Section_Base_Fields
    contents {
      ...Page_Base_Nested
      ... on Section {
        ...Section_Base_Fields
        contents {
          ...Page_Base_Nested
          ... on Section {
            ...Section_Base_Fields
            contents {
              ...Page_Base_Nested
              ... on Section {
                ...Section_Base_Fields
              }
            }
          }
        }
      }
    }
  }

  fragment Section_Base_Fields on Section {
    ...Content_Base
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
      ...Media_Base
    }
  }

  # This fragment is almost identical to the Page_PageFragment but skips Section
  # Section_Base recursion is handled in Section_Base
  fragment Page_Base_Nested on Content {
    ...Content_Base
    ...Section_Base_Fields
    ...RichText_TextFragment
    ...Card_Base
    ...Media_Base
    ...Link_Base
    ...Collection_Base
    ...ModuleIntegration_Base
  }

  fragment Media_Base on Media {
    ...Content_Base
    title
    variant
    controls
    file {
      url
      extension
      fileName
    }
  }

  fragment RichText_NoEntries on RichText {
    json
    links {
      entries {
        __typename
        id
        ...Media_Base
        ...Link_Base
      }
      assets {
        ...Media_Base
      }
    }
  }

  fragment Card_Base on Card {
    ...Content_Base
    variant
    media {
      ...Media_Base
    }
    title
    subtitle
    body {
      ...RichText_NoEntries
    }
    pubDate
    actions {
      ...Link_Base
    }
    link {
      ... on Link {
        id
        __typename
        href
      }
    }
  }

  fragment NavigationItem_Nested on NavigationItem {
    ...Content_Base
    variant
    text
    href
    summary
    image {
      ...Media_Base
    }
  }

  fragment NavigationItem_Base on NavigationItem {
    ...NavigationItem_Nested
    subNavigation {
      ...Link_Base
      ... on NavigationItem {
        ...NavigationItem_Nested
        subNavigation {
          ...Link_Base
          ... on NavigationItem {
            ...NavigationItem_Nested
          }
        }
      }
    }
  }

  fragment ModuleIntegration_Base on ModuleIntegration {
    variant
    settings
  }

  fragment CategoryArticle_Nested on CategoryArticle {
    ...Content_Base
    title
    slug
    articles {
      ...Card_Base
      link {
        ...Link_Base
      }
    }
    link {
      ...Link_Base
    }
  }

  fragment CategoryArticle_Base on CategoryArticle {
    ...Content_Base
    title
    slug
    categoryHierarchyLinks {
      ...NavigationItem_Base
    }
    link {
      ...Link_Base
    }
    seo
    articles {
      ...Card_Base
    }
    topicNavItems {
      ...NavigationItem_Base
    }
    header {
      ...Header_Base
    }
    hero {
      ...Hero_Base
    }
    featuredArticles {
      ...Card_Base
    }
    footer {
      ...Footer_Base
    }

    subCategories {
      ... on CategoryArticle {
        ...CategoryArticle_Nested
        subCategories {
          ... on CategoryArticle {
            ...CategoryArticle_Nested
          }
        }
      }
    }
  }

  fragment Article_Base on Article {
    id
    title
    slug
    summary
    pubDate
    featuredMedia {
      ...Media_Base
    }
  }

  fragment Article_Page on Article {
    ...Article_Base
    header {
      ...Header_Base
    }
    body {
      ...RichText_RichTextFragment
    }
    footer {
      ...Footer_Base
    }
    seo
    disableBackToTop
    categories {
      ...Link_Base
    }
    relatedLinks {
      ...Link_Base
    }
    footerItems {
      ...Section_Base
    }
    breadcrumbs {
      ...Link_Base
    }
    sideNav {
      ...Link_Base
    }
    footer {
      ...Footer_Base
    }
    topicNavItems {
      ...NavigationItem_Base
    }
  }

  fragment Footer_Base on Footer {
    ...Content_Base
    media {
      ...Media_Base
    }
    navigationItems {
      ...NavigationItem_Base
    }
    actions {
      ...Link_Base
    }
    disclaimerText {
      ...RichText_RichTextFragment
    }
  }
`;
