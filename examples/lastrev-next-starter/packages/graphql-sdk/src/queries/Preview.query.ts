import gql from 'graphql-tag';

export const PageQuery = gql`
  query Preview($id: String!, $locale: String) {
    content(id: $id, locale: $locale, preview: true) {
      id
      __typename
      ...PreviewPageContentFragment
      ...PreviewHeaderFragment
      ...PreviewHeroFragment
      ...PreviewMailchimpFormFragment
      ...PreviewBaseSectionFragment
      ...PreviewCollectionFragment
      ...PreviewSectionFragment
      ...PreviewMediaFragment
      ...PreviewTextFragment
      ...PreviewCardFragment
      ...PreviewPageLinkFragment
      ...PreviewNavigationItemFragment
    }
  }

  fragment PreviewPageContentFragment on Page {
    id
    header {
      __typename
      ...PreviewHeaderFragment
      navigationItems {
        ...PreviewCollectionFragment
      }
    }

    hero {
      ...PreviewHeroFragment
    }

    contents {
      id
      __typename

      ...PreviewSectionFragment
      ...PreviewArtDirectedMediaFragment
      ...PreviewTextFragment
      ...PreviewCardFragment
      ...PreviewCollectionFragment
      ...PreviewMailchimpFormFragment
    }
  }

  fragment PreviewHeaderFragment on Header {
    logo {
      ...PreviewMediaFragment
    }
    logoUrl
    navigationItems {
      id
    }
  }

  fragment PreviewHeroFragment on Hero {
    id
    __typename
    # theme
    variant
    internalTitle
    title
    subtitle
    body {
      ...PreviewRichTextFragment
    }
    image {
      file {
        url
      }
    }
    actions {
      ...PreviewPageLinkFragment
    }
  }

  fragment PreviewMailchimpFormFragment on MailchimpForm {
    id
    __typename
    # theme
    variant
    internalTitle
    title
    subtitle
    body {
      ...PreviewRichTextFragment
    }
    image {
      file {
        url
      }
    }
    actions {
      ...PreviewPageLinkFragment
    }
  }

  fragment PreviewBaseSectionFragment on Section {
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
      ...PreviewArtDirectedMediaFragment
    }
  }
  fragment PreviewCollectionFragment on Collection {
    __typename
    variant
    itemsVariant
    theme {
      id
      components
      typography
    }
    items {
      ...PreviewCardFragment
      ...PreviewPageLinkFragment
      ...PreviewNavigationItemFragment
    }
  }

  # This will go 3 levels deep recursive
  fragment PreviewSectionFragment on Section {
    contents {
      ...PreviewContentSectionFragment
      ... on Section {
        contents {
          ...PreviewContentSectionFragment
          ... on Section {
            contents {
              ...PreviewContentSectionFragment
            }
          }
        }
      }
    }
    ...PreviewBaseSectionFragment
  }

  # This fragment Previewis almost identical to the PageFragment but skips Section
  # SectionFragment recursion is handled in PreviewSectionFragment
  fragment PreviewContentSectionFragment on Content {
    id
    __typename
    theme {
      id
      components
      typography
    }
    ... on Section {
      ...PreviewBaseSectionFragment
    }
    ...PreviewArtDirectedMediaFragment
    ... on Text {
      ...PreviewTextFragment
    }
    ... on Card {
      ...PreviewCardFragment
    }
    ... on Media {
      file {
        url
      }
    }
    ... on Link {
      ...PreviewPageLinkFragment
    }
    ... on Collection {
      ...PreviewCollectionFragment
    }
  }

  fragment PreviewMediaFragment on Media {
    title
    file {
      url
    }
  }
  fragment PreviewArtDirectedMediaFragment on Media {
    desktop {
      title
      file {
        url
      }
    }
  }

  fragment PreviewTextFragment on Text {
    id
    variant
    align
    body {
      ...PreviewRichTextFragment
    }
    # body {
    #   raw
    # }
  }
  fragment PreviewRichTextFragment on RichText {
    id
    __typename
    json
    links {
      entries {
        __typename
        id
        ...PreviewBaseSectionFragment
        ...PreviewArtDirectedMediaFragment
        ...PreviewCardFragment
        ...PreviewCollectionFragment
        ...PreviewPageLinkFragment
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
  fragment PreviewCardFragment on Card {
    id
    __typename
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
      ...PreviewPageLinkFragment
    }
  }

  fragment PreviewPageLinkFragment on Link {
    id
    __typename
    text
    href
    variant
  }

  fragment PreviewNavigationItemFragment on NavigationItem {
    id
    __typename
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
