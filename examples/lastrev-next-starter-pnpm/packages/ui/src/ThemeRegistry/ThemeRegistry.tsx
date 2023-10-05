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
              --grid-margin-xs: 8px;
              --grid-margin-sm: 8px;
              --grid-margin-md: 56px;
              --grid-margin-lg: 96px;
              --grid-margin-xl: 96px;

              --grid-gap-xs: 16px;
              --grid-gap-sm: 16px;
              --grid-gap-md: 24px;
              --grid-gap-lg: 24px;
              --grid-gap-xl: 24px;

              --grid-gap: var(--grid-margin-xs);

              ${theme.breakpoints.up('sm')} {
                --grid-gap: var(--grid-gap-sm);
              }

              ${theme.breakpoints.up('md')} {
                --grid-gap: var(--grid-gap-md);
              }

              ${theme.breakpoints.up('lg')} {
                --grid-gap: var(--grid-gap-lg);
              }

              ${theme.breakpoints.up('xl')} {
                --grid-gap: var(--grid-gap-xl);
              }

              --h1-font-size: 1.75rem;
              --h2-font-size: 1.5rem;
              --h3-font-size: 1.25rem;
              --h4-font-size: 1.125rem;
              --h5-font-size: 1rem;
              --h6-font-size: 0.875rem;
              --display1-font-size: 1.75rem;
              --display2-font-size: 1.5rem;
              --display3-font-size: 1.25rem;
              --display4-font-size: 1.125rem;
              --display5-font-size: 1rem;
              --display6-font-size: 0.875rem;
              --overline-font-size: 0.625rem;
              --body1-font-size: 0.875rem;
              --body2-font-size: 0.875rem;
              --bodySmall-font-size: 0.75rem;
              --bodyLarge-font-size: 1.125rem;

              --h1-line-height: 1.125em;
              --h2-line-height: 1.125em;
              --h3-line-height: 1.125em;
              --h4-line-height: 1.125em;
              --h5-line-height: 1.125em;
              --h6-line-height: 1.125em;
              --display1-line-height: 1.125em;
              --display2-line-height: 1.125em;
              --display3-line-height: 1.125em;
              --display4-line-height: 1.125em;
              --display5-line-height: 1.125em;
              --display6-line-height: 1.125em;
              --overline-line-height: 1.25em;
              --body1-line-height: 1.25em;
              --body2-line-height: 1.25em;
              --bodySmall-line-height: 1.25em;
              --bodyLarge-line-height: 1.25em;

              --h1-margin: 0 0 0.75em 0;
              --h2-margin: 0 0 0.75em 0;
              --h3-margin: 0 0 0.75em 0;
              --h4-margin: 0 0 0.75em 0;
              --h5-margin: 0 0 0.75em 0;
              --h6-margin: 0 0 0.75em 0;
              --display1-margin: 0 0 0.75em 0;
              --display2-margin: 0 0 0.75em 0;
              --display3-margin: 0 0 0.75em 0;
              --display4-margin: 0 0 0.75em 0;
              --display5-margin: 0 0 0.75em 0;
              --display6-margin: 0 0 0.75em 0;
              --overline-margin: 0 0 1.5em 0;
              --body1-margin: 0;
              --body2-margin: 0;
              --bodySmall-margin: 0;
              --bodyLarge-margin: 0;

              --h1-font-weight: 500;
              --h2-font-weight: 500;
              --h3-font-weight: 500;
              --h4-font-weight: 500;
              --h5-font-weight: 500;
              --h6-font-weight: 500;
              --display1-font-weight: 500;
              --display2-font-weight: 500;
              --display3-font-weight: 500;
              --display4-font-weight: 500;
              --display5-font-weight: 500;
              --display6-font-weight: 500;
              --overline-font-weight: 900;
              --body1-font-weight: 400;
              --body2-font-weight: 400;
              --bodySmall-font-weight: 400;
              --bodyLarge-font-weight: 400;
            }

            body * {
              ${theme.containerBreakpoints.up('sm')} {
                --h1-font-size: 2rem;
                --h2-font-size: 1.75rem;
                --h3-font-size: 1.5rem;
                --h4-font-size: 1.25rem;
                --h5-font-size: 1.125rem;
                --h6-font-size: 1rem;
                --display1-font-size: 2rem;
                --display2-font-size: 1.75rem;
                --display3-font-size: 1.5rem;
                --display4-font-size: 1.25rem;
                --display5-font-size: 1.125rem;
                --display6-font-size: 1rem;
                --overline-font-size: 0.625rem;
                --body1-font-size: 0.875rem;
                --body2-font-size: 0.875rem;
                --bodySmall-font-size: 0.75rem;
                --bodyLarge-font-size: 1.125rem;
              }

              ${theme.containerBreakpoints.up('md')} {
                --h1-font-size: 2.25rem;
                --h2-font-size: 2rem;
                --h3-font-size: 1.75rem;
                --h4-font-size: 1.5rem;
                --h5-font-size: 1.25rem;
                --h6-font-size: 1.125rem;
                --display1-font-size: 2.25rem;
                --display2-font-size: 2rem;
                --display3-font-size: 1.75rem;
                --display4-font-size: 1.5rem;
                --display5-font-size: 1.25rem;
                --display6-font-size: 1.125rem;
                --overline-font-size: 0.875rem;
                --body1-font-size: 1rem;
                --body2-font-size: 1rem;
                --bodySmall-font-size: 0.875rem;
                --bodyLarge-font-size: 1.25rem;
              }

              ${theme.containerBreakpoints.up('lg')} {
                --h1-font-size: 2.5rem;
                --h2-font-size: 2.25rem;
                --h3-font-size: 1.75rem;
                --h4-font-size: 1.5rem;
                --h5-font-size: 1.25rem;
                --h6-font-size: 1.125rem;
                --display1-font-size: 2.5rem;
                --display2-font-size: 2.25rem;
                --display3-font-size: 2rem;
                --display4-font-size: 1.5rem;
                --display5-font-size: 1.25rem;
                --display6-font-size: 1.125rem;
              }

              ${theme.containerBreakpoints.up('xl')} {
                --h1-font-size: 2.75rem;
                --h2-font-size: 2.5rem;
                --h3-font-size: 2rem;
                --h4-font-size: 1.75rem;
                --h5-font-size: 1.5rem;
                --h6-font-size: 1.25rem;
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
