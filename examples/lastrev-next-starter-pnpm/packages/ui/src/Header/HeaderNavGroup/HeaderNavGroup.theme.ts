import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['HeaderNavGroup'] = {};

const styleOverrides: ComponentsOverrides<Theme>['HeaderNavGroup'] = {
  root: ({ theme, ownerState }) => ({
    'display': 'flex',
    'flexDirection': 'column',
    'gap': theme.spacing(2),

    /// Done here instead of each component to prevent race conditions
    // This really targets nestedness

    '[class*=HeaderNavGroup-navItemSubMenu]': {
      'gap': 0,
      'marginTop': theme.spacing(-3),
      'marginLeft': theme.spacing(-3),
      '[class*=HeaderNavGroup-navItemSubMenu]': {
        margin: 0,
        gap: theme.spacing(2)
      }
    },
    '[class*="HeaderNavLink-navItemSubMenuGrid"]': {
      // display: 'flex',
      visibility: 'hidden',
      zIndex: -2,
      transform: 'translateY(-100%)'
    },
    '[class*=HeaderNavGroup-navItemSubMenuItem]': {
      // 'border': '1px solid green',
      'padding': 0,
      'paddingLeft': theme.spacing(3),
      'paddingTop': theme.spacing(3),
      '[class*=HeaderNavGroup-navItemSubMenuItem]': {
        padding: 0,
        // border: '1px solid blue',
        ...theme.typography.overline,
        margin: 0,
        textTransform: 'unset'
      }
    }
  }),
  navItemLinkGroup: { fontWeight: 'bold' },
  navItemLink: ({ theme }: { theme: Theme }) => ({
    padding: 0,
    border: 'none',
    // 'flexGrow': '1',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    cursor: 'pointer'
    // '&:is(:hover, :focus-within):not(:focus-visible)': {,
  }),
  navItemSubMenu: ({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)', // Change this to however many columns they'd like
      gap: theme.spacing(1)
    },

    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 260,
      flexWrap: 'wrap'
    }
  }),

  navItemSubMenuItem: ({ theme, ownerState }) => ({
    '[class*=HeaderNavGroup-navItemSubMenuItem]': {
      // border: '1px solid red'
    },
    // 'padding': theme.spacing(1),
    // 'paddingRight': 0,
    // 'margin': theme.spacing(5),
    // 'border': '2px solid black',

    // '[class*=HeaderNavGroup-navItemSubMenuItem]': {
    //   padding: 0,
    //   // border: '1px solid blue',
    //   ...theme.typography.overline,
    //   margin: 0,
    //   textTransform: 'unset'
    // },
    // '& &': {
    //   'margin': 0,
    //   '&': {
    //     margin: theme.spacing(5)
    //   }
    // },

    '[class*=HeaderNavGroup-navItemGroup]': { fontWeight: 400 },
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
