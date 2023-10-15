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
    gap: 'calc(var(--grid-gap) / 4)'
  },

  navItemLinkGroup: ({ theme }) => ({
    ...theme.typography.bodyLarge,
    gap: 'calc(var(--grid-gap) / 4)'
  }),

  navItemSubMenu: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 'calc(var(--grid-gap) / 2)'
  }),

  navItemSubMenuItem: {
    padding: 0
  }
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
