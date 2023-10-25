import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['Quote'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Quote'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    containerType: 'inline-size',
    padding: `var(--section-padding) 0`
  }),

  // contentGrid: : {},

  logo: ({ theme }) => ({
    gridRow: 1,
    gridColumn: 'content-quarter/content-three-quarter',

    [theme.containerBreakpoints.up('sm')]: {
      gridColumn: 'four-start/five-end'
    },

    [theme.containerBreakpoints.up('md')]: {
      gridColumn: 'six-start/seven-end'
    },

    [theme.containerBreakpoints.up('lg')]: {
      gridColumn: 'six-start/seven-end'
    }
  }),

  quoteText: ({ theme }) => ({
    gridRow: 2,
    gridColumn: 'content-start/content-end',
    textAlign: 'center',
    ...theme.typography.display4,

    [theme.containerBreakpoints.up('sm')]: {
      gridColumn: 'content-quarter/content-three-quarter'
    }
  }),

  // quoteSymbol: : {},

  authorRoot: {
    display: 'contents'
  },

  image: ({ theme }) => ({
    gridRow: '3/5',
    gridColumn: 'content-start/one-end',

    [theme.containerBreakpoints.up('md')]: {
      gridColumn: 'content-quarter/content-half'
    },

    [theme.containerBreakpoints.up('lg')]: {
      gridColumn: 'six-start/content-half'
    }
  }),

  authorName: ({ theme }) => ({
    gridRow: 3,
    gridColumn: 'two-start/content-end',
    lineHeight: 1,
    alignSelf: 'flex-end',

    [theme.containerBreakpoints.up('md')]: {
      gridColumn: 'content-half/content-end'
    }
  }),

  authorTitle: ({ theme }) => ({
    gridRow: 4,
    gridColumn: 'two-start/content-end',
    fontStyle: 'italic',
    lineHeight: 1,

    [theme.containerBreakpoints.up('md')]: {
      gridColumn: 'content-half/content-end'
    }
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['Quote'] => [];

export const quoteTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Quote: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default quoteTheme;
