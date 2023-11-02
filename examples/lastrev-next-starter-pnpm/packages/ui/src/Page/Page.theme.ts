import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Page'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Page'] = {
  root: ({ theme }) => ({
    '& > *': {
      paddingTop: 'var(--section-padding)',
      paddingBottom: 'var(--section-padding)'
    }
  })
};

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
