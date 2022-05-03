import React from 'react';
import { mount as ogMount } from '@cypress/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

import { ContentModuleProvider } from '@last-rev/component-library/dist/components/ContentModule/ContentModuleContext';
import theme from '../src/theme';

import AuthProvider from '../src/components/AuthProvider';
import contentMapping from '../src/contentMapping';

const mount = (component: any, options?: any) =>
  ogMount(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ContentModuleProvider contentMapping={contentMapping}>
            <>
              <base href="http://localhost:8080/" />
              <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" />
              <CssBaseline />
              {component}
            </>
          </ContentModuleProvider>
        </AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>,
    options
  );

export default mount;
