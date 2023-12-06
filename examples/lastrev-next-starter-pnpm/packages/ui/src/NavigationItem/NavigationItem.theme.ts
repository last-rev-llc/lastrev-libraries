import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['NavigationItem'] = {};

const styleOverrides: ComponentsOverrides<Theme>['NavigationItem'] = {};

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
