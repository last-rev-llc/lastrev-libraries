import {
  TypographyStyle,
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
    padding: theme.spacing(0, 2),
    backgroundColor: !!elevation ? '#1e2145' : 'transparent',
    backgroundImage: 'unset'
  }),

  superNav: ({ theme, isElevated }) => ({
    'backgroundColor': '#1e2145',
    'padding': theme.spacing(0, 2),

    '& *': {
      color: theme.palette.common.white
    },

    [theme.breakpoints.down('md')]: {
      'margin': theme.spacing(0, -2),
      'transform': 'scaleY(1)',
      'transformOrigin': 'top',
      'transformStyle': 'flat',
      'maxHeight': '100%',
      'transition': 'transform 250ms ease, max-height 250ms ease, height 250ms ease',
      'animation': `collapse 250ms ease ${SUPERNAV_TIMEOUT} forwards`,
      '@keyframes collapse': {
        to: {
          transform: 'scaleY(0)',
          maxHeight: 0,
          height: 0
        }
      },

      ...(!!isElevated && {
        visibility: 'hidden',
        maxHeight: 0,
        height: 0
      })
    },

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, -5),

      ...(!!isElevated && {
        transform: 'scaleY(0)',
        maxHeight: 0,
        height: 0
      })
    },
    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(0, -3)
    }
  }),

  superNavContainer: ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
    paddingLeft: 0,
    paddingRight: 0,
    gap: theme.spacing(1),
    justifyContent: 'flex-start',

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5, 0),
      margin: '0 auto'
    },

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1, 0),
      justifyContent: 'center'
    }
  }),

  supernavIcon: () => ({
    margin: 0,
    height: 21.5
  }),

  supernavLink: ({ theme }) => ({
    'padding': theme.spacing(0.5, 2),
    ...theme.typography.body1,
    'textAlign': 'center',

    '&:hover': {
      color: '#fba62d'
    },

    '&:active': {
      '.MuiSvgIcon-root': {
        color: '#fba62d'
      }
    },

    [theme.breakpoints.up('md')]: {
      textAlign: 'left'
    },

    '& .MuiSvgIcon-root': {
      color: '#fba62d',
      height: theme.spacing(2),
      marginLeft: theme.spacing(1)
    }
  }),

  contentContainer: ({ theme, menuVisible, isElevated }) => ({
    height: '100%',
    minHeight: theme.spacing(4),
    maxHeight: theme.spacing(11.25),
    alignItems: 'stretch',
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
    gap: theme.spacing(0, 2),
    gridTemplateRows: !!isElevated ? `minmax(${theme.spacing(6.25)}, 1fr)` : `minmax(${theme.spacing(8.375)}, 1fr)`,

    ...(!!menuVisible && {
      maxHeight: '100%'
    }),

    [theme.breakpoints.up('lg')]: {
      gap: theme.spacing(3),
      maxHeight: 'unset',
      minHeight: 'unset'
    }
  }),

  logoRoot: ({ theme }) => ({
    gridColumn: '1/7',
    gridRow: 1,
    alignSelf: 'center',

    [theme.breakpoints.up('lg')]: {
      gridColumn: '1 / span 2'
    }
  }),

  logo: ({ isElevated }) => ({
    height: !!isElevated ? 20 : 40,
    margin: 0,

    svg: {
      fill: '#ffffff'
    }
  }),

  headerMenuCtas: ({ theme }) => ({
    gridColumn: '6/13',
    gridRow: 1,
    padding: 0,
    display: 'inline-flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    justifySelf: 'flex-end',

    [theme.breakpoints.up('md')]: {
      'padding': theme.spacing(1, 0),
      'gap': theme.spacing(2),
      '> [class$=Header-headerMenuCtaItem] ~ [class$=Header-headerMenuCtaItem]': {
        display: 'header'
      }
    },

    [theme.breakpoints.up('lg')]: {
      'gridColumn': '11 / -1',
      'width': '100%',
      'gap': theme.spacing(4),

      '[class$=Header-headerMenuCtaItem]': {
        display: 'header'
      }
    }
  }),

  headerMenuCtaItem: ({ theme }) => ({
    padding: 0,
    display: 'none',

    [theme.breakpoints.up('lg')]: {
      'width': 'fit-content',

      '[class$=MuiLink-root-Link-root]': {
        color: '#00fff2',
        ...theme.typography.body2
      }
    }
  }),

  headerMenuNav: ({ theme, menuVisible }) => ({
    justifyItems: 'center',
    justifyContent: 'flex-end',
    position: 'unset',
    gridColumn: '1/-1',
    gridRow: 2,
    height: '100%',
    maxHeight: '100vh',
    overflow: 'auto',

    ...(!menuVisible && {
      maxHeight: 0
    }),

    marginLeft: theme.spacing(-2),
    marginRight: theme.spacing(-2),

    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(-5),
      marginRight: theme.spacing(-5)
    },

    [theme.breakpoints.up('lg')]: {
      height: 'auto',
      overflow: 'unset',
      marginLeft: 0,
      marginRight: 0,
      maxHeight: '100%',
      gridColumn: '3 / -3',
      gridRow: 1,
      display: 'inline-flex'
    }
  }),

  headerMenuNavItems: ({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: 0,
    position: 'unset',
    flexDirection: 'column',
    width: '100%',
    borderBottom: `solid 1px ${theme.palette.secondary.main}`,

    [theme.breakpoints.up('lg')]: {
      borderBottom: 'none',
      height: '100%',
      flexDirection: 'row',
      width: 'auto'
    }
  }),

  headerMenuNavItem: ({ theme }) => ({
    padding: 0,
    position: 'unset',

    [theme.breakpoints.up('lg')]: {
      height: '100%'
    }
  }),

  headerMenuMobileCtas: ({ theme }) => ({
    display: 'inline-flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(2),

    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  }),

  headerMenuMobileCtaItem: ({ theme }) => ({
    'width': 'fit-content',
    'padding': 0,
    '[class$=MuiLink-root-Link-root]': {
      color: '#00fff2',
      ...theme.typography.body2
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
