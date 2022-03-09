import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import '@algolia/autocomplete-theme-classic';
import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';
import '@last-rev/component-library/dist/styles.css';
import theme from '@ias/components/src/theme';
import { createEmotionCache } from '../src/createEmotionCache';

// LastRev components

const SEO = dynamic(() => import('@last-rev/component-library/dist/components/SEO/SEO'));

const Section = dynamic(() => import('@last-rev/component-library/dist/components/Section/Section'));

const Card = dynamic(() => import('@last-rev/component-library/dist/components/Card/Card'));

const Collection = dynamic(() => import('@last-rev/component-library/dist/components/Collection/Collection'));

const CollectionCarousel = dynamic(
  () => import('@last-rev/component-library/dist/components/CollectionCarousel/CollectionCarousel')
);

const CollectionAccordion = dynamic(
  () => import('@last-rev/component-library/dist/components/CollectionAccordion/CollectionAccordion')
);

const NavigationBar = dynamic(() => import('@last-rev/component-library/dist/components/NavigationBar/NavigationBar'));

const Hero = dynamic(() => import('@last-rev/component-library/dist/components/Hero/Hero'));

const Media = dynamic(() => import('@last-rev/component-library/dist/components/Media/Media'));

const BackToTop = dynamic(() => import('@last-rev/component-library/dist/components/BackToTop/BackToTop'));

// Custom components

const CollectionFiltered = dynamic(
  () => import('@ias/components/src/components/CollectionFiltered/CollectionFiltered')
);

const NavigationItem = dynamic(() => import('@ias/components/src/components/NavigationItem/NavigationItem'));

const Link = dynamic(() => import('@ias/components/src/components/Link/Link'));

const Header = dynamic(() => import('@ias/components/src/components/Header/Header'));

const Quote = dynamic(() => import('@ias/components/src/components/Quote/Quote'));

const Footer = dynamic(() => import('@ias/components/src/components/Footer/Footer'));

const Article = dynamic(() => import('@ias/components/src/components/Article/Article'));

const PageGeneral = dynamic(() => import('@ias/components/src/components/PageGeneral/PageGeneral'));

const Table = dynamic(() => import('@ias/components/src/components/Table'));

const Text = dynamic(() => import('@ias/components/src/components/Text'));

const SearchBox = dynamic(() => import('@ias/components/src/components/SearchBox'));

const PageTopic = dynamic(() => import('@ias/components/src/components/PageTopic'));

const AutocompleteBox = dynamic(() => import('@ias/components/src/components/AutocompleteBox'));

const CollectionSearchFilters = dynamic(() => import('@ias/components/src/components/CollectionSearchFilters'));

const CollectionSearchResults = dynamic(() => import('@ias/components/src/components/CollectionSearchResults'));

import '../styles/globals.css';

const contentMapping: {
  [key: string]: any;
} = {
  Header,
  Footer,
  Section,
  Collection,
  'Collection:carousel': CollectionCarousel,
  'Collection:accordion': CollectionAccordion,
  'Collection:filtered': CollectionFiltered,
  'Collection:Search Filters': CollectionSearchFilters,
  'Collection:Search Results': CollectionSearchResults,
  'Collection:carousel-large': CollectionCarousel,
  'Collection:carousel-small': CollectionCarousel,
  'Collection:navigation-bar': NavigationBar,
  'ModuleIntegration:search-box': SearchBox,
  'ModuleIntegration:autocomplete-search-box': AutocompleteBox,
  BackToTop,
  Card,
  Text,
  'Text:article': Text,
  Media,
  Link,
  NavigationItem,
  Hero,
  'Page': PageGeneral,
  PageTopic,
  'CategoryArticle': PageTopic,
  Article,
  Quote,
  Table
};

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      {pageProps.pageData?.page?.seo ? <SEO seo={pageProps.pageData.page.seo} /> : null}
      <Head>
        {!!pageProps.pageData?.page?.seo?.title ? <title>{pageProps.pageData.page.seo.title.value}</title> : null}
        <meta name="contentful_space" content={process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID} />
        <meta name="contentful_environment" content={process.env.NEXT_PUBLIC_CONTENTFUL_ENV} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" />
        <ContentModuleProvider contentMapping={contentMapping}>
          <Component {...pageProps} />
        </ContentModuleProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
