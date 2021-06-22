import gql from 'graphql-tag';
import { ContentFragment } from 'src/fragments/Content.fragment';
import { LinkFragment } from 'src/fragments/Link.fragment';

export const PageQuery = gql`
  ${ContentFragment}
  ${LinkFragment}

  fragment PanelImageFragment on PanelImage {
    ...ContentFragment
    image {
      file {
        fileName
        url
      }
    }
  }

  fragment PanelRichTextFragment on PanelRichText {
    ...ContentFragment
    content {
      raw
    }
  }

  fragment CardFragment on Card {
    ...ContentFragment
    header
    summary
    image {
      file {
        fileName
        url
      }
      title
      description
    }
    cta {
      ...LinkFragment
    }
  }

  fragment CardCollectionFragment on CardCollection {
    ...ContentFragment
    layout
    cardStyle
    cards {
      ...CardFragment
    }
    featuredText {
      raw
    }
  }

  fragment HeroFragment on Hero {
    ...ContentFragment
    header
    summary
    backgroundImage {
      file {
        fileName
        url
      }
      title
      description
    }
    ctas {
      ...LinkFragment
    }
  }

  fragment QuoteFragment on Quote {
    ...ContentFragment
    quoteText
  }

  fragment SplitColumnFragment on SplitColumn {
    id
    id
    panels {
      id
      __typename
      ... on PanelRichText {
        ...PanelRichTextFragment
      }
      ... on PanelImage {
        ...PanelImageFragment
      }
    }
  }

  fragment PageContentModuleFragment on Content {
    ...ContentFragment
    ... on PanelImage {
      ...PanelImageFragment
    }
    ... on PanelRichText {
      ...PanelRichTextFragment
    }
    ... on Card {
      ...CardFragment
    }
    ... on CardCollection {
      ...CardCollectionFragment
    }
    ... on Hero {
      ...HeroFragment
    }
    ... on Quote {
      ...QuoteFragment
    }
    ... on SplitColumn {
      ...SplitColumnFragment
    }
  }

  query Page($path: String!, $locale: String) {
    page(path: $path, locale: $locale) {
      ... on Page {
        ...ContentFragment
        title
        slug
        lr__path__
        contents {
          ...PageContentModuleFragment
        }
      }
    }
  }
`;
