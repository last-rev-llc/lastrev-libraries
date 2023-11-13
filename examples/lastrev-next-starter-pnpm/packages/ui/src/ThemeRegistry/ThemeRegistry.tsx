'use client';
import * as React from 'react';
// import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import StyledComponentsRegistry from './StyledComponentsRegistry';
import CssVars from './CssVars';
import { theme } from './theme';
import { Experimental_CssVarsProvider as CssVarsProvider, css } from '@mui/material/styles';
import { getInitColorSchemeScript } from '@mui/material/styles';
export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <>
      {getInitColorSchemeScript()}
      <StyledComponentsRegistry>
        <CssVarsProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline enableColorScheme />
          <CssVars />
          {children}
        </CssVarsProvider>
      </StyledComponentsRegistry>
    </>
  );
}
