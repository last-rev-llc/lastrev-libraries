'use client';
import * as React from 'react';
import { ThemeProvider, css } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import StyledComponentsRegistry from './StyledComponentsRegistry';
import { theme } from './theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline enableColorScheme />
        <GlobalStyles
          styles={css`
            :root {
              --display1-font-size: 1.75rem;
              --display2-font-size: 1.5rem;
              --display3-font-size: 1.25rem;
              --display4-font-size: 1rem;
              --display5-font-size: 1rem;
              --display6-font-size: 1rem;
              --overline-font-size: 0.75rem;

              --display1-line-height: 1.125em;
              --display2-line-height: 1.125em;
              --display3-line-height: 1.125em;
              --display4-line-height: 1.125em;
              --display5-line-height: 1.125em;
              --display6-line-height: 1.125em;
              --overline-line-height: 1.125em;

              --display1-margin: 0 0 0.75em 0;
              --display2-margin: 0 0 0.75em 0;
              --display3-margin: 0 0 0.75em 0;
              --display4-margin: 0 0 0.75em 0;
              --display5-margin: 0 0 0.75em 0;
              --display6-margin: 0 0 0.75em 0;
              --overline-margin: 0 0 0.75em 0;

              --display1-font-weight: 500;
              --display2-font-weight: 500;
              --display3-font-weight: 500;
              --display4-font-weight: 500;
              --display5-font-weight: 500;
              --display6-font-weight: 500;
              --overline-font-weight: 900;
            }

            body * {
              ${theme.containerBreakpoints.up('sm')} {
                --display1-font-size: 2rem;
                --display2-font-size: 1.75rem;
                --display3-font-size: 1.5rem;
                --display4-font-size: 1.25rem;
                --display5-font-size: 1rem;
                --display6-font-size: 1rem;
              }

              ${theme.containerBreakpoints.up('md')} {
                --display1-font-size: 2.25rem;
                --display2-font-size: 2rem;
                --display3-font-size: 1.75rem;
                --display4-font-size: 1.5rem;
                --display5-font-size: 1.25rem;
                --display6-font-size: 1.25rem;
                --overline-font-size: 1rem;
              }

              ${theme.containerBreakpoints.up('lg')} {
                --display1-font-size: 2.5rem;
                --display2-font-size: 2.25rem;
                --display3-font-size: 1.75rem;
                --display4-font-size: 1.5rem;
                --display5-font-size: 1.25rem;
                --display6-font-size: 1rem;
              }

              ${theme.containerBreakpoints.up('xl')} {
                --display1-font-size: 2.75rem;
                --display2-font-size: 2.5rem;
                --display3-font-size: 2rem;
                --display4-font-size: 1.75rem;
                --display5-font-size: 1.5rem;
                --display6-font-size: 1.25rem;
              }
            }
          `}
        />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
