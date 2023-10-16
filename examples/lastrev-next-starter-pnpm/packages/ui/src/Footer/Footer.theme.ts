import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['Footer'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Footer'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    padding: theme.spacing(4, 0, 0, 0) // Update
  }),

  introContentsWrap: ({ theme }) => ({
    marginBottom: theme.spacing(10)
  }),

  // introContent: {},

  contentOuterGrid: {
    '& a': {
      whiteSpace: 'nowrap',
      color: 'inherit'
    }
  },

  logoRoot: ({ theme }) => ({
    gridColumn: 'content-start / content-half',
    gridRow: 1,
    alignSelf: 'center',
    width: '100%',
    height: 'auto',
    display: 'block',

    [theme.breakpoints.up('md')]: {
      gridColumn: 'content-start / span 2'
    }
  }),

  // logo: {
  //   width: 'auto',
  //   height: 40,
  //   margin: 0,

  //   svg: {
  //     fill: '#ffffff'
  //   }
  // },

  footerMenuNav: ({ theme, ownerState }) => ({
    gridRow: 2,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end'
  }),

  footerMenuNavItems: ({ theme, ownerState }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: 0,
    position: 'unset',
    flexDirection: 'row',
    width: '100%',
    margin: 'auto',
    gap: 'var(--grid-gap)',

    [theme.breakpoints.up('sm')]: {
      height: '100%',
      width: 'auto'
    }
  }),

  footerMenuNavItem: ({ theme }) => ({
    padding: 0,
    position: 'unset',

    [theme.breakpoints.up('sm')]: {
      height: '100%'
    }
  }),

  socialLinks: ({ theme }) => ({
    gridRow: 3,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    display: 'inline-flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    justifySelf: 'center',
    gap: 'var(--grid-gap)',

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'content-three-quarter',
      gridColumnEnd: 'content-end',
      justifyContent: 'flex-end',
      justifySelf: 'flex-end',
      width: '100%',
      gridRow: 3
    }
  }),

  socialLink: ({ theme }) => ({
    'backgroundColor': theme.palette.primary.main,
    'height': 30,
    'width': 30,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    },
    '> svg': {
      fontSize: 30
    }
  }),

  legalSection: {
    display: 'contents' // take out of flow,
  },

  copyrightDisclaimerWrap: ({ theme }) => ({
    gridRow: 5,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    [theme.breakpoints.up('md')]: {
      gridRow: 3,
      gridColumnStart: 'content-start',
      gridColumnEnd: 'content-quarter'
    }
  }),

  legalLinks: ({ theme }) => ({
    gridRow: 4,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',
    display: 'inline-flex',
    alignItems: 'center',
    height: '100%',
    justifySelf: 'center',
    gap: 'var(--grid-gap)',

    [theme.breakpoints.up('md')]: {
      gridColumn: 'content-quarter / content-three-quarter',
      gridRow: 3
    }
  }),

  disclaimerWrap: ({ theme }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState: { backgroundColor: 'black' }, theme }),
    'gridRow': 6,
    'gridColumnStart': 'full-start',
    'gridColumnEnd': 'full-end',
    'padding': 'var(--grid-gap) 0',

    [theme.breakpoints.up('md')]: {
      gridRow: 4
    },

    '& [class*=disclaimer] > *': {
      gridColumnStart: 'content-start',
      gridColumnEnd: 'content-end'
    }
  })

  // legalLink: : {}
};

const createVariants = (_theme: Theme): ComponentsVariants['Footer'] => [];

export const footerTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Footer: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default footerTheme;
