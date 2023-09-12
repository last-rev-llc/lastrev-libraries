import {
  TypographyStyle,
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['Person'] = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Person'] = {
  root: ({}) => ({}),
  featuredMedia: ({}) => ({}),
  name: ({}) => ({}),
  jobTitle: ({}) => ({}),
  email: ({}) => ({}),
  body: ({}) => ({})
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (_theme: Theme): ComponentsVariants['Person'] => [];

export default (theme: Theme): ThemeOptions => ({
  components: {
    Person: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
