import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['HeaderNavLink'] = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['HeaderNavLink'] = {
  root: ({ theme, open }) => ({
    'height': '100%',
    'borderBottom': `solid ${theme.spacing(0.5)} transparent`,
    'borderTop': `solid ${theme.spacing(0.5)} transparent`,
    'display': 'flex',
    'flexDirection': 'column',
    'flexGrow': '1',
    'position': 'relative',
    'transition': 'border-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

    '& [class$=HeaderNavLink-navItemLink]': {
      ...theme.typography.body2,
      fontSize: '0.875rem',

      ...(!!open && {
        fontWeight: 800
      })
    },

    '&:is(:hover, :focus-within):not(:focus-visible)': {
      [theme.breakpoints.up('lg')]: {
        'borderBottomColor': '#fba62d',

        '[class*="HeaderNavLink-navItemLink"]': {
          'color': theme.palette.primary.main,

          '.MuiSvgIcon-root': {
            fill: theme.palette.primary.main,
            transform: 'rotate(-90deg)'
          }
        },

        '[class*="HeaderNavLink-navItemSubMenuWrapper"]': {
          visibility: 'visible',
          opacity: 1
        }
      }
    }
  }),

  navItemLink: ({ theme, open }) => ({
    'padding': theme.spacing(0, 2),
    'color': theme.palette.text.primary,
    'flexGrow': '1',
    'alignItems': 'center',
    'display': 'flex',
    'width': '100%',
    'justifyContent': 'space-between',
    'cursor': 'pointer',
    'transition': 'color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    'fontSize': '0.875rem',
    'whiteSpace': 'nowrap',

    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-start'
    },

    '.MuiSvgIcon-root': {
      fill: theme.palette.primary.main,
      width: 'auto',
      height: theme.spacing(2),
      marginLeft: theme.spacing(0.5),
      transform: 'rotate(90deg)',
      transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

      ...(!!open && {
        [theme.breakpoints.down('lg')]: {
          transform: 'rotate(-90deg)'
        }
      }),

      [theme.breakpoints.up('lg')]: {
        height: '10px',
        fill: theme.palette.primary.main
      }
    }
  }),

  navItemSubMenuWrapper: ({ theme, open, numOfCols, hasMegaNav }) => ({
    visibility: 'visible',
    opacity: 1,
    display: 'none',

    ...(!!open && {
      [theme.breakpoints.down('lg')]: {
        display: 'block'
      }
    }),

    [theme.breakpoints.up('lg')]: {
      visibility: 'hidden',
      opacity: 0,
      display: 'block',
      position: 'absolute',
      zIndex: 1,
      bottom: 0,
      transform: 'translateY(100%)',
      flexDirection: 'row',
      padding: 0,
      paddingTop: theme.spacing(0.5),
      transition: 'visibility 0s, opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

      ...(numOfCols === 2 && {
        right: hasMegaNav ? -578 : -252
      }),

      ...(numOfCols === 1 &&
        !!hasMegaNav && {
          right: -304
        }),

      ...(numOfCols === 1 &&
        !hasMegaNav && {
          left: 0
        })
    }
  }),

  navItemSubMenu: ({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3, 3),
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(1)
    },

    [theme.breakpoints.up('lg')]: {
      'display': 'grid',
      'gap': theme.spacing(0),
      'padding': theme.spacing(1, 0),
      'borderBottomLeftRadius': theme.spacing(4),
      'borderTopRightRadius': theme.spacing(4),
      'overflow': 'hidden',
      'backgroundColor': '#1e2145', //theme.palette.primary.main,
      'width': 'fit-content',
      // @ts-ignore: TODO: items not recognized
      'gridTemplateColumns': `repeat(1, auto)`,
      'boxShadow': theme.shadows[1],

      '> li': {
        padding: theme.spacing(1, 2)
      },

      '> li:last-of-type': {
        borderColor: 'transparent'
      }
    }
  }),

  navItemSubMenuItem: ({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
      alignItems: 'flex-start'
    }
  }),

  megaNavContainer: ({ theme }) => ({
    display: 'none',

    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'space-between',
      juistifyContent: 'space-between',
      backgroundColor: theme.palette.grey[100],
      // TODO: Is there a better way to define this?
      width: 324
    }
  }),

  megaNavContent: ({ theme }) => ({
    flex: 1,
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5)
  }),

  megaNavTitle: () => ({}),

  megaNavActions: () => ({}),

  megaNavAction: () => ({}),

  megaNavMedia: () => ({
    // TODO: Is there a better way to define this?
    maxHeight: 190,
    margin: 0
  })
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (_theme: Theme): ComponentsVariants['HeaderNavLink'] => [];

export default (theme: Theme): ThemeOptions => ({
  components: {
    HeaderNavLink: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
