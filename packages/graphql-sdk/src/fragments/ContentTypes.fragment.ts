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
      navigationItems {
        ...Collection_Base
      }
    }
    footer {
      ...Section_Base
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
    ...Quote_Base
    ...NavigationItem_Base
  }

  fragment Text_Base on Text {
    ...Content_Base
    variant
    align
    body {
      ...RichText_RichTextFragment
    }
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
    navigationItems {
      id
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
      ...NavigationItem_Base
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
    actions {
      ...Link_Base
    }
    link {
      ...Link_Base
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

  fragment Quote_Base on Quote {
    ...Content_Base
    variant
    quote
    authorName
    authorTitle
    image {
      ...Media_Base
    }
  }

  fragment ModuleIntegration_Base on ModuleIntegration {
    variant
    settings
  }

  fragment Person_Base on Person {
    name
    jobTitle
    image {
      ...Media_Base
    }
  }

  fragment Article_Base on Article {
    id
    title
    slug
    summary
    seo
    pubDate
    disableBackToTop
    featuredMedia {
      ...Media_Base
    }
    body {
      ...RichText_RichTextFragment
    }
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
  }
`;
