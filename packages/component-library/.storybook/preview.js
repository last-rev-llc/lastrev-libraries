import { addDecorator, addParameters } from '@storybook/react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
// import '@storybook/addon-console';
import theme from '../src/theme';
import './styles.css';

import * as components from '../src';

const StorybookWrapper = (storyFn) => {
  // console.log('StoryBook', theme);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <components.ContentModuleProvider contentMapping={components}>
          <CssBaseline />
          {storyFn()}
        </components.ContentModuleProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

addDecorator(StorybookWrapper);

addParameters({
  // controls: { expanded: true },,
  options: {
    isToolshown: true,
    storySort: {
      method: 'alphabetical',
      order: [
        'Intro',
        '1. Primitives',
        // '2. Components',
        '2. Modules'
      ]
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
