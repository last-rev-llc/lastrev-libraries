import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['FooterNavigationItemGroup'] = {};

const styleOverrides: ComponentsOverrides<Theme>['FooterNavigationItemGroup'] = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--grid-gap-quarter)'
  },

  navItemLink: ({ theme, ownerState }) => ({
    ...(ownerState.variant === 'linkBoldedFooter'
      ? {
          ...theme.typography.navLink,
          minHeight: 'calc(2 * var(--bodyXSmall-line-height))'
        }
      : {
          ...theme.typography.bodyXSmall
        })
  }),

  navItemLinkGroup: ({ theme }) => ({
    ...theme.typography.navLink,

    gap: 'var(--grid-gap-quarter)',

    [theme.breakpoints.up('md')]: {
      minHeight: 'calc(2 * var(--bodyXSmall-line-height))'
    }
  }),

  navItemSubMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--grid-gap-half)'
  },

  navItemSubMenuItem: ({ theme }) => ({
    padding: 0,
    ...theme.typography.bodySmall
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['FooterNavigationItemGroup'] => [];

export const footerNavigationItemGroupTheme = (theme: Theme): ThemeOptions => ({
  components: {
    FooterNavigationItemGroup: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default footerNavigationItemGroupTheme;
