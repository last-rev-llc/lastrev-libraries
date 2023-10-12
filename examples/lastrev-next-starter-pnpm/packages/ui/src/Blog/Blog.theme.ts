import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['Blog'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Blog'] = {
  // root: {},

  contentOuterGrid: {
    'containerType': 'inline-size',
    '> *': {
      gridColumnStart: 'auto'
    }
  },

  headerWrap: ({ theme }) => ({
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'content-quarter',
      gridColumnEnd: 'content-three-quarter'
    },

    [theme.breakpoints.up('lg')]: {
      gridColumnStart: 'two-start',
      gridColumnEnd: 'eleven-end'
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

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'content-quarter',
      gridColumnEnd: 'content-three-quarter'
    },

    [theme.breakpoints.up('lg')]: {
      gridColumnStart: 'two-start',
      gridColumnEnd: 'eleven-end'
    }
  }),

  // featuredMedia: {},

  // pubDate: {},

  shareLinksWrap: ({ theme }) => ({
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'content-quarter',
      gridColumnEnd: 'content-three-quarter'
    }
  }),

  shareLinks: ({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(1)
  }),

  shareLink: ({ theme }) => ({
    'gap': theme.spacing(1),

    '& svg': {
      width: theme.spacing(2),
      height: theme.spacing(2)
    },

    '& .MuiTypography-root': {
      display: 'none'
    },

    [theme.containerBreakpoints.up('md')]: {
      'gap': theme.spacing(1),
      '& .MuiTypography-root': {
        ...theme.typography.bodySmall,
        display: 'block'
      }
    }
  }),

  authorImageWrap: ({ theme }) => ({
    gridRow: '1/ span 3',

    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-quarter',

    [theme.breakpoints.up('lg')]: {
      gridColumnStart: 'four-start',
      gridColumnEnd: 'four-end'
    }
  }),

  authorName: ({ theme }) => ({
    gridRow: 1,
    alignSelf: 'self-end',
    marginBottom: 0,

    gridColumnStart: 'content-quarter',
    gridColumnEnd: 'content-end',

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'content-quarter',
      gridColumnEnd: 'content-three-quarter'
    },

    [theme.breakpoints.up('lg')]: {
      gridColumnStart: 'five-start',
      gridColumnEnd: 'content-three-quarter'
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
      gridColumnStart: 'content-quarter',
      gridColumnEnd: 'content-three-quarter'
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
      gridColumnStart: 'content-quarter',
      gridColumnEnd: 'content-three-quarter'
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
        gridColumnStart: 'three-start',
        gridColumnEnd: 'ten-end'
      },

      [theme.breakpoints.up('lg')]: {
        gridColumnStart: 'five-start',
        gridColumnEnd: 'content-three-quarter'
      }
    },

    '& > div': {
      gridColumnStart: 'full-start',
      gridColumnEnd: 'full-end'
    }
  }),

  // blogCategories: ({}) => ({}),

  // blogCategory: ({}) => ({}),

  // tags: ({}) => ({}),

  // tag: ({}) => ({}),

  relatedItemsWrap: {
    gridColumnStart: 'full-start',
    gridColumnEnd: 'full-end'
  }

  // relatedItems: ({}) => ({})
};

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
