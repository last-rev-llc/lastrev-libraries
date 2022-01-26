import React from 'react';
import { mount as ogMount } from '@cypress/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';
import theme from '../src/theme';
import contentMapping from '../src/contentMapping';
import '@last-rev/component-library/dist/styles.css';

const mount = (component, options) =>
  ogMount(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ContentModuleProvider contentMapping={contentMapping}>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" />
          <CssBaseline />
          {component}
        </ContentModuleProvider>
      </ThemeProvider>
    </StyledEngineProvider>,
    options
  );

export default mount;
