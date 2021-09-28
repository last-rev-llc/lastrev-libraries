import gql from 'graphql-tag';

const RichTextFragment = gql`
  fragment RichText_LinkFragment on Link {
    ...RichText_BaseContentFragment
    text
    href
    variant
    icon
    iconPosition
  }
  fragment RichText_CollectionFragment on Collection {
    ...RichText_BaseContentFragment
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
      ...RichText_CardFragment
      ...RichText_LinkFragment
      ...RichText_NavigationItemFragment
    }
  }

  # This will go 3 levels deep recursive
  fragment RichText_SectionFragment on Section {
    ...RichText_BaseSectionFragment
    contents {
      ...RichText_ContentSectionFragment
      ... on Section {
        ...RichText_BaseSectionFragment
        contents {
          ...RichText_ContentSectionFragment
          ... on Section {
            ...RichText_BaseSectionFragment
            contents {
              ...RichText_ContentSectionFragment
              ... on Section {
                ...RichText_BaseSectionFragment
              }
            }
          }
        }
      }
    }
  }

  fragment RichText_BaseSectionFragment on Section {
    ...RichText_BaseContentFragment
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
    # background {
    #   # ...RichText_ArtDirectedMediaFragment
    # }
  }
  # This fragment is almost identical to the RichText_Fragment but skips Section
  # RichText_SectionFragment recursion is handled in RichText_SectionFragment
  fragment RichText_ContentSectionFragment on Content {
    ...RichText_BaseContentFragment
    theme {
      id
      components
      typography
    }
    ... on Section {
      ...RichText_BaseSectionFragment
    }
    # ...RichText_ArtDirectedMediaFragment
    ... on Text {
      ...RichText_SectionTextFragment
    }
    ... on Card {
      ...RichText_CardFragment
    }
    ... on Media {
      ...RichText_MediaFragment
    }
    ... on Link {
      ...RichText_LinkFragment
    }
    ... on Collection {
      ...RichText_CollectionFragment
    }
    ... on ModuleIntegration {
      ...RichText_ModuleIntegrationFragment
    }
  }

  fragment RichText_MediaFragment on Media {
    # ...RichText_BaseContentFragment
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

  fragment RichText_TextFragment on Text {
    ...RichText_BaseContentFragment
    variant
    align
    body {
      ...RichText_Nested_RichTextFragment
      links {
        entries {
          ... on Text {
            ...RichText_BaseContentFragment
            variant
            align
            body {
              ...RichText_Nested_RichTextFragment
              links {
                entries {
                  ... on Text {
                    ...RichText_BaseContentFragment
                    variant
                    align
                    body {
                      ...RichText_Nested_RichTextFragment
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  fragment RichText_SectionTextFragment on Text {
    ...RichText_BaseContentFragment
    variant
    align
    body {
      json
      ...RichText_SectionRichTextFragment
    }
  }
  fragment RichText_CardRichTextFragment on RichText {
    json
    links {
      entries {
        __typename
        id
        # ...RichText_ArtDirectedMediaFragment
        ...RichText_LinkFragment
      }
      assets {
        ...RichText_MediaFragment
      }
    }
  }

  fragment RichText_Nested_RichTextFragment on RichText {
    id
    __typename
    json
    links {
      entries {
        __typename
        id
        ...RichText_BaseSectionFragment
        ...RichText_CardFragment
        ...RichText_CollectionFragment
        ...RichText_LinkFragment
        ...RichText_SectionFragment
        # ...RichText_TextFragment
      }
      assets {
        ...RichText_MediaFragment
      }
    }
  }
  fragment RichText_RichTextFragment on RichText {
    id
    __typename
    json
    links {
      entries {
        __typename
        id
        ...RichText_BaseSectionFragment
        ...RichText_CardFragment
        ...RichText_CollectionFragment
        ...RichText_LinkFragment
        ...RichText_SectionFragment
        ...RichText_TextFragment
      }
      assets {
        ...RichText_MediaFragment
      }
    }
  }

  fragment RichText_SectionRichTextFragment on RichText {
    json
    links {
      entries {
        __typename
        id
        ...RichText_BaseSectionFragment
        ...RichText_CardFragment
        ...RichText_CollectionFragment
        ...RichText_LinkFragment
        # ...RichText_SectionFragment
      }
      assets {
        ...RichText_MediaFragment
      }
    }
  }
  fragment RichText_CardFragment on Card {
    ...RichText_BaseContentFragment
    variant
    media {
      ...RichText_MediaFragment
    }
    title
    subtitle
    body {
      ...RichText_CardRichTextFragment
    }
    actions {
      ...RichText_LinkFragment
    }
    link {
      ...RichText_LinkFragment
    }
  }

  fragment RichText_NavigationItemFragment on NavigationItem {
    ...RichText_BaseContentFragment
    text
    href
    variant
    subNavigation {
      ...RichText_BaseContentFragment
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
  fragment RichText_BaseContentFragment on Content {
    id
    __typename
    sidekickLookup
  }

  fragment RichText_ModuleIntegrationFragment on ModuleIntegration {
    variant
    settings
  }
`;

export default RichTextFragment;
