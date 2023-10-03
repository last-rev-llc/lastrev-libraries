import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['Quote'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Quote'] = {
  root: {},

  contentGrid: () => ({}),

  logo: ({ theme }) => ({
    gridRow: 1,
    gridColumn: 'two-start/three-end',

    [theme.breakpoints.up('sm')]: {
      gridColumn: 'four-start/five-end'
    },

    [theme.breakpoints.up('md')]: {
      gridColumn: 'six-start/seven-end'
    }
  }),

  quoteText: ({ theme }) => ({
    gridRow: 2,
    gridColumn: 'content-start/content-end',
    textAlign: 'center',
    ...theme.typography.display4,

    [theme.breakpoints.up('sm')]: {
      gridColumnStart: 'two-start/eight-end'
    },

    [theme.breakpoints.up('md')]: {
      gridColumn: 'two-start/eleven-end'
    }
  }),

  quoteSymbol: () => ({}),

  authorRoot: () => ({
    display: 'contents'
  }),

  image: ({ theme }) => ({
    gridRow: '3/5',
    gridColumn: 'content-start/one-end',

    [theme.breakpoints.up('md')]: {
      gridColumn: 'three-start/four-end'
    }
  }),

  authorName: ({ theme }) => ({
    gridRow: 3,
    gridColumn: 'two-start/content-end',
    lineHeight: 1,

    [theme.breakpoints.up('md')]: {
      gridColumn: 'five-start/nine-end'
    }
  }),

  authorTitle: ({ theme }) => ({
    gridRow: 4,
    gridColumn: 'two-start/content-end',
    fontStyle: 'italic',
    lineHeight: 1,

    [theme.breakpoints.up('md')]: {
      gridColumn: 'five-start/nine-end'
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
