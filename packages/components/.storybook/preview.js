import { addDecorator, addParameters } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';
import AuthProvider from '../src/components/AuthProvider';
import contentMapping from '../src/contentMapping';
import theme from '../src/theme';

import '@algolia/autocomplete-theme-classic';

const StorybookWrapper = (storyFn) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ContentModuleProvider contentMapping={contentMapping}>
            <CssBaseline />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" />
            {storyFn()}
          </ContentModuleProvider>
        </AuthProvider>
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
