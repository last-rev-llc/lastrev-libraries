import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['HeaderNavLink'] = {};

const styleOverrides: ComponentsOverrides<Theme>['HeaderNavLink'] = {
  root: ({ theme, open }) => ({
    'height': '100%',
    'borderBottom': `solid ${theme.spacing(0.5)} transparent`,
    'borderTop': `solid ${theme.spacing(0.5)} transparent`,
    'display': 'flex',
    'flexDirection': 'column',
    'flexGrow': '1',
    'position': 'relative',
    // 'transition': 'border-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

    '[class$=HeaderNavLink-navItemLink]': {
      ...(!!open && {
        fontWeight: 800
      })
    },

    '&:is(:hover, :focus-within):not(:focus-visible)': {
      [theme.breakpoints.up('md')]: {
        '[class*="HeaderNavLink-navItemLink"]': {
          // TODO: Standardizxe this across the header links if they're the same
          '.MuiSvgIcon-root': {
            // fill: 'currentcolor',
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
    // TODO: Custom Styles
    'borderTop': `solid 1px ${theme.palette.primary.main}`,

    'flexGrow': '1',
    'alignItems': 'center',
    'display': 'flex',
    'width': '100%',
    'justifyContent': 'space-between',
    'cursor': 'pointer',

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1),
      justifyContent: 'flex-start',
      borderTop: 'none'
    },

    // TODO: Standardizxe this across the header links if they're the same
    '.MuiSvgIcon-root': {
      fill: theme.palette.primary.main,
      width: 'auto',
      height: theme.spacing(2),
      marginLeft: theme.spacing(0.5),
      transform: 'rotate(90deg)',
      transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

      ...(!!open && {
        [theme.breakpoints.down('md')]: {
          transform: 'rotate(-90deg)'
        }
      }),

      [theme.breakpoints.up('md')]: {
        height: '10px',
        fill: theme.palette.primary.main
      }
    }
  }),

  navItemSubMenuWrapper: ({ theme, open, ownerState }) => ({
    visibility: 'visible',
    opacity: 1,
    display: 'none',

    ...(!!open && {
      [theme.breakpoints.down('md')]: {
        display: 'block'
      }
    }),

    [theme.breakpoints.up('sm')]: {
      visibility: 'hidden',
      opacity: 0,
      display: 'block',
      position: 'absolute',
      zIndex: 1,
      bottom: 0,
      transform: 'translateY(100%)',
      flexDirection: 'row',
      padding: 0,
      paddingTop: theme.spacing(3),
      transition: 'visibility 0s, opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

      ...(ownerState.numOfCols === 2 && {
        // TODO: Check variant here instead?
        right: ownerState.hasMegaNav ? -578 : -252
      }),

      ...(ownerState.numOfCols === 1 && {
        left: 0
      })

      // TODO: Check variant here instead?
      // ...(numOfCols === 1 &&
      //   !!hasMegaNav && {
      //     right: -304
      //   }),

      // ...(numOfCols === 1 &&
      //   !hasMegaNav && {
      //     left: 0
      //   })
    }
  }),

  navItemSubMenu: ({ theme, ownerState }) => ({
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'column'
    },

    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gap: theme.spacing(0),
      overflow: 'hidden',
      width: 'fit-content',
      // @ts-ignore: TODO: items not recognized
      gridTemplateColumns: `repeat(${(ownerState.numOfCols ?? 0) + 1}, auto)`,
      border: `solid 1px ${theme.palette.primary.contrastText}`
    }
  }),

  navItemSubMenuItem: ({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start'
    }
  }),

  megaNavContainer: ({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'space-between',
      juistifyContent: 'space-between',
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

const createVariants = (_theme: Theme): ComponentsVariants['HeaderNavLink'] => [];

export const headerNavLinkTheme = (theme: Theme): ThemeOptions => ({
  components: {
    HeaderNavLink: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default headerNavLinkTheme;
