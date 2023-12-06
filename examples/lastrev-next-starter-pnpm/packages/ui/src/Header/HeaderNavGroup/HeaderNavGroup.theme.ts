import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['HeaderNavGroup'] = {};

const styleOverrides: ComponentsOverrides<Theme>['HeaderNavGroup'] = {
  // root: : {},

  navItemLink: ({ theme }) => ({
    'padding': 0,
    'border': 'none',
    'flexGrow': '1',
    'alignItems': 'center',
    'display': 'flex',
    'width': '100%',
    'cursor': 'pointer',
    '&:is(:hover, :focus-within):not(:focus-visible)': {
      // TODO: ADA recommends all links are underlined, so we should not do the below, but we can add custom styles here
      // textDecoration: 'none',
      fontWeight: 800
    },

    // TODO: Standardizxe this across the header links if they're the same
    '.MuiSvgIcon-root': {
      fill: theme.vars.palette.primary.main,
      width: 'auto',
      height: '16px',
      paddingLeft: theme.spacing(0.625)
    }
  }),

  navItemSubMenu: ({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)', // Change this to however many columns they'd like
      gap: theme.spacing(1)
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
