import {
  TypographyStyle,
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['Footer'] = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Footer'] = {
  root: ({ theme }) => ({
    padding: theme.spacing(4, 2)
  }),

  footerContent: ({ theme }) => ({
    // backgroundImage: `url('https://images.ctfassets.net/e4vn8tcbbhts/7hTKCRbU98AKt7nKX5vGnd/245e49383d82f8074e32f768e7856dd6/footer-background.svg')`,
    // backgroundSize: 'cover',
    // backgroundPosition: 'top center',
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(20)
  }),

  container: ({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(4)
  }),

  mainSection: ({ theme }) => ({
    gridColumn: '1 / span 2',

    [theme.breakpoints.up('md')]: {
      gridColumn: '1 / span 6',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gap: theme.spacing(2.5, 3)
    },

    [theme.breakpoints.up('lg')]: {
      gridColumn: '1 / span 4',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: theme.spacing(3.5, 3)
    }
  }),

  logoUrl: () => ({}),

  logo: ({}) => ({
    margin: 'initial',
    width: 161,
    height: 'auto',

    svg: {
      fill: '#fba62d'
    }
  }),

  disclaimer: () => ({}),

  socialLinks: () => ({}),

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

  navigationItems: ({ theme }) => ({
    gridColumn: '1 / 2',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),

    [theme.breakpoints.up('md')]: {
      gridColumn: '2 / -1',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)'
    }
  }),

  navigationItem: () => ({}),

  introContents: () => ({}),

  introContent: () => ({}),

  legalSection: () => ({}),

  copyrightDisclaimer: ({ theme }) => ({
    'color': theme.palette.primary.main,
    '*': {
      ...theme.typography.body2
    }
  }),

  legalLinks: () => ({}),

  legalLink: () => ({})
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
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
