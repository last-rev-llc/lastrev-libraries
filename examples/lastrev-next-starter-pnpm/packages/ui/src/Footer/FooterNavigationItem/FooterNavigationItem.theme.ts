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
    ...theme.typography.body2,

    ...(ownerState?.variant === 'linkBoldedFooter' && {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600
    }),

    color: theme.palette.secondary.main
  }),

  rootLinkButton: () => ({}),

  rootLink: () => ({})
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
