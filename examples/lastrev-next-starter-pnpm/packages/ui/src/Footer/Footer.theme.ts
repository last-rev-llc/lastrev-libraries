import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Footer'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Footer'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
    padding: `var(--section-padding) 0 var(--section-padding)`
  }),

  introContentsWrap: ({ theme }) => ({
    marginBottom: 'var(--section-padding)'
  }),

  contentOuterGrid: {
    '& a': {
      alignItems: 'baseline'
    }
  },

  logoRoot: ({ theme }) => ({
    gridColumnStart: 'start',
    gridColumnEnd: 'half',
    gridRow: 1,
    alignSelf: 'center',
    width: '100%',
    height: 'auto',
    display: 'block',

    [theme.breakpoints.up('md')]: {
      gridColumnEnd: 'quarter'
    }
  }),

  footerMenuNav: {
    gridRow: 2,
    gridColumnStart: 'start',
    gridColumnEnd: 'end'
  },

  footerMenuNavItems: ({ theme }) => ({
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
    gridColumnStart: 'start',
    gridColumnEnd: 'end',

    display: 'inline-flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    justifySelf: 'center',
    gap: 'var(--grid-gap)',

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'three-quarter',
      justifyContent: 'flex-end',
      justifySelf: 'flex-end',
      width: '100%'
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
    gridColumnStart: 'start',
    gridColumnEnd: 'end',
    display: 'inline-flex',
    alignItems: 'flex-start',
    height: '100%',
    justifySelf: 'flex-start',

    [theme.breakpoints.up('md')]: {
      gridColumnEnd: 'half'
    }
  }),

  legalLinks: ({ theme }) => ({
    gridRow: 3,
    gridColumnStart: 'start',
    gridColumnEnd: 'end',
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
      gridColumnEnd: 'half'
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
    gridColumnStart: 'start',
    gridColumnEnd: 'end',

    [theme.breakpoints.up('md')]: {
      gridRow: '3 / 5',
      gridColumnStart: 'half'
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
