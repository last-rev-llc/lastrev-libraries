import {
  TypographyStyle,
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['Blog'] = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Blog'] = {
  root: ({}) => ({}),

  featuredMedia: () => ({}),

  featuredMediaWrap: ({ theme }) => ({
    gridColumn: '1 / span 2',
    gridRow: '2',
    width: '100%',
    margin: theme.spacing(0, 0, 4),
    [theme.breakpoints.up('md')]: {
      gridRow: '4',
      gridColumn: '1 / span 6'
    },
    [theme.breakpoints.up('lg')]: {
      gridColumn: '1 / span 8'
    }
  }),

  pubDate: ({}) => ({}),

  summary: ({}) => ({}),

  author: ({}) => ({}),

  title: ({ theme }) => ({
    ...theme.typography.h5,

    [theme.breakpoints.up('md')]: {
      ...theme.typography.h3
    },

    [theme.breakpoints.up('lg')]: {
      ...theme.typography.h2
    }
  }),

  body: ({ theme }) => ({
    '& > [class*=Text-root] > *:not(:first-child)': {
      '&:not(:is(ul, ol, li))': {
        marginTop: '1em',
        marginBottom: '1em'
      },

      '&:is(ul, ol)': {
        marginTop: '-1em',
        marginBottom: '2em'
      },

      '&:is(span)': {
        // Image Wrappers
        marginTop: '2em !important',
        marginBottom: '2em !important'
      },

      '&[class*=MuiTypography-h]': {
        marginBottom: '.5em',
        marginTop: '1em'
      },

      '&[class*=-h1]': {
        ...theme.typography.h3
      },

      '&[class*=-h2]': {
        ...theme.typography.h4
      },

      '&[class*=-h3]': {
        ...theme.typography.h5
      },

      '&[class*=-h4]': {
        ...theme.typography.h5
      }
    },

    '& > [class*=Text-root] > *:first-child': {
      marginTop: '0'
    }
  }),

  blogCategories: ({}) => ({}),

  blogCategory: ({}) => ({}),

  tags: ({}) => ({}),

  tag: ({}) => ({}),

  relatedItems: ({}) => ({})
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (_theme: Theme): ComponentsVariants['Blog'] => [];

export const blogTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Blog: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default blogTheme;
