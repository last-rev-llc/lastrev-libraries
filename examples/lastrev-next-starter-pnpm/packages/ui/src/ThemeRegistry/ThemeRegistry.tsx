'use client';
import * as React from 'react';

import { ThemeProvider, css } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import StyledComponentsRegistry from './StyledComponentsRegistry';
import { theme } from './theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const h1FontSizeBase = 3;
  const h2FontSizeBase = 2.25;
  const h3FontSizeBase = 1.75;
  const h4FontSizeBase = 1.5;
  const h5FontSizeBase = 1.25;
  const h6FontSizeBase = 1;

  const display1FontSizeBase = 3;
  const display2FontSizeBase = 2.25;
  const display3FontSizeBase = 1.75;
  const display4FontSizeBase = 1.5;
  const display5FontSizeBase = 1.25;
  const display6FontSizeBase = 1;

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <GlobalStyles
          styles={css`
            @font-face {
              font-family: 'swiper-icons';
              src: url('data:application/font-woff;charset=utf-8;base64, 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');
              font-weight: 400;
              font-style: normal;
            }

            // Grid and spacing
            :root {
              --grid-margin-xs: 12px;
              --grid-margin-sm: 36px;
              --grid-margin-md: 64px;
              --grid-margin-lg: 96px;
              --grid-margin-xl: 128px;

              --grid-gap-xs: var(--grid-margin-xs);
              --grid-gap-sm: calc(var(--grid-margin-sm) / 2);
              --grid-gap-md: calc(var(--grid-margin-md) / 4);
              --grid-gap-lg: calc(var(--grid-margin-lg) / 4);
              --grid-gap-xl: calc(var(--grid-margin-xl) / 4);

              --grid-gap: var(--grid-margin-xs);

              ${theme.breakpoints.up('sm')} {
                --grid-gap: var(--grid-gap-sm);
                --grid-margin: var(--grid-margin-sm);
              }

              ${theme.breakpoints.up('md')} {
                --grid-gap: var(--grid-gap-md);
                --grid-margin: var(--grid-margin-md);
              }

              ${theme.breakpoints.up('lg')} {
                --grid-gap: var(--grid-gap-lg);
                --grid-margin: var(--grid-margin-lg);
              }

              ${theme.breakpoints.up('xl')} {
                --grid-gap: var(--grid-gap-xl);
                --grid-margin: var(--grid-margin-xl);
              }

              --section-padding: calc(var(--grid-gap) * 3);

              // Typography
              --h1-font-size-base: 44px;
              --h2-font-size-base: 36px;
              --h3-font-size-base: 28px;
              --h4-font-size-base: 24px;
              --h5-font-size-base: 20px;
              --h6-font-size-base: 16px;
              --display1-font-size-base: 48px;
              --display2-font-size-base: 40px;

              --h1-font-size: var(--h1-font-size-base);
              --h2-font-size: var(--h2-font-size-base);
              --h3-font-size: var(--h3-font-size-base);
              --h4-font-size: var(--h4-font-size-base);
              --h5-font-size: var(--h5-font-size-base);
              --h6-font-size: var(--h6-font-size-base);
              --display1-font-size: var(--display1-font-size-base);
              --display2-font-size: var(--display2-font-size-base);

              --h1-line-height: 1.1em;
              --h2-line-height: 1.3em;
              --h3-line-height: 1.3em;
              --h4-line-height: 1.3em;
              --h5-line-height: 1.3em;
              --h6-line-height: 1.3em;
              --display1-line-height: 1.3em;
              --display2-line-height: 1.3em;
              --display3-line-height: 1.3em;
              --overline-line-height: 1.3em;
              --body1-line-height: 1.3em;
              --body2-line-height: 1.3em;

              --h1-margin: 0 0 16px 0;
              --h2-margin: 0 0 16px 0;
              --h3-margin: 0 0 16px 0;
              --h4-margin: 0 0 16px 0;
              --h5-margin: 0 0 16px 0;
              --h6-margin: 0 0 16px 0;
              --display1-margin: 0 0 16px 0;
              --display2-margin: 0 0 16px 0;
              --overline-margin: 0 0 16px 0;
              --body1-margin: 0;
              --body2-margin: 0;

              --h1-font-weight: 700;
              --h2-font-weight: 700;
              --h3-font-weight: 700;
              --h4-font-weight: 700;
              --h5-font-weight: 700;
              --h6-font-weight: 700;
              --display1-font-weight: 700;
              --display2-font-weight: 400;
              --overline-font-weight: 400;
              --body1-font-weight: 400;
              --body2-font-weight: 400;
            }

            body * {
              ${theme.containerBreakpoints.up('sm')} {
                --h1-font-size: ${(h1FontSizeBase / 8) * 6}rem;
                --h2-font-size: ${(h2FontSizeBase / 8) * 6}rem;
                --h3-font-size: ${(h3FontSizeBase / 8) * 6}rem;
                --h4-font-size: ${(h4FontSizeBase / 8) * 6}rem;
                --h5-font-size: ${(h5FontSizeBase / 8) * 6}rem;
                --h6-font-size: ${(h6FontSizeBase / 8) * 6}rem;
                --display1-font-size: ${(display1FontSizeBase / 8) * 6}rem;
                --display2-font-size: ${(display2FontSizeBase / 8) * 6}rem;
                --display3-font-size: ${(display3FontSizeBase / 8) * 6}rem;
                --display4-font-size: ${(display4FontSizeBase / 8) * 6}rem;
                --display5-font-size: ${(display5FontSizeBase / 8) * 6}rem;
                --display6-font-size: ${(display6FontSizeBase / 8) * 6}rem;
                --section-padding: calc(var(--grid-gap) * 2);
              }

              ${theme.containerBreakpoints.up('md')} {
                --h1-font-size: ${(h1FontSizeBase / 8) * 7}rem;
                --h2-font-size: ${(h2FontSizeBase / 8) * 7}rem;
                --h3-font-size: ${(h3FontSizeBase / 8) * 7}rem;
                --h4-font-size: ${(h4FontSizeBase / 8) * 7}rem;
                --h5-font-size: ${(h5FontSizeBase / 8) * 7}rem;
                --h6-font-size: ${(h6FontSizeBase / 8) * 7}rem;
                --display1-font-size: ${(display1FontSizeBase / 8) * 7}rem;
                --display2-font-size: ${(display2FontSizeBase / 8) * 7}rem;
                --display3-font-size: ${(display3FontSizeBase / 8) * 7}rem;
                --display4-font-size: ${(display4FontSizeBase / 8) * 7}rem;
                --display5-font-size: ${(display5FontSizeBase / 8) * 7}rem;
                --display6-font-size: ${(display6FontSizeBase / 8) * 7}rem;
                --section-padding: calc(var(--grid-gap) * 2);
              }

              ${theme.containerBreakpoints.up('lg')} {
                --h1-font-size: ${(h1FontSizeBase / 8) * 8}rem;
                --h2-font-size: ${(h2FontSizeBase / 8) * 8}rem;
                --h3-font-size: ${(h3FontSizeBase / 8) * 8}rem;
                --h4-font-size: ${(h4FontSizeBase / 8) * 8}rem;
                --h5-font-size: ${(h5FontSizeBase / 8) * 8}rem;
                --h6-font-size: ${(h6FontSizeBase / 8) * 8}rem;
                --display1-font-size: ${(display1FontSizeBase / 8) * 8}rem;
                --display2-font-size: ${(display2FontSizeBase / 8) * 8}rem;
                --display3-font-size: ${(display3FontSizeBase / 8) * 8}rem;
                --display4-font-size: ${(display4FontSizeBase / 8) * 8}rem;
                --display5-font-size: ${(display5FontSizeBase / 8) * 8}rem;
                --display6-font-size: ${(display6FontSizeBase / 8) * 8}rem;
                --section-padding: calc(var(--grid-gap) * 2);
              }

              ${theme.containerBreakpoints.up('xl')} {
                --h1-font-size: ${(h1FontSizeBase / 8) * 9}rem;
                --h2-font-size: ${(h2FontSizeBase / 8) * 9}rem;
                --h3-font-size: ${(h3FontSizeBase / 8) * 9}rem;
                --h4-font-size: ${(h4FontSizeBase / 8) * 9}rem;
                --h5-font-size: ${(h5FontSizeBase / 8) * 9}rem;
                --h6-font-size: ${(h6FontSizeBase / 8) * 9}rem;
                --display1-font-size: ${(display1FontSizeBase / 8) * 9}rem;
                --display2-font-size: ${(display2FontSizeBase / 8) * 9}rem;
                --display3-font-size: ${(display3FontSizeBase / 8) * 9}rem;
                --display4-font-size: ${(display4FontSizeBase / 8) * 9}rem;
                --display5-font-size: ${(display5FontSizeBase / 8) * 9}rem;
                --display6-font-size: ${(display6FontSizeBase / 8) * 9}rem;
                --section-padding: calc(var(--grid-gap) * 2);
              }
            }
          `}
        />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
