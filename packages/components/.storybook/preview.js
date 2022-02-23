import { addDecorator, addParameters } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';
import Card from '@last-rev/component-library/dist/components/Card/Card';
import Header from '../src/components/Header';
import Section from '@last-rev/component-library/dist/components/Section/Section';
import Collection from '@last-rev/component-library/dist/components/Collection/Collection';
import Link from '@last-rev/component-library/dist/components/Link/Link';
import Hero from '@last-rev/component-library/dist/components/Hero/Hero';
import Text from '@last-rev/component-library/dist/components/Text/Text';
import Media from '@last-rev/component-library/dist/components/Media/Media';
import '@algolia/autocomplete-theme-classic';
import NavigationItem from '../src/components/NavigationItem';
import SearchBox from '../src/components/SearchBox';
import AutocompleteBox from '../src/components/AutocompleteBox';
import CollectionFiltered from '../src/components/CollectionFiltered';
import Quote from '../src/components/Quote';
import Footer from '../src/components/Footer';
import ArticleText from '../src/components/Text';
import theme from '../src/theme';

const contentMapping = {
  Header,
  Footer,
  Section,
  Collection,
  'Collection:filtered': CollectionFiltered,
  Card,
  Quote,
  'Quote': Card,
  NavigationItem,
  Text,
  'Text:article': ArticleText,
  Media,
  Link,
  Hero,
  'ModuleIntegration:search-box': SearchBox,
  'ModuleIntegration:autocomplete-search-box': AutocompleteBox
};

const StorybookWrapper = (storyFn) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ContentModuleProvider contentMapping={contentMapping}>
          <CssBaseline />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" />
          {storyFn()}
        </ContentModuleProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

addDecorator(StorybookWrapper);

addParameters({
  layout: 'fullscreen',
  options: {
    isToolshown: true,
    storySort: {
      method: 'alphabetical',
      order: ['Intro', 'Modules', 'Pages', 'Elements']
    }
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#ffffff'
      },
      {
        name: 'dark',
        value: '#222222'
      }
    ]
  },
  viewport: {
    viewports: {
      '684px': {
        name: 'Grid sm 684px',
        styles: {
          height: '100%',
          width: '684px'
        },
        type: 'mobile'
      },
      '768px': {
        name: 'Grid md 768px',
        styles: {
          height: '100%',
          width: '768px'
        },
        type: 'mobile'
      },
      '1024px': {
        name: 'Grid lg 1024px',
        styles: {
          height: '100%',
          width: '1024px'
        },
        type: 'mobile'
      },
      '1440px': {
        name: 'Grid xl 1440px',
        styles: {
          height: '100%',
          width: '1440px'
        },
        type: 'mobile'
      },
      ...INITIAL_VIEWPORTS
    }
  }
});
