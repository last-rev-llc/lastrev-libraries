import {
  TypographyStyle,
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

export const defaultProps: ComponentsProps['Page'] = {};

export const styleOverrides: ComponentsOverrides<Theme>['Page'] = {};

const createVariants = (_theme: Theme): ComponentsVariants['Page'] => [];

export const pageTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Page: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default pageTheme;
