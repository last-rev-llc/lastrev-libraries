import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const SUPERNAV_TIMEOUT = '15s';

export const defaultProps: ComponentsProps['Header'] = {};

export const styleOverrides: ComponentsOverrides<Theme>['Header'] = {
  root: ({ theme, elevation }) => ({
    '& *': {
      whiteSpace: 'nowrap'
    }
  }),

  contentOuterGrid: ({ theme, elevation }) => ({
    '& > *': {
      border: 'solid 2px blue'
    }
  }),

  logoRoot: ({ theme }) => ({
    gridColumn: 'content-start / span 2',
    gridRow: 1,
    alignSelf: 'center'
  }),

  logo: ({ isElevated }) => ({
    width: 'auto',
    height: !!isElevated ? 20 : 40,
    margin: 0,

    svg: {
      fill: '#ffffff'
    }
  }),

  headerMenuCtas: ({ theme }) => ({
    padding: 0,
    display: 'inline-flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    justifySelf: 'flex-end',
    gridRow: 3,

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'eleven-start',
      gridColumnEnd: 'content-end',
      justifyContent: 'flex-end',
      width: '100%',
      gap: theme.spacing(4),
      gridRow: 1
    }
  }),

  headerMobileNavWrap: ({ theme, menuVisible }) => ({
    gridRow: 2,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',
    maxHeight: '100vh',
    overflow: 'hidden',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    transition: 'max-height 500ms ease',
    borderBottom: `solid 2px ${theme.palette.primary.main}`,
    paddingBottom: theme.spacing(2),
    gap: theme.spacing(2),

    [theme.breakpoints.down('md')]: {
      ...(!menuVisible && {
        maxHeight: 0,
        paddingBottom: 0,
        borderBottomColor: 'transparent'
      })
    },

    [theme.breakpoints.up('md')]: {
      display: 'contents'
    }
  }),

  headerMenuCtaItem: ({ theme }) => ({
    padding: 0,
    justifyContent: 'center'
  }),

  headerMenuNav: ({ theme, ownerState }) => ({
    justifyItems: 'center',
    justifyContent: 'flex-end',
    position: 'unset',
    display: 'inline-flex',

    [theme.breakpoints.up('md')]: {
      height: 'auto',
      overflow: 'unset',
      maxHeight: '100%',
      gridRow: 1,
      gridColumnStart: 'three-start',
      gridColumnEnd: ownerState.hasCtaItems ? 'ten-end' : 'content-end'
    }
  }),

  iconButtonWrap: ({ theme }) => ({
    padding: 0,
    display: 'flex',
    gridColumnStart: 'content-half',
    gridColumnEnd: 'content-end',
    gridRow: 1,
    justifyContent: 'flex-end',

    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }),

  iconButton: () => ({}),

  menuIcon: ({ menuVisible }) => ({
    display: menuVisible ? 'none' : 'block',
    fontSize: 42
  }),

  closeIcon: ({ menuVisible }) => ({
    display: !menuVisible ? 'none' : 'block',
    fontSize: 42
  }),

  headerMenuNavItems: ({ theme, ownerState }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: 0,
    position: 'unset',
    flexDirection: 'column',
    width: '100%',
    margin: 'auto',

    [theme.breakpoints.up('md')]: {
      height: '100%',
      flexDirection: 'row',
      width: 'auto'
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
