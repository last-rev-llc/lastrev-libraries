import React from 'react';
import { mount as ogMount } from '@cypress/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

// TODO: Add support for SCSS loader in Cypress
// import * as components from '@last-rev/component-library/dist';
import Header from '@last-rev/component-library/dist/components/Header/Header';
import Text from '@last-rev/component-library/dist/components/Text/Text';
import Media from '@last-rev/component-library/dist/components/Media/Media';
import Card from '@last-rev/component-library/dist/components/Card/Card';
import Collection from '@last-rev/component-library/dist/components/Collection/Collection';
import CollectionCarousel from '@last-rev/component-library/dist/components/CollectionCarousel/CollectionCarousel';
import CollectionAccordion from '@last-rev/component-library/dist/components/CollectionAccordion/CollectionAccordion';
import CollectionFiltered from '@last-rev/component-library/dist/components/CollectionFiltered/CollectionFiltered';
import Accordion from '@last-rev/component-library/dist/components/Accordion/Accordion';
import Section from '@last-rev/component-library/dist/components/Section/Section';
import BackToTop from '@last-rev/component-library/dist/components/BackToTop/BackToTop';
import FormMarketoEmbed from '@last-rev/component-library/dist/components/FormMarketoEmbed/FormMarketoEmbed';
import Hero from '@last-rev/component-library/dist/components/Hero/Hero';
import Image from '@last-rev/component-library/dist/components/Image/Image';
import MailchimpForm from '@last-rev/component-library/dist/components/MailchimpForm/MailchimpForm';
import SEO from '@last-rev/component-library/dist/components/SEO/SEO';
import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';
import theme from '../src/theme';
import PageGeneral from '../src/components/PageGeneral/PageGeneral';
import Link from '../src/components/Link/Link';
import SearchBox from '../src/components/SearchBox';
import Autocomplete from '../src/components/Autocomplete';
import AutocompleteBox from '../src/components/AutocompleteBox';
import SearchResultItem from '../src/components/SearchResultItem';
import NavigationItem from '../src/components/NavigationItem';
import AuthProvider from '../src/components/AuthProvider';

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
  'ModuleIntegration:autocomplete-search-box': AutocompleteBox,
  Section,
  BackToTop,
  Hero,
  'LeadForm:marketo-default': FormMarketoEmbed,
  Image,
  MailchimpForm,
  NavigationItem,
  SEO,
  PageGeneral,
  SearchBox,
  Autocomplete,
  SearchResultItem
};

const mount = (component, options) =>
  ogMount(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ContentModuleProvider contentMapping={components}>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" />
            <CssBaseline />
            {component}
          </ContentModuleProvider>
        </AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>,
    options
  );

export default mount;
