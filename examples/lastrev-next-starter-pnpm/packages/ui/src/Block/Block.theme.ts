import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

import { BlockVariants } from './Block.types';

const defaultProps: ComponentsProps['Block'] = {
  variant: BlockVariants.contentOnRight
};

const styleOverrides: ComponentsOverrides<Theme>['Block'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    'containerType': 'inline-size',
    'position': 'relative',
    'width': '100%',
    'display': 'flex',
    'flexDirection': 'column',

    '[class*="Background-root"] + [class*=Section-contentWrap] & [class*=mainContentWrap]': {
      padding: 'var(--grid-gap)',
      paddingTop: 0
    },
    // TODO: Update to check if within a section
    // padding: theme.spacing(0, 4)
    // margin: theme.spacing(0, -4)
    'ins': {
      textDecoration: 'none',
      color: 'var(--variant-highlight-color)'
    }
  }),

  // introTextGrid: : {},

  introText: { gridColumn: 'content-start / content-end' },

  contentOuterGrid: {
    '> *': {
      // gridColumnStart: 'auto'
    }
  },

  // overline: {},

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
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--grid-gap)',

    [theme.containerBreakpoints.up('lg')]: {
      flexDirection: 'row'
    }
  })

  // action: : {}
};

const createVariants = (theme: Theme): ComponentsVariants['Block'] => [
  {
    props: {
      variant: BlockVariants.contentOnRight
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
          paddingRight: 'var(--grid-gap)'
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
      variant: BlockVariants.contentOnRightFullBleed
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
          paddingRight: 'var(--grid-gap)'
        }
      },

      '[class*=sideContentWrap]': {
        gridRow: 1,
        gridColumnStart: 'full-start',
        gridColumnEnd: 'full-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'content-half',
          gridColumnEnd: 'full-end'
        }
      }
    }
  },
  {
    props: {
      variant: BlockVariants.contentOnLeft
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
          paddingLeft: 'var(--grid-gap)'
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
  {
    props: {
      variant: BlockVariants.contentOnLeftFullBleed
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
          paddingLeft: 'var(--grid-gap)'
        }
      },

      '[class*=sideContentWrap]': {
        gridColumnStart: '1',
        gridColumnEnd: '-1',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnEnd: 'content-half'
        }
      }
    }
  },

  {
    props: {
      variant: BlockVariants.contentAbove
    },
    style: {
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
      variant: BlockVariants.contentBelow
    },
    style: {
      '[class*=mainContentWrap]': {
        'gridRow': 1,
        'gridColumnStart': 'content-start',
        'gridColumnEnd': 'content-end',
        '& *': {
          alignSelf: 'center'
        }
      },

      '[class*=sideContentWrap]': {
        gridColumn: 'content-start/content-end',
        gridRow: 2
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
