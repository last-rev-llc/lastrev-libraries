import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

import { BlockVariants } from './Block.types';

const defaultProps: ComponentsProps['Block'] = {
  variant: BlockVariants.supportingItemOnRight
};

const styleOverrides: ComponentsOverrides<Theme>['Block'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
    'containerType': 'inline-size',
    'position': 'relative',
    'width': '100%',
    'display': 'flex',
    'flexDirection': 'column',

    '[class*="Background-root"] + [class*=Section-contentWrap] & [class*=mainContentWrap]': {
      padding: 'calc(var(--grid-gap) * 2)',
      paddingTop: 0
    }
    // TODO: Update to check if within a section
    // padding: theme.spacing(0, 4)
    // margin: theme.spacing(0, -4)
  }),

  // introTextGrid: : {},
  media: {
    '&:is(img)': {
      objectFit: 'contain'
    }
  },
  introText: { gridColumn: 'content-start / content-end' },

  contentOuterGrid: {
    '> *': {
      // gridColumnStart: 'auto'
    }
  },

  overline: ({ theme }) => ({
    color: 'var(--mui-palette-overline)'
  }),

  // title: {},

  // subtitle: {},

  // body: {},

  content: {
    display: 'flex',
    flexDirection: 'column'
  },

  mainContentWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center'
  },

  sideContentWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  // mediaItems: : {},

  actionsWrap: ({ theme, ownerState }) => ({
    // margin: theme.spacing(0, -1),
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    gap: 'calc(var(--grid-gap) * 2)',
    [theme.containerBreakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  })

  // action: : {}
};

const createVariants = (theme: Theme): ComponentsVariants['Block'] => [
  {
    props: {
      variant: BlockVariants.supportingItemOnRight
    },
    style: {
      '[class*=mainContentWrap]': {
        gridRow: 2,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnStart: 'content-start',
          gridColumnEnd: 'content-half',
          paddingRight: 'calc(var(--grid-gap) * 2)'
        }
      },

      '[class*=sideContentWrap]': {
        gridRow: 1,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'content-half',
          gridColumnEnd: 'content-end'
        }
      }
    }
  },
  {
    props: {
      variant: BlockVariants.default
    },
    style: {
      '[class*=mainContentWrap]': {
        gridRow: 2,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnStart: 'content-start',
          gridColumnEnd: 'content-half',
          paddingRight: 'calc(var(--grid-gap) * 2)'
        }
      },

      '[class*=sideContentWrap]': {
        gridRow: 1,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'content-half',
          gridColumnEnd: 'content-end'
        }
      }
    }
  },
  // {
  //   props: {
  //     variant: BlockVariants.supportingItemOnRightFullBleed
  //   },
  //   style: {
  //     '[class*=mainContentWrap]': {
  //       gridRow: 2,
  //       gridColumnStart: 'content-start',
  //       gridColumnEnd: 'content-end',
  //       [theme.containerBreakpoints.up('md')]: {
  //         gridRow: 1,
  //         gridColumnStart: 'content-start',
  //         gridColumnEnd: 'content-half',
  //         paddingRight: 'calc(var(--grid-gap) * 2)'
  //       }
  //     },

  //     '[class*=sideContentWrap]': {
  //       gridRow: 1,
  //       gridColumnStart: 'full-start',
  //       gridColumnEnd: 'full-end',

  //       [theme.containerBreakpoints.up('md')]: {
  //         gridColumnStart: 'content-half',
  //         gridColumnEnd: 'full-end'
  //       }
  //     }
  //   }
  // },
  {
    props: {
      variant: BlockVariants.supportingItemOnLeft
    },
    style: {
      '[class*=mainContentWrap]': {
        gridRow: 2,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnStart: 'content-half',
          gridColumnEnd: 'content-end',
          paddingLeft: 'calc(var(--grid-gap) * 2)'
        }
      },

      '[class*=sideContentWrap]': {
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnEnd: 'content-half'
        }
      }
    }
  },

  // {
  //   props: {
  //     variant: BlockVariants.supportingItemOnLeftFullBleed
  //   },
  //   style: {
  //     '[class*=mainContentWrap]': {
  //       gridRow: 2,
  //       gridColumnStart: 'content-start',
  //       gridColumnEnd: 'content-end',

  //       [theme.containerBreakpoints.up('md')]: {
  //         gridRow: 1,
  //         gridColumnStart: 'content-half',
  //         gridColumnEnd: 'content-end',
  //         paddingLeft: 'calc(var(--grid-gap) * 2)'
  //       }
  //     },

  //     '[class*=sideContentWrap]': {
  //       gridColumnStart: '1',
  //       gridColumnEnd: '-1',

  //       [theme.containerBreakpoints.up('md')]: {
  //         gridColumnEnd: 'content-half'
  //       }
  //     }
  //   }
  // },

  {
    props: {
      variant: BlockVariants.supportingItemOnTop
    },
    style: {
      'textAlign': 'center',
      '[class*=mainContentWrap]': {
        'gridRow': 2,
        'gridColumnStart': 'content-start',
        'gridColumnEnd': 'content-end',

        '& *': {
          alignSelf: 'center'
        }
      },

      '[class*=sideContentWrap]': {
        gridColumn: 'content-start/content-end',
        gridRow: 1
      }
    }
  },
  {
    props: {
      variant: BlockVariants.supportingItemOnBottom
    },
    style: {
      'textAlign': 'center',
      '[class*=mainContentWrap]': {
        'gridRow': 1,
        'gridColumnStart': 'content-start',
        'gridColumnEnd': 'content-end',
        '& *': {
          alignSelf: 'center'
        }
      },

      '[class*=sideContentWrap]': {
        'gridColumn': 'content-start/content-end',
        'gridRow': 2,
        '[class*=Block-media]': {
          aspectRatio: '21/9'
        }
      }
    }
  },
  {
    props: {
      variant: BlockVariants.simpleCentered
    },
    style: {
      'textAlign': 'center',
      '[class*=mainContentWrap]': {
        'gridRow': 1,
        'gridColumnStart': 'content-start',
        'gridColumnEnd': 'content-end',
        '& *': {
          alignSelf: 'center'
        }
      },

      '[class*=sideContentWrap]': {
        'gridColumn': 'content-start/content-end',
        'gridRow': 2,
        '[class*=Block-media]': {
          aspectRatio: '21/9'
        }
      }
    }
  }
];

export const blockTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Block: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default blockTheme;
