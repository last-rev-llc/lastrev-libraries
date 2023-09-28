import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

export const defaultProps: ComponentsProps['Footer'] = {};

export const styleOverrides: ComponentsOverrides<Theme>['Footer'] = {
  root: ({ theme }) => ({
    padding: theme.spacing(4, 2) // Update
  }),

  introContentsWrap: () => ({}),

  introContent: () => ({}),

  contentOuterGrid: () => ({
    '& > *': {
      border: 'solid 2px blue'
    }
  }),

  logoRoot: ({ theme }) => ({
    gridColumn: 'two-start / three-end',
    gridRow: 1,
    alignSelf: 'center',

    [theme.breakpoints.up('sm')]: {
      gridColumn: 'three-start / six-end'
    },

    [theme.breakpoints.up('md')]: {
      gridColumn: 'content-start / span 2',
      alignSelf: 'center'
    }
  }),

  logo: () => ({
    width: 'auto',
    height: 40,
    margin: 0,

    svg: {
      fill: '#ffffff'
    }
  }),

  footerMenuNav: ({ theme, ownerState }) => ({
    gridRow: 2,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    [theme.breakpoints.up('md')]: {
      gridRow: 1,
      gridColumnStart: 'three-start',
      gridColumnEnd: ownerState?.hasSocialLinks ? 'ten-end' : 'content-end'
    }
  }),

  footerMenuNavItems: ({ theme, ownerState }) => ({
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

  footerMenuNavItem: ({ theme }) => ({
    padding: 0,
    position: 'unset',

    [theme.breakpoints.up('md')]: {
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
    gap: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'eleven-start',
      gridColumnEnd: 'content-end',
      justifyContent: 'flex-end',
      justifySelf: 'flex-end',
      width: '100%',
      gap: theme.spacing(4),
      gridRow: 1
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

  disclaimer: ({ theme }) => ({
    gridRow: 4,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    [theme.breakpoints.up('md')]: {
      gridRow: 2,
      gridColumnStart: 'content-start',
      gridColumnEnd: 'content-half'
    }
  }),

  legalSection: () => ({
    display: 'contents' // take out of flow
  }),

  copyrightDisclaimer: ({ theme }) => ({
    gridRow: 5,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    [theme.breakpoints.up('md')]: {
      gridRow: 2,
      gridColumnStart: 'content-half',
      gridColumnEnd: 'content-end'
    }
  }),

  legalLinks: ({ theme }) => ({
    gridRow: 6,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',
    display: 'inline-flex',
    alignItems: 'center',
    height: '100%',
    justifySelf: 'flex-end',
    gap: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      gridColumn: 'content-start / content-end',
      gridRow: 3,
      marginLeft: 'auto'
    }
  }),

  legalLink: () => ({})
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
