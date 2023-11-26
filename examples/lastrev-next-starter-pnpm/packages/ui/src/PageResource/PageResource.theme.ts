import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['PageResource'] = {};

const styleOverrides: ComponentsOverrides<Theme>['PageResource'] = {
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
    'padding': theme.spacing(4, 0),
    '> *': {
      // gridColumnStart: 'content-start',
      // gridColumnEnd: 'content-end'
      // [theme.breakpoints.up('md')]: {
      //   gridColumnStart: 'three-start',
      //   gridColumnEnd: 'ten-end'
      // },
      // [theme.breakpoints.up('lg')]: {
      //   gridColumnStart: 'three-start',
      //   gridColumnEnd: 'ten-end'
      // }
    }
  }),

  headerWrap: ({ theme }) => ({
    // textAlign: 'center'
    // maxWidth: '680px'
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

  contentWrap: ({ theme }) => ({
    'display': 'contents',
    '> *': {
      gridColumnStart: 'content-start',
      gridColumnEnd: 'content-end'
      // [theme.breakpoints.up('md')]: {
      //   gridColumnStart: 'three-start',
      //   gridColumnEnd: 'ten-end'
      // },
      // [theme.breakpoints.up('lg')]: {
      //   gridColumnStart: 'three-start',
      //   gridColumnEnd: 'ten-end'
      // }
    }
  }),
  featuredMediaWrap: ({ theme }) => ({
    // maxWidth: '680px'
  }),

  featuredMedia: {
    width: '100%',
    aspectRatio: '16/10'
    // maxWidth: '680px'
  },

  // pubDate: {},

  shareLinksWrap: ({ theme }) => ({
    // maxWidth: '680px'
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
    justifyContent: 'flex-end',
    gap: 'var(--grid-gap)'
  }),

  shareLink: ({ theme }) => ({
    'width': 'unset',
    'padding': 0,
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
      // maxWidth: '680px',
      marginBottom: '0!important',
      gridColumnStart: 'content-start',
      gridColumnEnd: 'content-end'
    },

    '& > div': {
      gridColumnStart: 'content-start',
      gridColumnEnd: 'content-end'
      // '&:is([class*=Text-root])': {
      // gridColumnStart: 'three-start',
      // gridColumnEnd: 'ten-end'
      // }
    }
  }),

  // pageresourceCategories: ({}) => ({}),

  // pageresourceCategory: ({}) => ({}),

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

const createVariants = (theme: Theme): ComponentsVariants['PageResource'] => [
  {
    props: {
      variant: 'Guide'
    },
    style: {
      '[class*=contentWrap]': {
        'display': 'contents',
        '> *': {
          gridColumnStart: 'content-start',
          gridColumnEnd: 'content-end',
          [theme.breakpoints.up('md')]: {
            gridColumnStart: 'three-start',
            gridColumnEnd: 'ten-end'
          },
          [theme.breakpoints.up('lg')]: {
            gridColumnStart: 'three-start',
            gridColumnEnd: 'ten-end'
          }
        }
      },

      // title: {},

      '[class*=body]': {
        '& > *:not(div)': {
          // maxWidth: '680px',
          marginBottom: '0!important',
          gridColumnStart: 'content-start',
          gridColumnEnd: 'content-end',

          [theme.breakpoints.up('md')]: {
            gridColumnStart: 'three-start',
            gridColumnEnd: 'ten-end'
          },

          [theme.breakpoints.up('lg')]: {
            gridColumnStart: 'three-start',
            gridColumnEnd: 'ten-end'
          }
        },

        '& > div': {
          gridColumnStart: 'three-start',
          gridColumnEnd: 'ten-end'
        }
      }

      // pageresourceCategories: ({}) => ({}),

      // pageresourceCategory: ({}) => ({}),

      // tags: ({}) => ({}),

      // tag: ({}) => ({}),
      // authorWrap: {
      //   gridColumnStart: 'full-start',
      //   gridColumnEnd: 'full-end',
      //   padding: theme.spacing(7, 0),
      //   background: theme.vars.palette.background.lightThree
      // },
      // relatedItemsWrap: {
      //   '& > *': {
      //     gridColumn: 'full-start / full-end'
      //   }
      // }
    }
  }
];

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
