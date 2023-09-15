import {
  TypographyStyle,
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

export const defaultProps: ComponentsProps['Person'] = {};

export const styleOverrides: ComponentsOverrides<Theme>['Person'] = {
  root: ({}) => ({}),
  featuredMedia: ({}) => ({}),
  name: ({}) => ({}),
  jobTitle: ({}) => ({}),
  email: ({}) => ({}),
  body: ({}) => ({})
};

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
