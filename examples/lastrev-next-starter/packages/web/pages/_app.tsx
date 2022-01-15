import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import '@last-rev/component-library/dist/styles.css';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@lrns/components/src/theme';
import { createEmotionCache } from '../src/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { LazyMotion } from 'framer-motion';
// LastRev components
import '../styles/globals.css';
import dynamic from 'next/dynamic';
const SEO = dynamic(() => import('@last-rev/component-library/dist/components/SEO/SEO'));
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const loadFeatures = () => import('../src/features').then((res) => res.default);

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
        <LazyMotion strict features={loadFeatures}>
          <CssBaseline />
          <Component {...pageProps} />
        </LazyMotion>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
