import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['HeaderNavGroup'] = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['HeaderNavGroup'] = {
  root: ({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      width: '100%'
    },
    [theme.breakpoints.up('lg')]: {
      width: 231
    }
  }),

  navItemLink: ({ theme }) => ({
    ...theme.typography.bodySmall,
    'padding': 0,
    'border': 'none',
    'color': theme.palette.common.white,
    'flexGrow': '1',
    'alignItems': 'center',
    'display': 'flex',
    'width': '100%',
    'cursor': 'pointer',

    '&:is(:hover, :focus-within):not(:focus-visible)': {
      textDecoration: 'none',
      color: '#00fff2'
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
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: theme.spacing(1)
    },

    [theme.breakpoints.up('lg')]: {
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

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (_theme: Theme): ComponentsVariants['HeaderNavGroup'] => [];

export default (theme: Theme): ThemeOptions => ({
  components: {
    HeaderNavGroup: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
