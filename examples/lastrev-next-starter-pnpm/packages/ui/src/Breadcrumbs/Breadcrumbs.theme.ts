import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['Breadcrumbs'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Breadcrumbs'] = {
  root: {},
  breadcrumb: {}
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