import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import aa from 'search-insights';
import { ThemeProvider } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import '@algolia/autocomplete-theme-classic';
import '@last-rev/component-library/dist/styles.css';
import theme from '@ias/components/src/theme';
import { createEmotionCache } from '../src/createEmotionCache';
import '../styles/globals.css';

// LastRev components
const AuthProvider = dynamic(() => import('@ias/components/src/components/AuthProvider'));
const SEO = dynamic(() => import('@last-rev/component-library/dist/components/SEO/SEO'));
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

declare global {
  interface Window {
    aa?: any;
  }
}

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  useEffect(() => {
    aa('init', {
      appId: process.env.ALGOLIA_APP_ID as string,
      apiKey: process.env.ALGOLIA_SEARCH_API_KEY as string,
      useCookie: true
    });
    aa(
      'onUserTokenChange',
      (userToken) => {
        // @ts-ignore
        window.dataLayer.push({
          algoliaUserToken: userToken
        });
      },
      { immediate: true }
    );
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      {pageProps.pageData?.page?.seo ? <SEO seo={pageProps.pageData.page.seo} /> : null}
      <Head>
        {!!pageProps.pageData?.page?.seo?.title ? (
          <title>{pageProps.pageData.page.seo.title.value}</title>
        ) : !!pageProps.pageData?.page?.title ? (
          <title>{pageProps.pageData?.page?.title}</title>
        ) : null}
        <meta name="contentful_space" content={process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID} />
        <meta name="contentful_environment" content={process.env.NEXT_PUBLIC_CONTENTFUL_ENV} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
