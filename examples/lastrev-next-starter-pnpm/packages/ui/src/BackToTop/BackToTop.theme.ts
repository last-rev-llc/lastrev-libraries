import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['BackToTop'] = {};

const styleOverrides: ComponentsOverrides<Theme>['BackToTop'] = {
  root: ({ theme, visible }) => ({
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    transition: '0.3s ease-in-out',
    zIndex: 2,
    transform: `translateY(${visible ? 0 : 100}px)`
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['BackToTop'] => [];

export const BackToTopTheme = (theme: Theme): ThemeOptions => ({
  components: {
    BackToTop: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default BackToTopTheme;
