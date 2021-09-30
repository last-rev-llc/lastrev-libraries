import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// LastRev components
import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';
import SEO from '@last-rev/component-library/dist/components/SEO/SEO';
import Section from '@last-rev/component-library/dist/components/Section/Section';
import Card from '@last-rev/component-library/dist/components/Card/Card';
import Collection from '@last-rev/component-library/dist/components/Collection/Collection';
import CollectionCarousel from '@last-rev/component-library/dist/components/CollectionCarousel/CollectionCarousel';
import CollectionAccordion from '@last-rev/component-library/dist/components/CollectionAccordion/CollectionAccordion';
import NavigationBar from '@last-rev/component-library/dist/components/NavigationBar/NavigationBar';
import Media from '@last-rev/component-library/dist/components/Media/Media';
import Link from '@last-rev/component-library/dist/components/Link/Link';
import NavigationItem from '@last-rev/component-library/dist/components/NavigationItem/NavigationItem';
import Header from '@last-rev/component-library/dist/components/Header/Header';
import Hero from '@last-rev/component-library/dist/components/Hero/Hero';
import Text from '@last-rev/component-library/dist/components/Text/Text';
import BackToTop from '@last-rev/component-library/dist/components/BackToTop/BackToTop';
import '@last-rev/component-library/dist/styles.css';
import { CacheProvider, EmotionCache } from '@emotion/react';

// Custom components
import CollectionFiltered from '@lrns/components/dist/components/CollectionFiltered/CollectionFiltered';
import theme from '@lrns/components/dist/theme';

import Page from '../src/components/PageGeneral';
import Blog from '../src/components/PageBlog';
import { createEmotionCache } from '../src/createEmotionCache';

import '../styles/globals.css';

const contentMapping: {
  [key: string]: (props: any) => JSX.Element | null;
} = {
  Header,
  Section,
  Collection,
  'Collection:carousel': CollectionCarousel,
  'Collection:accordion': CollectionAccordion,
  'Collection:filtered': CollectionFiltered,
  'Collection:carousel-large': CollectionCarousel,
  'Collection:carousel-small': CollectionCarousel,
  'Collection:navigation-bar': NavigationBar,
  BackToTop,
  Card,
  Text,
  Media,
  Link,
  NavigationItem,
  Hero,
  Page,
  Blog
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
        {pageProps.pageData?.page?.seo?.title ? <title>{pageProps.pageData.page.seo.title.value}</title> : null}
        <meta name="contentful_space" content={process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID} />
        <meta name="contentful_environment" content={process.env.NEXT_PUBLIC_CONTENTFUL_ENV} />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ContentModuleProvider contentMapping={contentMapping}>
          <Component {...pageProps} />
        </ContentModuleProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
export default MyApp;
