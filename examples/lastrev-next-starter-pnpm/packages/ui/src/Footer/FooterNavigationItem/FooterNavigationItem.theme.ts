import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['FooterNavigationItem'] = {};

const styleOverrides: ComponentsOverrides<Theme>['FooterNavigationItem'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.typography.body2,

    color: theme.vars.palette.secondary.main,
    border: 'solid 10px blue'
  })

  // rootLinkButton: : {},

  // rootLink: : {}
};

const createVariants = (_theme: Theme): ComponentsVariants['FooterNavigationItem'] => [];

export const footerNavigationItemTheme = (theme: Theme): ThemeOptions => ({
  components: {
    FooterNavigationItem: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default footerNavigationItemTheme;
