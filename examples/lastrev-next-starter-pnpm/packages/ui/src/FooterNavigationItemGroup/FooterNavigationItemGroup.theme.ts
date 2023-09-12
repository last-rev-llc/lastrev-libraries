import {
  TypographyStyle,
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['FooterNavigationGroup'] = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['FooterNavigationItemGroup'] = {
  root: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3.5),
    [theme.breakpoints.up('md')]: {
      gap: theme.spacing(3)
    }
  }),
  label: ({ theme }) => ({
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    ...theme.typography.body2
  }),
  navigationItems: ({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateAreas: '"first second"',
    gap: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2)
    }
  }),
  navigationItem: ({ theme }) => ({
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    ...theme.typography.body2
  })
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (_theme: Theme): ComponentsVariants['FooterNavigationItemGroup'] => [];

export const footernavigationitemgroupTheme = (theme: Theme): ThemeOptions => ({
  components: {
    FooterNavigationItemGroup: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default footernavigationitemgroupTheme;
