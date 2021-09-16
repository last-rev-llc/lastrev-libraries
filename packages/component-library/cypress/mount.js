import React from 'react';
import { mount as ogMount } from '@cypress/react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';

import theme from '../src/theme/mock.theme';

// TODO: Add support for SCSS loader in Cypress
// import * as components from '../src';
import Text from '../src/components/Text';
import Link from '../src/components/Link';
import Media from '../src/components/Media';
import Card from '../src/components/Card';
import { ContentModuleProvider } from '../src/components/ContentModule/ContentModuleContext';

const components = {
  Text,
  Link,
  Media,
  Card,
}

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
 