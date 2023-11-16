import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Blog'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Blog'] = {
  root: ({ theme }) => ({
    // 'paddingTop': 'var(--section-padding)',
    // 'paddingBottom': 'var(--section-padding)',
    '& > :is([class*=Collection-root],[class*=Section-root],[class*=Block-root],[class*=Carousel-root])': {
      marginTop: 'var(--section-padding)',
      marginBottom: 'var(--section-padding)'
    },

    '& > :is([class*=Form-root])': {
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(7)
    },
    '& > :is([class*=Text-root])': {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5)
    }
  }),

  contentOuterGrid: ({ theme }) => ({
    'containerType': 'inline-size',
    'padding': theme.spacing(8, 0),
    '> *': {
      // gridColumnStart: 'content-start',
      // gridColumnEnd: 'content-end'
      // [theme.breakpoints.up('md')]: {
      //   gridColumnStart: 'four-start',
      //   gridColumnEnd: 'content-end'
      // },
      // [theme.breakpoints.up('lg')]: {
      //   gridColumnStart: 'four-start',
      //   gridColumnEnd: 'content-end'
      // }
    }
  }),

  headerWrap: ({ theme }) => ({
    maxWidth: '680px'
    // gridColumnStart: 'content-start',
    // gridColumnEnd: 'content-end',
    // [theme.breakpoints.up('lg')]: {
    //   gridColumnStart: 'three-start',
    //   gridColumnEnd: 'ten-end'
    // }
  }),

  // breadcrumbsWrap: {
  //   gridColumnStart: 'content-start',
  //   gridColumnEnd: 'content-end'
  // },
  sideWrap: ({ theme }) => ({
    position: 'sticky',
    top: 208,

    gridRow: '1/4',
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',
    [theme.breakpoints.up('sm')]: {
      gridColumnStart: 'content-start',
      gridColumnEnd: 'three-end'
    }
  }),

  contentWrap: ({ theme }) => ({
    'display': 'contents',
    '> *': {
      gridColumnStart: 'content-start',
      gridColumnEnd: 'content-end',
      [theme.breakpoints.up('md')]: {
        gridColumnStart: 'four-start',
        gridColumnEnd: 'content-end'
      },
      [theme.breakpoints.up('lg')]: {
        gridColumnStart: 'four-start',
        gridColumnEnd: 'content-end'
      }
    }
  }),
  featuredMediaWrap: ({ theme }) => ({
    maxWidth: '680px'
  }),

  featuredMedia: {
    width: '100%',
    aspectRatio: '16/10',
    maxWidth: '680px'
  },

  // pubDate: {},

  shareLinksWrap: ({ theme }) => ({
    maxWidth: '680px'
    // gridColumnStart: 'content-start',
    // gridColumnEnd: 'content-end',
    // [theme.breakpoints.up('md')]: {
    //   gridColumnStart: 'two-start',
    //   gridColumnEnd: 'seven-end'
    // },
    // [theme.breakpoints.up('lg')]: {
    //   gridColumnStart: 'content-quarter',
    //   gridColumnEnd: 'content-three-quarter'
    // }
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

  // title: {},

  body: ({ theme }) => ({
    '& > *:not(div)': {
      maxWidth: '680px',
      marginBottom: '0!important',
      gridColumnStart: 'content-start',
      gridColumnEnd: 'content-end',

      [theme.breakpoints.up('md')]: {
        gridColumnStart: 'four-start',
        gridColumnEnd: 'content-end'
      },

      [theme.breakpoints.up('lg')]: {
        gridColumnStart: 'four-start',
        gridColumnEnd: 'content-end'
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
  authorWrap: ({ theme }) => ({
    gridColumnStart: 'full-start',
    gridColumnEnd: 'full-end',
    padding: theme.spacing(7, 0),
    background: theme.vars.palette.background.lightThree
  }),
  relatedItemsWrap: {
    '& > *': {
      gridColumn: 'full-start / full-end'
    }
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
