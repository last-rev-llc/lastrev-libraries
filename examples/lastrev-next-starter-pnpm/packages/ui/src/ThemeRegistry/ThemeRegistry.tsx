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
        <CssBaseline enableColorScheme />
        <GlobalStyles
          styles={css`
            @font-face {
              font-family: 'swiper-icons';
              src: url('data:application/font-woff;charset=utf-8;base64, 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');
              font-weight: 400;
              font-style: normal;
            }

            :root {
              --grid-margin-xs: 16px;
              --grid-margin-sm: 32px;
              --grid-margin-md: 48px;
              --grid-margin-lg: 64px;
              --grid-margin-xl: 80px;

              --grid-gap-xs: calc(var(--grid-margin-xs) / 4);
              --grid-gap-sm: calc(var(--grid-margin-sm) / 4);
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

              --section-padding: calc(var(--grid-gap) * 4);

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
              --bodySmall-font-size: 0.625rem;
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

              --swiper-theme-color: #007aff;
              --swiper-preloader-color: var(--swiper-theme-color);
              --swiper-wrapper-transition-timing-function: initial;

              --swiper-navigation-size: calc(var(--grid-margin) / 2);
              --swiper-navigation-top-offset: 50%;
              --swiper-navigation-sides-offset: 0; //calc(var(--grid-margin) / 2);
              --swiper-navigation-color: var(--swiper-theme-color);

              --swiper-pagination-color: var(--swiper-theme-color);
              --swiper-pagination-left: auto;
              --swiper-pagination-right: calc(var(--grid-gap) / 2);
              --swiper-pagination-bottom: calc(var(--grid-gap) / 2);
              --swiper-pagination-top: auto;
              --swiper-pagination-fraction-color: inherit;
              --swiper-pagination-progressbar-bg-color: rgba(0, 0, 0, 0.25);
              --swiper-pagination-progressbar-size: calc(var(--grid-gap) / 4);
              --swiper-pagination-bullet-size: calc(var(--grid-gap) / 2);
              --swiper-pagination-bullet-width: calc(var(--grid-gap) / 2);
              --swiper-pagination-bullet-height: calc(var(--grid-gap) / 2);
              --swiper-pagination-bullet-border-radius: 50%;
              --swiper-pagination-bullet-inactive-color: #000;
              --swiper-pagination-bullet-inactive-opacity: 0.2;
              --swiper-pagination-bullet-opacity: 1;
              --swiper-pagination-bullet-horizontal-gap: calc(var(--grid-gap) / 4);
              --swiper-pagination-bullet-vertical-gap: calc(var(--grid-gap) / 4);

              --swiper-scrollbar-border-radius: calc(var(--grid-gap) / 2);
              --swiper-scrollbar-top: auto;
              --swiper-scrollbar-bottom: calc(var(--grid-gap) / 4);
              --swiper-scrollbar-left: auto;
              --swiper-scrollbar-right: calc(var(--grid-gap) / 4);
              --swiper-scrollbar-sides-offset: 1%;
              --swiper-scrollbar-bg-color: rgba(0, 0, 0, 0.1);
              --swiper-scrollbar-drag-bg-color: rgba(0, 0, 0, 0.5);
              --swiper-scrollbar-size: calc(var(--grid-gap) / 4);
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
                --overline-font-size: 0.75rem;
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
