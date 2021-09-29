import gql from 'graphql-tag';
import RichTextFragment from '../fragments/RichText.fragment';

// TODO: Split fragments into separate files
export const PageQuery = gql`
  ${RichTextFragment}

  query Page($path: String!, $locale: String, $preview: Boolean, $site: String) {
    page(path: $path, locale: $locale, preview: $preview, site: $site) {
      id
      ...Page_BaseContentFragment
      ...Page_PageContentFragment
      ...Page_TopicContentFragment
      ...Page_PageBlogContentFragment
    }
  }
  fragment Page_BaseContentFragment on Content {
    id
    __typename
    sidekickLookup
  }
  fragment Page_PageContentFragment on Page {
    seo
    slug
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
  }
  fragment Page_TopicContentFragment on Topic {
    title
    slug
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
    ...Page_MediaFragment
    ...RichText_TextFragment
    ...Page_CardFragment
    ...Page_CollectionFragment
    ...Page_QuoteFragment
  }

  fragment Page_PageBlogContentFragment on Blog {
    title
    slug
    author
    quote
    tags
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
    seo
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
    variant
  }

  fragment Page_HeroFragment on Hero {
    ...Page_BaseContentFragment
    variant
    internalTitle
    title
    subtitle
    backgroundColor
    contentWidth
    contentHeight
    background {
      ...Page_MediaFragment
    }
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
    introText {
      ...Page_BaseContentFragment
      body {
        ...Page_BaseRichTextFragment
      }
      align
      variant
    }
    items {
      ...Page_CardFragment
      ...Page_LinkFragment
      ...Page_NavigationItemFragment
      ...Page_MediaFragment
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
      ...Page_MediaFragment
    }
  }

  # This fragment is almost identical to the Page_PageFragment but skips Section
  # Page_SectionFragment recursion is handled in Page_SectionFragment
  fragment Page_ContentSectionFragment on Content {
    ...Page_BaseContentFragment
    ...Page_BaseSectionFragment
    ...RichText_TextFragment
    ...Page_CardFragment
    ...Page_MediaFragment
    ...Page_LinkFragment
    ...Page_CollectionFragment
    ...Page_ModuleIntegrationFragment
  }

  fragment Page_MediaFragment on Media {
    ...Page_BaseContentFragment
    title
    variant
    file {
      url
      extension
      fileName
    }
  }

  fragment Page_BaseRichTextFragment on RichText {
    json
    links {
      entries {
        __typename
        id
        ...Page_MediaFragment
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
      ...Page_BaseRichTextFragment
    }
    actions {
      ...Page_LinkFragment
    }
    link {
      ...Page_LinkFragment
    }
  }

  fragment Page_BaseNavigationItemFragment on NavigationItem {
    ...Page_BaseContentFragment
    variant
    text
    href
    summary
    media {
      ...MediaFragment
    }
  }

  fragment Page_NavigationItemFragment on NavigationItem {
    ...Page_BaseNavigationItemFragment
    subNavigation {
      ...Page_LinkFragment
      ... on NavigationItem {
        ...Page_BaseNavigationItemFragment
        subNavigation {
          ...Page_LinkFragment
          ... on NavigationItem {
            ...Page_BaseNavigationItemFragment
          }
        }
      }
    }
  }

  fragment Page_QuoteFragment on Quote {
    ...Page_BaseContentFragment
    variant
    media {
      ...Page_MediaFragment
    }
    title
    body {
      ...Page_BaseRichTextFragment
    }
  }

  fragment Page_ModuleIntegrationFragment on ModuleIntegration {
    variant
    settings
  }
`;
