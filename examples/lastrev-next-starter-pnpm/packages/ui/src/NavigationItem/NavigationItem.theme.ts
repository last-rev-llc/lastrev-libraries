import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['NavigationItem'] = {};

const styleOverrides: ComponentsOverrides<Theme>['NavigationItem'] = {
  // link: {
  //   textDecoration: 'none',
  //   textUnderline: 'none'
  // }
};

const createVariants = (_theme: Theme): ComponentsVariants['NavigationItem'] => [];

export const navigationItemTheme = (theme: Theme): ThemeOptions => ({
  components: {
    NavigationItem: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default navigationItemTheme;
