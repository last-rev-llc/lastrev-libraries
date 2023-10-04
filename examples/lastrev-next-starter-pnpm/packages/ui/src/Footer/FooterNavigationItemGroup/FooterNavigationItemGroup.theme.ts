import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['FooterNavigationItemGroup'] = {};

const styleOverrides: ComponentsOverrides<Theme>['FooterNavigationItemGroup'] = {
  root: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3.5),
    [theme.containerBreakpoints.up('md')]: {
      gap: theme.spacing(3)
    }
  }),

  navGroupItem: ({ theme }) => ({
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    ...theme.typography.body2
  }),

  navigationItems: ({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateAreas: '"first second"',
    gap: theme.spacing(2),

    [theme.containerBreakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2)
    }
  }),

  navigationItem: ({ theme }) => ({})
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
