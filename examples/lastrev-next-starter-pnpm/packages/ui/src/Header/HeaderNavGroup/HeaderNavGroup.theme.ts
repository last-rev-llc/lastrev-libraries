import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

export const defaultProps: ComponentsProps['HeaderNavGroup'] = {};

export const styleOverrides: ComponentsOverrides<Theme>['HeaderNavGroup'] = {
  root: ({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      width: 231
    },

    [theme.breakpoints.up('md')]: {
      width: '100%'
    }
  }),

  navItemLink: ({ theme }) => ({
    ...theme.typography.body2,
    'padding': 0,
    'border': 'none',
    'flexGrow': '1',
    'alignItems': 'center',
    'display': 'flex',
    'width': '100%',
    'cursor': 'pointer',
    '&:is(:hover, :focus-within):not(:focus-visible)': {
      textDecoration: 'none'
    },

    '.MuiSvgIcon-root': {
      fill: theme.palette.primary.main,
      width: 'auto',
      height: '16px',
      paddingLeft: theme.spacing(0.625)
    }
  }),

  navItemSubMenuWrapper: ({ theme }) => ({
    [theme.breakpoints.only('md')]: {
      paddingLeft: theme.spacing(1)
    }
  }),

  navItemSubMenu: ({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: theme.spacing(2, 3)
    },
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  }),

  navItemSubMenuItem: ({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      width: 'fit-content'
    }
  }),

  navItemGroup: ({ theme }) => ({
    [theme.breakpoints.only('md')]: {
      paddingRight: 0,
      paddingLeft: 0
    }
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['HeaderNavGroup'] => [];

export const headerNavGroupTheme = (theme: Theme): ThemeOptions => ({
  components: {
    HeaderNavGroup: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default headerNavGroupTheme;
