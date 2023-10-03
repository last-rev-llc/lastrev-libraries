import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

const defaultProps: ComponentsProps['Blog'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Blog'] = {
  root: ({}) => ({}),

  contentOuterGrid: ({ theme }) => ({
    '> *': {
      gridColumnStart: 'auto'
    }
  }),

  headerWrap: {
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end'
  },

  contentWrap: {
    display: 'contents'
  },

  // featuredMedia: : {},

  featuredMediaWrap: {
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end'
  },

  // pubDate: ({}) => ({}),

  shareLinksWrap: {
    gridColumnStart: 'three-start',
    gridColumnEnd: 'ten-end'
  },

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

    [theme.breakpoints.up('md')]: {
      'gap': theme.spacing(1),
      '& .MuiTypography-root': {
        ...theme.typography.bodySmall,
        display: 'block'
      }
    }
  }),

  authorWrap: {
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end'
  },

  // author: ({}) => ({}),

  title: ({ theme }) => ({
    ...theme.typography.h5,

    [theme.breakpoints.up('md')]: {
      ...theme.typography.h3
    },

    [theme.breakpoints.up('lg')]: {
      ...theme.typography.h2
    }
  }),

  body: {
    '& > *:not(div)': {
      gridColumnStart: 'three-start',
      gridColumnEnd: 'ten-end',
      backgroundColor: '#eeeeee'
    },

    '& > div': {
      gridColumnStart: 'full-start',
      gridColumnEnd: 'full-end',
      backgroundColor: '#cccccc'
    }
  },

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
