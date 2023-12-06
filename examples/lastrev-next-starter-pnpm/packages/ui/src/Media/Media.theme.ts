import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Media'] = {
  nextImageOptimization: true,
  priority: false,
  sizes: '100vw' // All images are shown close to full bleed size
};

const styleOverrides: ComponentsOverrides<Theme>['Media'] = {
  // Set some static styles
  root: {
    // img default display: inline introduces a line-height space at the bottom
    display: 'block',
    maxWidth: `100%`,
    height: 'auto'
  }
};

const createVariants = (_theme: Theme): ComponentsVariants['Media'] => [];

export const mediaTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Media: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default mediaTheme;
