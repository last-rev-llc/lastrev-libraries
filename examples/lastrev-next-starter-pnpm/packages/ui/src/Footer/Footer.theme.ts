import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Footer'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Footer'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
    position: 'relative',
    padding: theme.spacing(10, 0)
  }),

  introContentsWrap: ({ theme }) => ({
    // marginBottom: 'var(--section-padding)'
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
    maxWidth: 120,
    height: 'auto',
    display: 'block',

    [theme.breakpoints.up('md')]: {
      gridColumn: 'content-start / span 2'
    }
  }),

  footerMenuNav: ({ theme, ownerState }) => ({
    gridRow: 2,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end'
  }),

  footerMenuNavItems: ({ theme, ownerState }) => ({
    display: 'inline-flex',
    alignItems: 'flex-start',
    padding: 0,
    position: 'unset',
    flexDirection: 'row',
    width: '100%',
    margin: 'auto',
    gap: theme.spacing(5),

    [theme.breakpoints.up('sm')]: {
      height: '100%',
      width: 'auto'
    }
  }),

  footerMenuNavItem: ({ theme }) => ({
    padding: 0,
    position: 'unset',
    alignItems: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      height: '100%'
    }
  }),

  socialLinks: ({ theme }) => ({
    gridRow: 4,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    display: 'inline-flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    justifySelf: 'center',
    gap: 'var(--grid-gap)',

    [theme.breakpoints.up('sm')]: {
      gridColumnStart: 'auto',
      gridColumnEnd: 'content-end',
      justifyContent: 'flex-end',
      width: '100%',
      gridRow: 4
    }
  }),

  socialLink: ({ theme }) => ({
    'backgroundColor': theme.vars.palette.primary.main,
    'height': 30,
    'width': 30,
    '&:hover': {
      backgroundColor: theme.vars.palette.primary.main
    }
  }),

  legalSection: ({ theme }) => ({
    'display': 'contents', // take out of flow,

    '& .MuiTypography-root': {
      ...theme.typography.bodySmall,
      margin: 0
    }
  }),
  copyrightDivider: ({ theme }) => ({
    gridColumn: 'content-start/content-end',
    gridRow: 3
  }),

  copyrightDisclaimerWrap: ({ theme }) => ({
    gridRow: 5,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      gridRow: 4,
      gridColumnStart: 'content-start',
      gridColumnEnd: 'auto'
    }
  }),

  legalLinks: ({ theme }) => ({
    gridRow: 4,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',
    display: 'inline-flex',
    alignItems: 'center',
    height: '100%',
    gap: 'var(--grid-gap)',

    [theme.breakpoints.up('sm')]: {
      gridColumn: 'content-start / content-end',
      justifySelf: 'center',
      gridRow: 4
    }
  }),

  disclaimerWrap: ({ theme }) => ({
    'gridRow': 6,
    'gridColumnStart': 'full-start',
    'gridColumnEnd': 'full-end',

    [theme.breakpoints.up('sm')]: {
      gridRow: 5,
      marginTop: theme.spacing(5)
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
