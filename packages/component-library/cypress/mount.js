import React from 'react';
import { mount as ogMount } from '@cypress/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

import theme from '../src/theme/mock.theme';

// TODO: Add support for SCSS loader in Cypress
// import * as components from '../src';
import Header from '../src/components/Header';
import Text from '../src/components/Text';
import Link from '../src/components/Link';
import Media from '../src/components/Media';
import Card from '../src/components/Card';
import Collection from '../src/components/Collection';
import CollectionCarousel from '../src/components/CollectionCarousel';
import CollectionAccordion from '../src/components/CollectionAccordion';
import CollectionFiltered from '../src/components/CollectionFiltered';
import NavigationBar from '../src/components/NavigationBar';
import Accordion from '../src/components/Accordion';
import Section from '../src/components/Section';
import BackToTop from '../src/components/BackToTop';
import NavigationItem from '../src/components/NavigationItem';
import Hero from '../src/components/Hero';
import Image from '../src/components/Image';
import MailchimpForm from '../src/components/MailchimpForm';
import SEO from '../src/components/SEO';
import { ContentModuleProvider } from '../src/components/ContentModule/ContentModuleContext';

const components = {
  Accordion,
  Header,
  Text,
  Link,
  Media,
  Card,
  Collection,
  'Collection:carousel': CollectionCarousel,
  'Collection:accordion': CollectionAccordion,
  'Collection:filtered': CollectionFiltered,
  'Collection:carousel-large': CollectionCarousel,
  'Collection:carousel-small': CollectionCarousel,
  'Collection:navigation-bar': NavigationBar,
  Section,
  BackToTop,
  NavigationItem,
  Hero,
  Image,
  MailchimpForm,
  SEO
};

const mount = (component, options) =>
  ogMount(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ContentModuleProvider contentMapping={components}>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" />
          <CssBaseline />
          {component}
        </ContentModuleProvider>
      </ThemeProvider>
    </StyledEngineProvider>,
    options
  );

export default mount;
