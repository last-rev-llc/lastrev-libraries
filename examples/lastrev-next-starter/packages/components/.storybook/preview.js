import { addDecorator, addParameters } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';
import Card from '@last-rev/component-library/dist/components/Card/Card';
import Header from '@last-rev/component-library/dist/components/Header/Header';
import Section from '@last-rev/component-library/dist/components/Section/Section';
import Collection from '@last-rev/component-library/dist/components/Collection/Collection';
import Link from '@last-rev/component-library/dist/components/Link/Link';
import Hero from '@last-rev/component-library/dist/components/Hero/Hero';
import Text from '@last-rev/component-library/dist/components/Text/Text';
import Media from '@last-rev/component-library/dist/components/Media/Media';
import NavigationItem from '@last-rev/component-library/dist/components/NavigationItem/NavigationItem';
import CollectionFiltered from '../src/components/CollectionFiltered';
import theme from '../src/theme';
import './styles.css';

// import * as components from '../src';

const contentMapping = {
  Header,
  Section,
  Collection,
  'Collection:filtered': CollectionFiltered,
  Card,
  'Quote': Card,
  'NavigationItem': NavigationItem,
  'NavigationItem:group': NavigationItemGroup,
  'NavigationItem:link': NavigationItemLink,
  Text,
  Media,
  Link,
  Hero,
  'LanguageSelector': LanguageSelector,
  'Footer': Footer
};

const StorybookWrapper = (storyFn) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ContentModuleProvider contentMapping={contentMapping}>
          <CssBaseline />
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
      order: ['Intro', 'Modules']
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
