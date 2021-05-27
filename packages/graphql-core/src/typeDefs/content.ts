import { gql } from 'apollo-server';

const contentTypeDefs = gql`
  type BlogPost implements Content {
    sidekickLookup: JSON
    id: String
    theme: Theme
    animation: JSON
  }

  type Categories implements Content {
    sidekickLookup: JSON
    id: String
    theme: Theme
    animation: JSON
  }

  type GlobalSettings implements Content {
    sidekickLookup: JSON
    id: String
    theme: Theme
    animation: JSON
    seo: JSON
    logo: Media
    copyright: String
    footerNavigation: [NavigationItem!]
    headerNavigation: [NavigationItem!]
    mainNavigation: [NavigationItem!]
  }
  type NavigationItem implements Content {
    sidekickLookup: JSON
    id: String
    theme: Theme
    animation: JSON
    link: Link
    children: [NavigationItem!]
  }

  type Page implements Content {
    sidekickLookup: JSON
    id: String
    theme: Theme
    animation: JSON
    slug: String
    title: String
    template: String
    contents: [Content]
  }

  type Link implements Content {
    sidekickLookup: JSON
    id: String
    theme: Theme
    animation: JSON
    text: String
    url: String
    href: String
    target: String
    # pageAnchor: String
    # content: Content
    # modal {
    #   ... on Node {
    #     ...ModalFragment
    #   }
    # }
  }

  type Modal implements Content {
    sidekickLookup: JSON
    id: String
    theme: Theme
    animation: JSON
    header: String
    body: RichText
  }

  type PanelImage implements Content {
    sidekickLookup: JSON
    id: String
    theme: Theme
    animation: JSON
    image: Media
  }

  type PanelRichText implements Content {
    sidekickLookup: JSON
    id: String
    theme: Theme
    animation: JSON
    content: RichText
  }

  type Card implements Content {
    sidekickLookup: JSON
    id: String
    theme: Theme
    animation: JSON
    header: String
    summary: RichText
    image: Media
    cta: Link
  }

  type CardCollection implements Content {
    sidekickLookup: JSON
    id: String
    theme: Theme
    animation: JSON
    layout: String
    cardStyle: String
    cards: [Card]
    featuredText: RichText
  }

  type Hero implements Content {
    sidekickLookup: JSON
    id: String
    theme: Theme
    animation: JSON
    header: String
    summary: String
    ctas: [Link]
    backgroundImage: Media
  }

  type Quote implements Content {
    sidekickLookup: JSON
    id: String
    theme: Theme
    animation: JSON
    quoteText: String
    attribution: String
  }

  type SplitColumn implements Content {
    sidekickLookup: JSON
    id: String
    theme: Theme
    animation: JSON
    panels: [Content]
    sectionId: String
  }

  extend type Media implements Content {
    sidekickLookup: JSON
    id: String
    theme: Theme
    animation: JSON
    title: String
    description: String
    file: File
  }

  type File {
    url: String
    fileName: String
  }

  type RichText {
    raw: JSON
    parsed: String
  }

  type Theme {
    variant: String
  }
`;

export default contentTypeDefs;
