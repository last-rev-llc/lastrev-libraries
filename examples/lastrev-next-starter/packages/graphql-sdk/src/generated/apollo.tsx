import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type BlogPost = Content & {
  __typename?: 'BlogPost';
  sidekickLookup?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['String']>;
  theme?: Maybe<Theme>;
  animation?: Maybe<Scalars['JSON']>;
  slug?: Maybe<Scalars['String']>;
  lr__path__?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  landingPageTitle?: Maybe<Scalars['String']>;
  image?: Maybe<Media>;
  publishedDate?: Maybe<Scalars['Date']>;
  summary?: Maybe<Scalars['String']>;
  content?: Maybe<RichText>;
  seo?: Maybe<Scalars['JSON']>;
};

export type Card = Content & {
  __typename?: 'Card';
  sidekickLookup?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['String']>;
  theme?: Maybe<Theme>;
  animation?: Maybe<Scalars['JSON']>;
  header?: Maybe<Scalars['String']>;
  image?: Maybe<Media>;
  summary?: Maybe<Scalars['String']>;
  cta?: Maybe<Link>;
};

export type CardCollection = Content & {
  __typename?: 'CardCollection';
  sidekickLookup?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['String']>;
  theme?: Maybe<Theme>;
  animation?: Maybe<Scalars['JSON']>;
  internalTitle?: Maybe<Scalars['String']>;
  featuredText?: Maybe<RichText>;
  cardStyle?: Maybe<Scalars['String']>;
  layout?: Maybe<Scalars['String']>;
  sectionId?: Maybe<Scalars['String']>;
  cards?: Maybe<Array<Maybe<Card>>>;
};

export type Categories = Content & {
  __typename?: 'Categories';
  sidekickLookup?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['String']>;
  theme?: Maybe<Theme>;
  animation?: Maybe<Scalars['JSON']>;
  slug?: Maybe<Scalars['String']>;
  lr__path__?: Maybe<Scalars['String']>;
  internalCategoryName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  allowMultipleSelections?: Maybe<Scalars['Boolean']>;
  disableSelection?: Maybe<Scalars['Boolean']>;
  subcategory?: Maybe<Array<Maybe<Categories>>>;
};

export type Content = {
  id?: Maybe<Scalars['String']>;
  theme?: Maybe<Theme>;
  animation?: Maybe<Scalars['JSON']>;
  sidekickLookup?: Maybe<Scalars['JSON']>;
};

export type File = {
  __typename?: 'File';
  url?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  extension?: Maybe<Scalars['String']>;
};

export type GlobalSettings = Content & {
  __typename?: 'GlobalSettings';
  sidekickLookup?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['String']>;
  theme?: Maybe<Theme>;
  animation?: Maybe<Scalars['JSON']>;
  settingsName?: Maybe<Scalars['String']>;
  logo?: Maybe<Media>;
  copyright?: Maybe<Scalars['String']>;
  seo?: Maybe<Scalars['JSON']>;
  footerNavigation?: Maybe<Array<NavigationItem>>;
  headerNavigation?: Maybe<Array<NavigationItem>>;
  mainNavigation?: Maybe<Array<NavigationItem>>;
};

export type Hero = Content & {
  __typename?: 'Hero';
  sidekickLookup?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['String']>;
  theme?: Maybe<Theme>;
  animation?: Maybe<Scalars['JSON']>;
  header?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  backgroundImage?: Maybe<Media>;
  ctas?: Maybe<Array<Maybe<Link>>>;
};

export type Link = Content & {
  __typename?: 'Link';
  sidekickLookup?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['String']>;
  theme?: Maybe<Theme>;
  animation?: Maybe<Scalars['JSON']>;
  text?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
  pageAnchor?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
  connectLinkTo?: Maybe<Array<Maybe<Page>>>;
  modal?: Maybe<Modal>;
};

export type Location = {
  __typename?: 'Location';
  lat?: Maybe<Scalars['String']>;
  lon?: Maybe<Scalars['String']>;
};

export type Media = Content & {
  __typename?: 'Media';
  source?: Maybe<Scalars['String']>;
  sidekickLookup?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['String']>;
  theme?: Maybe<Theme>;
  animation?: Maybe<Scalars['JSON']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  file?: Maybe<File>;
};

export type Modal = Content & {
  __typename?: 'Modal';
  sidekickLookup?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['String']>;
  theme?: Maybe<Theme>;
  animation?: Maybe<Scalars['JSON']>;
  internalTitle?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
  body?: Maybe<RichText>;
};

export type NavigationItem = Content & {
  __typename?: 'NavigationItem';
  id?: Maybe<Scalars['String']>;
  sidekickLookup?: Maybe<Scalars['JSON']>;
  animation?: Maybe<Scalars['JSON']>;
  theme?: Maybe<Theme>;
  link?: Maybe<Link>;
  children?: Maybe<Array<NavigationItem>>;
};

export type Page = Content & {
  __typename?: 'Page';
  sidekickLookup?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['String']>;
  theme?: Maybe<Theme>;
  animation?: Maybe<Scalars['JSON']>;
  slug?: Maybe<Scalars['String']>;
  lr__path__?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  seo?: Maybe<Scalars['JSON']>;
  parentLandingPage?: Maybe<Page>;
  contents?: Maybe<Array<Maybe<Content>>>;
};

export type PagePathParam = {
  __typename?: 'PagePathParam';
  slug?: Maybe<Array<Scalars['String']>>;
  locale?: Maybe<Scalars['String']>;
};

export type PagePathParams = {
  __typename?: 'PagePathParams';
  params: PagePathParam;
};

export type PanelImage = Content & {
  __typename?: 'PanelImage';
  sidekickLookup?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['String']>;
  theme?: Maybe<Theme>;
  animation?: Maybe<Scalars['JSON']>;
  internalTitle?: Maybe<Scalars['String']>;
  image?: Maybe<Media>;
};

export type PanelRichText = Content & {
  __typename?: 'PanelRichText';
  sidekickLookup?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['String']>;
  theme?: Maybe<Theme>;
  animation?: Maybe<Scalars['JSON']>;
  internalTitle?: Maybe<Scalars['String']>;
  content?: Maybe<RichText>;
};

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  page?: Maybe<Content>;
  paths?: Maybe<Array<PagePathParams>>;
  content?: Maybe<Content>;
};

export type QueryPageArgs = {
  path: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
};

export type QueryPathsArgs = {
  locales?: Maybe<Array<Scalars['String']>>;
};

export type QueryContentArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
};

export type Quote = Content & {
  __typename?: 'Quote';
  sidekickLookup?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['String']>;
  theme?: Maybe<Theme>;
  animation?: Maybe<Scalars['JSON']>;
  internalTitle?: Maybe<Scalars['String']>;
  quoteText?: Maybe<Scalars['String']>;
  attribution?: Maybe<Scalars['String']>;
};

export type RichText = {
  __typename?: 'RichText';
  raw?: Maybe<Scalars['JSON']>;
  parsed?: Maybe<Scalars['String']>;
};

export type SplitColumn = Content & {
  __typename?: 'SplitColumn';
  sidekickLookup?: Maybe<Scalars['JSON']>;
  id?: Maybe<Scalars['String']>;
  theme?: Maybe<Theme>;
  animation?: Maybe<Scalars['JSON']>;
  internalTitle?: Maybe<Scalars['String']>;
  sectionId?: Maybe<Scalars['String']>;
  panels?: Maybe<Array<Maybe<Content>>>;
};

export type Theme = {
  __typename?: 'Theme';
  variant?: Maybe<Scalars['String']>;
};

export type _Service = {
  __typename?: '_Service';
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied */
  sdl?: Maybe<Scalars['String']>;
};

type ContentFragment_BlogPost_Fragment = { __typename: 'BlogPost' } & Pick<
  BlogPost,
  'id' | 'sidekickLookup' | 'animation'
> & { theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>> };

type ContentFragment_Card_Fragment = { __typename: 'Card' } & Pick<Card, 'id' | 'sidekickLookup' | 'animation'> & {
    theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>>;
  };

type ContentFragment_CardCollection_Fragment = { __typename: 'CardCollection' } & Pick<
  CardCollection,
  'id' | 'sidekickLookup' | 'animation'
> & { theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>> };

type ContentFragment_Categories_Fragment = { __typename: 'Categories' } & Pick<
  Categories,
  'id' | 'sidekickLookup' | 'animation'
> & { theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>> };

type ContentFragment_GlobalSettings_Fragment = { __typename: 'GlobalSettings' } & Pick<
  GlobalSettings,
  'id' | 'sidekickLookup' | 'animation'
> & { theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>> };

type ContentFragment_Hero_Fragment = { __typename: 'Hero' } & Pick<Hero, 'id' | 'sidekickLookup' | 'animation'> & {
    theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>>;
  };

type ContentFragment_Link_Fragment = { __typename: 'Link' } & Pick<Link, 'id' | 'sidekickLookup' | 'animation'> & {
    theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>>;
  };

type ContentFragment_Media_Fragment = { __typename: 'Media' } & Pick<Media, 'id' | 'sidekickLookup' | 'animation'> & {
    theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>>;
  };

type ContentFragment_Modal_Fragment = { __typename: 'Modal' } & Pick<Modal, 'id' | 'sidekickLookup' | 'animation'> & {
    theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>>;
  };

type ContentFragment_NavigationItem_Fragment = { __typename: 'NavigationItem' } & Pick<
  NavigationItem,
  'id' | 'sidekickLookup' | 'animation'
> & { theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>> };

type ContentFragment_Page_Fragment = { __typename: 'Page' } & Pick<Page, 'id' | 'sidekickLookup' | 'animation'> & {
    theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>>;
  };

type ContentFragment_PanelImage_Fragment = { __typename: 'PanelImage' } & Pick<
  PanelImage,
  'id' | 'sidekickLookup' | 'animation'
> & { theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>> };

type ContentFragment_PanelRichText_Fragment = { __typename: 'PanelRichText' } & Pick<
  PanelRichText,
  'id' | 'sidekickLookup' | 'animation'
> & { theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>> };

type ContentFragment_Quote_Fragment = { __typename: 'Quote' } & Pick<Quote, 'id' | 'sidekickLookup' | 'animation'> & {
    theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>>;
  };

type ContentFragment_SplitColumn_Fragment = { __typename: 'SplitColumn' } & Pick<
  SplitColumn,
  'id' | 'sidekickLookup' | 'animation'
> & { theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>> };

export type ContentFragmentFragment =
  | ContentFragment_BlogPost_Fragment
  | ContentFragment_Card_Fragment
  | ContentFragment_CardCollection_Fragment
  | ContentFragment_Categories_Fragment
  | ContentFragment_GlobalSettings_Fragment
  | ContentFragment_Hero_Fragment
  | ContentFragment_Link_Fragment
  | ContentFragment_Media_Fragment
  | ContentFragment_Modal_Fragment
  | ContentFragment_NavigationItem_Fragment
  | ContentFragment_Page_Fragment
  | ContentFragment_PanelImage_Fragment
  | ContentFragment_PanelRichText_Fragment
  | ContentFragment_Quote_Fragment
  | ContentFragment_SplitColumn_Fragment;

export type LinkFragmentFragment = { __typename?: 'Link' } & Pick<Link, 'text' | 'url' | 'target'> &
  ContentFragment_Link_Fragment;

export type PanelImageFragmentFragment = { __typename?: 'PanelImage' } & {
  image?: Maybe<{ __typename?: 'Media' } & { file?: Maybe<{ __typename?: 'File' } & Pick<File, 'fileName' | 'url'>> }>;
} & ContentFragment_PanelImage_Fragment;

export type PanelRichTextFragmentFragment = { __typename?: 'PanelRichText' } & {
  content?: Maybe<{ __typename?: 'RichText' } & Pick<RichText, 'raw'>>;
} & ContentFragment_PanelRichText_Fragment;

export type CardFragmentFragment = { __typename?: 'Card' } & Pick<Card, 'header' | 'summary'> & {
    image?: Maybe<
      { __typename?: 'Media' } & Pick<Media, 'title' | 'description'> & {
          file?: Maybe<{ __typename?: 'File' } & Pick<File, 'fileName' | 'url'>>;
        }
    >;
    cta?: Maybe<{ __typename?: 'Link' } & LinkFragmentFragment>;
  } & ContentFragment_Card_Fragment;

export type CardCollectionFragmentFragment = { __typename?: 'CardCollection' } & Pick<
  CardCollection,
  'layout' | 'cardStyle'
> & {
    cards?: Maybe<Array<Maybe<{ __typename?: 'Card' } & CardFragmentFragment>>>;
    featuredText?: Maybe<{ __typename?: 'RichText' } & Pick<RichText, 'raw'>>;
  } & ContentFragment_CardCollection_Fragment;

export type HeroFragmentFragment = { __typename?: 'Hero' } & Pick<Hero, 'header' | 'summary'> & {
    backgroundImage?: Maybe<
      { __typename?: 'Media' } & Pick<Media, 'title' | 'description'> & {
          file?: Maybe<{ __typename?: 'File' } & Pick<File, 'fileName' | 'url'>>;
        }
    >;
    ctas?: Maybe<Array<Maybe<{ __typename?: 'Link' } & LinkFragmentFragment>>>;
  } & ContentFragment_Hero_Fragment;

export type QuoteFragmentFragment = { __typename?: 'Quote' } & Pick<Quote, 'quoteText'> &
  ContentFragment_Quote_Fragment;

export type SplitColumnFragmentFragment = { __typename?: 'SplitColumn' } & Pick<SplitColumn, 'id'> & {
    panels?: Maybe<
      Array<
        Maybe<
          | ({ __typename: 'BlogPost' } & Pick<BlogPost, 'id'>)
          | ({ __typename: 'Card' } & Pick<Card, 'id'>)
          | ({ __typename: 'CardCollection' } & Pick<CardCollection, 'id'>)
          | ({ __typename: 'Categories' } & Pick<Categories, 'id'>)
          | ({ __typename: 'GlobalSettings' } & Pick<GlobalSettings, 'id'>)
          | ({ __typename: 'Hero' } & Pick<Hero, 'id'>)
          | ({ __typename: 'Link' } & Pick<Link, 'id'>)
          | ({ __typename: 'Media' } & Pick<Media, 'id'>)
          | ({ __typename: 'Modal' } & Pick<Modal, 'id'>)
          | ({ __typename: 'NavigationItem' } & Pick<NavigationItem, 'id'>)
          | ({ __typename: 'Page' } & Pick<Page, 'id'>)
          | ({ __typename: 'PanelImage' } & Pick<PanelImage, 'id'> & PanelImageFragmentFragment)
          | ({ __typename: 'PanelRichText' } & Pick<PanelRichText, 'id'> & PanelRichTextFragmentFragment)
          | ({ __typename: 'Quote' } & Pick<Quote, 'id'>)
          | ({ __typename: 'SplitColumn' } & Pick<SplitColumn, 'id'>)
        >
      >
    >;
  };

type PageContentModuleFragment_BlogPost_Fragment = { __typename?: 'BlogPost' } & ContentFragment_BlogPost_Fragment;

type PageContentModuleFragment_Card_Fragment = { __typename?: 'Card' } & CardFragmentFragment &
  ContentFragment_Card_Fragment;

type PageContentModuleFragment_CardCollection_Fragment = {
  __typename?: 'CardCollection';
} & CardCollectionFragmentFragment &
  ContentFragment_CardCollection_Fragment;

type PageContentModuleFragment_Categories_Fragment = {
  __typename?: 'Categories';
} & ContentFragment_Categories_Fragment;

type PageContentModuleFragment_GlobalSettings_Fragment = {
  __typename?: 'GlobalSettings';
} & ContentFragment_GlobalSettings_Fragment;

type PageContentModuleFragment_Hero_Fragment = { __typename?: 'Hero' } & HeroFragmentFragment &
  ContentFragment_Hero_Fragment;

type PageContentModuleFragment_Link_Fragment = { __typename?: 'Link' } & ContentFragment_Link_Fragment;

type PageContentModuleFragment_Media_Fragment = { __typename?: 'Media' } & ContentFragment_Media_Fragment;

type PageContentModuleFragment_Modal_Fragment = { __typename?: 'Modal' } & ContentFragment_Modal_Fragment;

type PageContentModuleFragment_NavigationItem_Fragment = {
  __typename?: 'NavigationItem';
} & ContentFragment_NavigationItem_Fragment;

type PageContentModuleFragment_Page_Fragment = { __typename?: 'Page' } & ContentFragment_Page_Fragment;

type PageContentModuleFragment_PanelImage_Fragment = { __typename?: 'PanelImage' } & PanelImageFragmentFragment &
  ContentFragment_PanelImage_Fragment;

type PageContentModuleFragment_PanelRichText_Fragment = {
  __typename?: 'PanelRichText';
} & PanelRichTextFragmentFragment &
  ContentFragment_PanelRichText_Fragment;

type PageContentModuleFragment_Quote_Fragment = { __typename?: 'Quote' } & QuoteFragmentFragment &
  ContentFragment_Quote_Fragment;

type PageContentModuleFragment_SplitColumn_Fragment = { __typename?: 'SplitColumn' } & SplitColumnFragmentFragment &
  ContentFragment_SplitColumn_Fragment;

export type PageContentModuleFragmentFragment =
  | PageContentModuleFragment_BlogPost_Fragment
  | PageContentModuleFragment_Card_Fragment
  | PageContentModuleFragment_CardCollection_Fragment
  | PageContentModuleFragment_Categories_Fragment
  | PageContentModuleFragment_GlobalSettings_Fragment
  | PageContentModuleFragment_Hero_Fragment
  | PageContentModuleFragment_Link_Fragment
  | PageContentModuleFragment_Media_Fragment
  | PageContentModuleFragment_Modal_Fragment
  | PageContentModuleFragment_NavigationItem_Fragment
  | PageContentModuleFragment_Page_Fragment
  | PageContentModuleFragment_PanelImage_Fragment
  | PageContentModuleFragment_PanelRichText_Fragment
  | PageContentModuleFragment_Quote_Fragment
  | PageContentModuleFragment_SplitColumn_Fragment;

export type PageQueryVariables = Exact<{
  path: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
}>;

export type PageQuery = { __typename?: 'Query' } & {
  page?: Maybe<
    | { __typename?: 'BlogPost' }
    | { __typename?: 'Card' }
    | { __typename?: 'CardCollection' }
    | { __typename?: 'Categories' }
    | { __typename?: 'GlobalSettings' }
    | { __typename?: 'Hero' }
    | { __typename?: 'Link' }
    | { __typename?: 'Media' }
    | { __typename?: 'Modal' }
    | { __typename?: 'NavigationItem' }
    | ({ __typename?: 'Page' } & Pick<Page, 'title' | 'slug' | 'lr__path__'> & {
          contents?: Maybe<
            Array<
              Maybe<
                | ({ __typename?: 'BlogPost' } & PageContentModuleFragment_BlogPost_Fragment)
                | ({ __typename?: 'Card' } & PageContentModuleFragment_Card_Fragment)
                | ({ __typename?: 'CardCollection' } & PageContentModuleFragment_CardCollection_Fragment)
                | ({ __typename?: 'Categories' } & PageContentModuleFragment_Categories_Fragment)
                | ({ __typename?: 'GlobalSettings' } & PageContentModuleFragment_GlobalSettings_Fragment)
                | ({ __typename?: 'Hero' } & PageContentModuleFragment_Hero_Fragment)
                | ({ __typename?: 'Link' } & PageContentModuleFragment_Link_Fragment)
                | ({ __typename?: 'Media' } & PageContentModuleFragment_Media_Fragment)
                | ({ __typename?: 'Modal' } & PageContentModuleFragment_Modal_Fragment)
                | ({ __typename?: 'NavigationItem' } & PageContentModuleFragment_NavigationItem_Fragment)
                | ({ __typename?: 'Page' } & PageContentModuleFragment_Page_Fragment)
                | ({ __typename?: 'PanelImage' } & PageContentModuleFragment_PanelImage_Fragment)
                | ({ __typename?: 'PanelRichText' } & PageContentModuleFragment_PanelRichText_Fragment)
                | ({ __typename?: 'Quote' } & PageContentModuleFragment_Quote_Fragment)
                | ({ __typename?: 'SplitColumn' } & PageContentModuleFragment_SplitColumn_Fragment)
              >
            >
          >;
        } & ContentFragment_Page_Fragment)
    | { __typename?: 'PanelImage' }
    | { __typename?: 'PanelRichText' }
    | { __typename?: 'Quote' }
    | { __typename?: 'SplitColumn' }
  >;
};

export type PathsQueryVariables = Exact<{
  locales?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;

export type PathsQuery = { __typename?: 'Query' } & {
  paths?: Maybe<
    Array<
      { __typename?: 'PagePathParams' } & {
        params: { __typename?: 'PagePathParam' } & Pick<PagePathParam, 'slug' | 'locale'>;
      }
    >
  >;
};

export type NavigationItemFragmentFragment = { __typename?: 'NavigationItem' } & {
  link?: Maybe<{ __typename?: 'Link' } & LinkFragmentFragment>;
  children?: Maybe<
    Array<
      { __typename: 'NavigationItem' } & Pick<NavigationItem, 'id' | 'sidekickLookup'> & {
          theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>>;
          link?: Maybe<{ __typename?: 'Link' } & LinkFragmentFragment>;
          children?: Maybe<
            Array<
              { __typename: 'NavigationItem' } & Pick<NavigationItem, 'id' | 'sidekickLookup'> & {
                  theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>>;
                  link?: Maybe<{ __typename?: 'Link' } & LinkFragmentFragment>;
                  children?: Maybe<
                    Array<
                      { __typename: 'NavigationItem' } & Pick<NavigationItem, 'id' | 'sidekickLookup'> & {
                          theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>>;
                          link?: Maybe<{ __typename?: 'Link' } & LinkFragmentFragment>;
                          children?: Maybe<
                            Array<
                              { __typename: 'NavigationItem' } & Pick<NavigationItem, 'id' | 'sidekickLookup'> & {
                                  theme?: Maybe<{ __typename?: 'Theme' } & Pick<Theme, 'variant'>>;
                                  link?: Maybe<{ __typename?: 'Link' } & LinkFragmentFragment>;
                                }
                            >
                          >;
                        }
                    >
                  >;
                }
            >
          >;
        }
    >
  >;
} & ContentFragment_NavigationItem_Fragment;

export type SettingsQueryVariables = Exact<{
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
}>;

export type SettingsQuery = { __typename?: 'Query' } & {
  content?: Maybe<
    | { __typename?: 'BlogPost' }
    | { __typename?: 'Card' }
    | { __typename?: 'CardCollection' }
    | { __typename?: 'Categories' }
    | ({ __typename?: 'GlobalSettings' } & Pick<GlobalSettings, 'seo' | 'copyright'> & {
          logo?: Maybe<
            { __typename?: 'Media' } & { file?: Maybe<{ __typename?: 'File' } & Pick<File, 'fileName' | 'url'>> }
          >;
          footerNavigation?: Maybe<Array<{ __typename?: 'NavigationItem' } & NavigationItemFragmentFragment>>;
          mainNavigation?: Maybe<Array<{ __typename?: 'NavigationItem' } & NavigationItemFragmentFragment>>;
        } & ContentFragment_GlobalSettings_Fragment)
    | { __typename?: 'Hero' }
    | { __typename?: 'Link' }
    | { __typename?: 'Media' }
    | { __typename?: 'Modal' }
    | { __typename?: 'NavigationItem' }
    | { __typename?: 'Page' }
    | { __typename?: 'PanelImage' }
    | { __typename?: 'PanelRichText' }
    | { __typename?: 'Quote' }
    | { __typename?: 'SplitColumn' }
  >;
};

export const ContentFragmentFragmentDoc = gql`
  fragment ContentFragment on Content {
    id
    __typename
    sidekickLookup
    theme {
      variant
    }
    animation
  }
`;
export const PanelImageFragmentFragmentDoc = gql`
  fragment PanelImageFragment on PanelImage {
    ...ContentFragment
    image {
      file {
        fileName
        url
      }
    }
  }
  ${ContentFragmentFragmentDoc}
`;
export const PanelRichTextFragmentFragmentDoc = gql`
  fragment PanelRichTextFragment on PanelRichText {
    ...ContentFragment
    content {
      raw
    }
  }
  ${ContentFragmentFragmentDoc}
`;
export const LinkFragmentFragmentDoc = gql`
  fragment LinkFragment on Link {
    ...ContentFragment
    text
    url
    target
  }
  ${ContentFragmentFragmentDoc}
`;
export const CardFragmentFragmentDoc = gql`
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
  ${ContentFragmentFragmentDoc}
  ${LinkFragmentFragmentDoc}
`;
export const CardCollectionFragmentFragmentDoc = gql`
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
  ${ContentFragmentFragmentDoc}
  ${CardFragmentFragmentDoc}
`;
export const HeroFragmentFragmentDoc = gql`
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
  ${ContentFragmentFragmentDoc}
  ${LinkFragmentFragmentDoc}
`;
export const QuoteFragmentFragmentDoc = gql`
  fragment QuoteFragment on Quote {
    ...ContentFragment
    quoteText
  }
  ${ContentFragmentFragmentDoc}
`;
export const SplitColumnFragmentFragmentDoc = gql`
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
  ${PanelRichTextFragmentFragmentDoc}
  ${PanelImageFragmentFragmentDoc}
`;
export const PageContentModuleFragmentFragmentDoc = gql`
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
  ${ContentFragmentFragmentDoc}
  ${PanelImageFragmentFragmentDoc}
  ${PanelRichTextFragmentFragmentDoc}
  ${CardFragmentFragmentDoc}
  ${CardCollectionFragmentFragmentDoc}
  ${HeroFragmentFragmentDoc}
  ${QuoteFragmentFragmentDoc}
  ${SplitColumnFragmentFragmentDoc}
`;
export const NavigationItemFragmentFragmentDoc = gql`
  fragment NavigationItemFragment on NavigationItem {
    ...ContentFragment
    link {
      ...LinkFragment
    }
    children {
      __typename
      id
      sidekickLookup
      theme {
        variant
      }
      link {
        ...LinkFragment
      }
      children {
        __typename
        id
        sidekickLookup
        theme {
          variant
        }
        link {
          ...LinkFragment
        }
        children {
          __typename
          id
          sidekickLookup
          theme {
            variant
          }
          link {
            ...LinkFragment
          }
          children {
            __typename
            id
            sidekickLookup
            theme {
              variant
            }
            link {
              ...LinkFragment
            }
          }
        }
      }
    }
  }
  ${ContentFragmentFragmentDoc}
  ${LinkFragmentFragmentDoc}
`;
export const PageDocument = gql`
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
  ${ContentFragmentFragmentDoc}
  ${PageContentModuleFragmentFragmentDoc}
`;

/**
 * __usePageQuery__
 *
 * To run a query within a React component, call `usePageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageQuery({
 *   variables: {
 *      path: // value for 'path'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function usePageQuery(baseOptions: Apollo.QueryHookOptions<PageQuery, PageQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PageQuery, PageQueryVariables>(PageDocument, options);
}
export function usePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageQuery, PageQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PageQuery, PageQueryVariables>(PageDocument, options);
}
export type PageQueryHookResult = ReturnType<typeof usePageQuery>;
export type PageLazyQueryHookResult = ReturnType<typeof usePageLazyQuery>;
export type PageQueryResult = Apollo.QueryResult<PageQuery, PageQueryVariables>;
export const PathsDocument = gql`
  query Paths($locales: [String!]) {
    paths(locales: $locales) {
      params {
        slug
        locale
      }
    }
  }
`;

/**
 * __usePathsQuery__
 *
 * To run a query within a React component, call `usePathsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePathsQuery({
 *   variables: {
 *      locales: // value for 'locales'
 *   },
 * });
 */
export function usePathsQuery(baseOptions?: Apollo.QueryHookOptions<PathsQuery, PathsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PathsQuery, PathsQueryVariables>(PathsDocument, options);
}
export function usePathsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PathsQuery, PathsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PathsQuery, PathsQueryVariables>(PathsDocument, options);
}
export type PathsQueryHookResult = ReturnType<typeof usePathsQuery>;
export type PathsLazyQueryHookResult = ReturnType<typeof usePathsLazyQuery>;
export type PathsQueryResult = Apollo.QueryResult<PathsQuery, PathsQueryVariables>;
export const SettingsDocument = gql`
  query Settings($id: String!, $locale: String) {
    content(id: $id, locale: $locale) {
      ... on GlobalSettings {
        ...ContentFragment
        logo {
          file {
            fileName
            url
          }
        }
        seo
        copyright
        footerNavigation {
          ...NavigationItemFragment
        }
        mainNavigation {
          ...NavigationItemFragment
        }
      }
    }
  }
  ${ContentFragmentFragmentDoc}
  ${NavigationItemFragmentFragmentDoc}
`;

/**
 * __useSettingsQuery__
 *
 * To run a query within a React component, call `useSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useSettingsQuery(baseOptions: Apollo.QueryHookOptions<SettingsQuery, SettingsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SettingsQuery, SettingsQueryVariables>(SettingsDocument, options);
}
export function useSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingsQuery, SettingsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SettingsQuery, SettingsQueryVariables>(SettingsDocument, options);
}
export type SettingsQueryHookResult = ReturnType<typeof useSettingsQuery>;
export type SettingsLazyQueryHookResult = ReturnType<typeof useSettingsLazyQuery>;
export type SettingsQueryResult = Apollo.QueryResult<SettingsQuery, SettingsQueryVariables>;
