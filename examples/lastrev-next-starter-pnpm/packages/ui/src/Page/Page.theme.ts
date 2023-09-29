import {
  TypographyStyle,
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['Page'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Page'] = {};

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
