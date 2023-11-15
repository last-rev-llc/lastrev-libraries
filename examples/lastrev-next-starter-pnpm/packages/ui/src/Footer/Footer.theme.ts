import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Footer'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Footer'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
    padding: `var(--section-padding) 0 0`
  }),

  introContentsWrap: ({ theme }) => ({
    marginBottom: 'var(--section-padding)'
  }),

  // introContent: {},

  contentOuterGrid: {
    '& a': {
      color: 'inherit',
      alignItems: 'baseline'
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
    },

    [theme.breakpoints.up('lg')]: {
      gridColumn: 'content-start / span 3'
    }
  }),

  footerMenuNav: ({ theme, ownerState }) => ({
    gridRow: 2,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end'
  }),

  footerMenuNavItems: ({ theme, ownerState }) => ({
    display: 'inline-flex',
    padding: 0,
    position: 'unset',
    flexDirection: 'row',
    width: '100%',
    margin: 'auto',
    gap: 'var(--grid-gap)',
    flexWrap: 'wrap',
    alignItems: 'baseline',

    [theme.breakpoints.up('md')]: {
      flexWrap: 'unset',
      height: '100%'
    }
  }),

  footerMenuNavItem: ({ theme }) => ({
    padding: 0,
    position: 'unset',
    alignItems: 'flex-start',

    [theme.breakpoints.only('sm')]: {
      width: 'calc(50% - var(--grid-gap))'
    },

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
    'backgroundColor': theme.vars.palette.primary.main,
    'height': 30,
    'width': 30,
    '&:hover': {
      backgroundColor: theme.vars.palette.primary.main
    },
    '> svg': {
      fontSize: 30
    }
  }),

  legalSection: ({ theme }) => ({
    'display': 'contents', // take out of flow,
    '& *': {
      ...theme.typography.bodyXSmall
    }
  }),

  copyrightDisclaimerWrap: ({ theme }) => ({
    gridRow: 4,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',
    display: 'inline-flex',
    alignItems: 'flex-start',
    height: '100%',
    justifySelf: 'flex-start',

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'content-start',
      gridColumnEnd: 'content-half'
    }
  }),

  legalLinks: ({ theme }) => ({
    gridRow: 3,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',
    display: 'inline-flex',
    alignItems: 'flex-end',
    height: '100%',
    justifySelf: 'flex-start',
    padding: 0,
    flexDirection: 'column',

    a: {
      whiteSpace: 'nowrap'
    },

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    },

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'content-start',
      gridColumnEnd: 'content-half'
    }
  }),

  legalLink: {
    marginBottom: 0
  },

  legalLinkWrap: ({ theme }) => ({
    padding: 0,

    [theme.breakpoints.up('sm')]: {
      '&:not(:first-of-type)': {
        '&::before': {
          content: '"•"',
          display: 'block',
          padding: '0 var(--grid-gap-quarter)'
        }
      }
    }
  }),

  disclaimerWrap: ({ theme }) => ({
    gridRow: 5,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    [theme.breakpoints.up('md')]: {
      gridRow: '3 / 5',
      gridColumnStart: 'content-half',
      gridColumnEnd: 'content-end'
    }
  })
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
