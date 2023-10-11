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

  // navItemLink: {},

  navItemSubMenu: ({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateAreas: '"first second"',
    gap: 'calc(var(--grid-gap) / 4)',

    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column'
    }
  }),

  navItemSubMenuItem: {
    gap: 'calc(var(--grid-gap) / 4)'
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
