import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['FooterNavigationItem'] = {};

const styleOverrides: ComponentsOverrides<Theme>['FooterNavigationItem'] = {
  root: ({ theme, ownerState }) => ({
    ...(ownerState.variant === 'linkBoldedFooter' || ownerState.variant === 'labelFooter'
      ? {
          ...theme.typography.navLink
        }
      : {
          ...theme.typography.bodyXSmall
        })
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
