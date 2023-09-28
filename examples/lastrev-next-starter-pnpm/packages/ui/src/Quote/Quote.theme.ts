import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

export const defaultProps: ComponentsProps['Quote'] = {};

export const styleOverrides: ComponentsOverrides<Theme>['Quote'] = {
  // Set some static styles
  root: {
    backgroundColor: 'red'
  }
};

const createVariants = (_theme: Theme): ComponentsVariants['Quote'] => [];

export const quoteTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Quote: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default quoteTheme;
