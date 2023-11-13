import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Grid'] = {
  overrideNested: false
};

const styleOverrides: ComponentsOverrides<Theme>['Grid'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyGrid({ theme, ownerState })
  })
};

const createVariants = (theme: Theme): ComponentsVariants['Grid'] => [];

export const gridTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Grid: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default gridTheme;
