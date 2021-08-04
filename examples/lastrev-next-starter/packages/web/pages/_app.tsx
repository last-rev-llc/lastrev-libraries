import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

// LastRev components
import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';
import Section from '@last-rev/component-library/dist/components/Section/Section';
import Card from '@last-rev/component-library/dist/components/Card/Card';
import Text from '@last-rev/component-library/dist/components/Text/Text';
import Collection from '@last-rev/component-library/dist/components/Collection/Collection';
import CollectionCarousel from '@last-rev/component-library/dist/components/CollectionCarousel/CollectionCarousel';
import NavigationBar from '@last-rev/component-library/dist/components/NavigationBar/NavigationBar';
import Media from '@last-rev/component-library/dist/components/Media/Media';
import Link from '@last-rev/component-library/dist/components/Link/Link';
import NavigationItem from '@last-rev/component-library/dist/components/NavigationItem/NavigationItem';
import Header from '@last-rev/component-library/dist/components/Header/Header';
import Hero from '@last-rev/component-library/dist/components/Hero/Hero';
import MailchimpForm from '@last-rev/component-library/dist/components/MailchimpForm/MailchimpForm';
import '@last-rev/component-library/dist/styles.css';

// Custom components
import Quiz from '@strong365/components/dist/components/Quiz/Quiz';

import Page from '../src/components/PageGeneral';
import theme from '../src/theme';

const contentMapping: {
  [key: string]: (props: any) => JSX.Element | null;
} = {
  Header,
  Section,
  Collection,
  'Collection:carousel': CollectionCarousel,
  'Collection:carousel-large': CollectionCarousel,
  'Collection:navigation-bar': NavigationBar,
  Card,
  Text,
  Media,
  Link,
  NavigationItem,
  Hero,
  MailchimpForm,
  Quiz,
  Page
};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <meta name="contentful_space" content={process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID} />
      <meta name="contentful_environment" content={process.env.NEXT_PUBLIC_CONTENTFUL_ENV} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ContentModuleProvider contentMapping={contentMapping}>
          <Component {...pageProps} />
        </ContentModuleProvider>
      </ThemeProvider>
    </>
  );
}
export default MyApp;
