import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

const SUPERNAV_TIMEOUT = '15s';

const menuMobileBreakpoint = 'md';

const defaultProps: ComponentsProps['Header'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Header'] = {
  root: {
    'padding': 'var(--grid-gap) 0',
    'width': '100%',
    'zIndex': 100,
    'gap': 0,

    '& *': {
      whiteSpace: 'nowrap'
    }
  },

  contentOuterGrid: {
    rowGap: 'var(--grid-gap-half)'
  },

  logoRoot: ({ theme }) => ({
    gridColumnStart: 'start',
    gridColumnEnd: 'half',
    gridRow: 1,
    alignSelf: 'center',
    width: '100%',
    height: 'auto',
    display: 'block',

    [theme.breakpoints.up('lg')]: {
      gridRow: '2',
      gridColumnEnd: 'three-quarter'
    }
  }),

  headerMenuCtas: ({ theme }) => ({
    'padding': 0,
    'display': 'inline-flex',
    'justifyContent': 'space-between',
    'alignItems': 'center',
    'height': '100%',
    'justifySelf': 'flex-end',
    'gridRow': 3,
    'margin': 'auto',

    '& *': {
      ...theme.typography.bodyXSmall
    },

    [theme.breakpoints.up(menuMobileBreakpoint)]: {
      marginRight: 'unset',
      gridColumnStart: 'start',
      gridColumnEnd: 'end',
      justifyContent: 'flex-end',
      gap: 'var(--grid-gap)',
      gridRow: 1
    }
  }),

  headerMobileNavWrap: ({ theme, menuVisible }) => ({
    gridRow: 2,
    gridColumnStart: 'start',
    gridColumnEnd: 'end',
    maxHeight: '100vh',
    overflow: 'hidden',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    transition: 'max-height 500ms ease',
    borderBottom: `solid 2px ${theme.vars.palette.primary.main}`,
    paddingTop: 'var(--grid-gap)',
    paddingBottom: 'var(--grid-gap)',
    gap: 'var(--grid-gap)',

    [theme.breakpoints.down(menuMobileBreakpoint)]: {
      ...(!menuVisible && {
        maxHeight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        borderBottomColor: 'transparent'
      })
    },

    [theme.breakpoints.up(menuMobileBreakpoint)]: {
      display: 'contents'
    }
  }),

  headerMenuCtaItem: {
    padding: 0,
    justifyContent: 'center'
  },

  headerMenuNav: ({ theme }) => ({
    'justifyItems': 'center',
    'justifyContent': 'flex-end',
    'position': 'unset',
    'display': 'inline-flex',

    '& a': {
      whiteSpace: 'nowrap',
      color: 'inherit',
      ...theme.typography.navLink
    },

    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
      height: 'auto',
      overflow: 'unset',
      maxHeight: '100%',
      gridRow: 2,
      gridColumnStart: 'start',
      gridColumnEnd: 'end'
    },

    [theme.breakpoints.up('lg')]: {
      gridColumnStart: 'three-start'
    }
  }),

  iconButtonWrap: ({ theme }) => ({
    'padding': 0,
    'display': 'flex',
    'gridColumnStart': 'half',
    'gridColumnEnd': 'end',
    'gridRow': 1,
    'justifyContent': 'flex-end',

    '& *': {
      fill: 'var(--mui-palette-text-primary) !important'
    },

    '& > *': {
      paddingTop: 0,
      paddingBottom: 0
    },

    [theme.breakpoints.up(menuMobileBreakpoint)]: {
      display: 'none'
    }
  }),

  menuIcon: ({ menuVisible }) => ({
    display: menuVisible ? 'none' : 'block',
    fontSize: 42
  }),

  closeIcon: ({ menuVisible }) => ({
    display: !menuVisible ? 'none' : 'block',
    fontSize: 42
  }),

  headerMenuNavItems: ({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: 0,
    position: 'unset',
    flexDirection: 'column',
    width: '100%',
    margin: 'auto',
    gap: 'var(--grid-gap-quarter)',
    textTransform: 'uppercase',
    fontWeight: 700,

    [theme.breakpoints.up(menuMobileBreakpoint)]: {
      'height': '100%',
      'flexDirection': 'row',
      'width': 'auto',
      'marginRight': 'unset',

      '& > *:last-child a': {
        paddingRight: 0
      }
    }
  }),

  headerMenuNavItem: ({ theme }) => ({
    padding: 0,
    position: 'unset',

    [theme.breakpoints.up('md')]: {
      height: '100%'
    }
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['Header'] => [];

export const headerTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Header: {
      // @ts-expect-error
      height: 80,
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default headerTheme;
