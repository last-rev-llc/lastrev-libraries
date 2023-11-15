import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

import { type Theme } from '../ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Breadcrumbs'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Breadcrumbs'] = {
  root: ({ theme }) => ({
    '& *': {
      ...theme.typography.bodyXSmall,
      'color': 'var(--mui-palette-text-primary)',

      '[class*=separator]': {
        padding: `0 var(--grid-gap-quarter)`
      }
    }
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['Breadcrumbs'] => [];

export const BreadcrumbsTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Breadcrumbs: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default BreadcrumbsTheme;
