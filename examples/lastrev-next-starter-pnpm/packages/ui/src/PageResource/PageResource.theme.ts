import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['PageResource'] = {};

const styleOverrides: ComponentsOverrides<Theme>['PageResource'] = {
  // root: {},

  contentOuterGrid: {
    'containerType': 'inline-size',
    '> *': {
      gridColumn: 'full-start / full-end'
    }
  },

  headerWrap: ({ theme }) => ({
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    [theme.breakpoints.up('lg')]: {
      gridColumnStart: 'three-start',
      gridColumnEnd: 'ten-end'
    }
  }),

  breadcrumbsWrap: {
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end'
  },

  contentWrap: {
    display: 'contents'
  },

  featuredMediaWrap: ({ theme }) => ({
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    [theme.breakpoints.up('lg')]: {
      gridColumnStart: 'three-start',
      gridColumnEnd: 'ten-end'
    }
  }),

  // featuredMedia: {},

  // pubDate: {},

  shareLinksWrap: ({ theme }) => ({
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'two-start',
      gridColumnEnd: 'seven-end'
    },

    [theme.breakpoints.up('lg')]: {
      gridColumnStart: 'content-quarter',
      gridColumnEnd: 'content-three-quarter'
    }
  }),

  shareLinks: ({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--grid-gap)'
  }),

  shareLink: ({ theme }) => ({
    'gap': 'var(--grid-gap)',

    '& svg': {
      width: 'var(--grid-gap)',
      height: 'var(--grid-gap)'
    },

    '& .MuiTypography-root': {
      display: 'none'
    },

    [theme.containerBreakpoints.up('lg')]: {
      'gap': 'var(--grid-gap)',
      '& .MuiTypography-root': {
        ...theme.typography.bodySmall,
        display: 'block'
      }
    }
  }),

  authorImageWrap: ({ theme }) => ({
    gridRow: 1,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-quarter',

    [theme.breakpoints.up('md')]: {
      gridRow: '1/ span 3',
      gridColumnStart: 'two-start',
      gridColumnEnd: 'two-end'
    },

    [theme.breakpoints.up('lg')]: {
      gridRow: '1/ span 3',
      gridColumnStart: 'four-start',
      gridColumnEnd: 'four-end'
    }
  }),

  authorName: ({ theme }) => ({
    gridRow: 1,
    alignSelf: 'center',
    marginBottom: 0,

    gridColumnStart: 'content-quarter',
    gridColumnEnd: 'content-end',

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'three-start',
      gridColumnEnd: 'seven-end',
      alignSelf: 'self-end'
    },

    [theme.breakpoints.up('lg')]: {
      gridColumnStart: 'five-start',
      gridColumnEnd: 'content-three-quarter',
      alignSelf: 'self-end'
    }
  }),

  authorSummaryWrap: ({ theme }) => ({
    display: 'flex',
    alignSelf: 'center',
    marginBottom: 0,

    gridRow: 2,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'three-start',
      gridColumnEnd: 'seven-end'
    },

    [theme.breakpoints.up('lg')]: {
      gridColumnStart: 'five-start',
      gridColumnEnd: 'content-three-quarter'
    }
  }),

  authorSocialLinks: ({ theme }) => ({
    alignSelf: 'self-start',

    gridRow: 3,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'three-start',
      gridColumnEnd: 'seven-end'
    },

    [theme.breakpoints.up('lg')]: {
      gridColumnStart: 'five-start',
      gridColumnEnd: 'content-three-quarter'
    }
  }),

  // title: {},

  body: ({ theme }) => ({
    '& > *:not(div)': {
      gridColumnStart: 'content-start',
      gridColumnEnd: 'content-end',

      [theme.breakpoints.up('md')]: {
        gridColumnStart: 'two-start',
        gridColumnEnd: 'seven-end'
      },

      [theme.breakpoints.up('lg')]: {
        gridColumnStart: 'content-quarter',
        gridColumnEnd: 'content-three-quarter'
      }
    },

    '& > div': {
      gridColumnStart: 'full-start',
      gridColumnEnd: 'full-end'
    }
  }),

  // pageresourceCategories: ({}) => ({}),

  // pageresourceCategory: ({}) => ({}),

  // tags: ({}) => ({}),

  // tag: ({}) => ({}),

  relatedItemsWrap: {
    '& > *': {
      gridColumn: 'full-start / full-end'
    }
  }

  // relatedItems: ({}) => ({})
};

const createVariants = (_theme: Theme): ComponentsVariants['PageResource'] => [];

export const pageresourceTheme = (theme: Theme): ThemeOptions => ({
  components: {
    PageResource: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default pageresourceTheme;
