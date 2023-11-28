import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

import { BlockVariants } from './Block.types';

interface LayoutConfig {
  [key: string]: { [breakpoint: string]: number };
}

export const layoutConfig: LayoutConfig = {
  [BlockVariants.default]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2,
    xxl: 2
  },
  [BlockVariants.contentOnRight]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2,
    xxl: 2
  },
  [BlockVariants.contentOnRightFullBleed]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2,
    xxl: 2
  },
  [BlockVariants.contentOnLeft]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2,
    xxl: 2
  },
  [BlockVariants.contentOnLeftFullBleed]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2,
    xxl: 2
  },
  [BlockVariants.smallContentOnLeft]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2,
    xxl: 2
  },
  [BlockVariants.smallContentOnRight]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2,
    xxl: 2
  }
};

const defaultProps: ComponentsProps['Block'] = {
  variant: BlockVariants.contentOnRight
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
      padding: 'var(--grid-gap)',
      paddingTop: 0
    },

    'ins': {
      textDecoration: 'none',
      color: 'var(--variant-highlight-color)'
    }
  }),

  // introTextGrid: : {},

  introText: { gridColumn: 'content-start / content-end' },

  contentOuterGrid: {
    '> *': {
      gridColumnStart: 'auto'
    }
  },

  // overline: {},

  title: {},

  subtitle: {
    fontWeight: 400
  },

  // body: {},

  content: {
    'display': 'flex',
    'flexDirection': 'column',

    '& > *:last-child': {
      paddingBottom: 0,
      marginBottom: 0
    }
  },

  mainContentWrap: ({ ownerState, theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: ownerState?.supplementalContent ? 'flex-start' : 'center',

    borderLeft: 'solid 1px var(--mui-palette-text-primary)',
    paddingLeft: 'var(--grid-gap)',

    ...(!ownerState?.media && {
      gridRow: '1 !important'
    })
  }),

  sideContentWrap: ({ ownerState, theme }) => ({
    display: 'flex',
    alignItems: ownerState?.supplementalContent ? 'flex-start' : 'center',
    justifyContent: ownerState?.supplementalContent ? 'flex-start' : 'center',
    flexDirection: 'column',

    ...(!ownerState?.media && {
      [theme.containerBreakpoints.down('md')]: {
        gridRow: '2 !important'
      }
    })
  }),

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
          gridColumnEnd: 'content-half'
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
          gridColumnEnd: 'content-half'
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
          gridColumnEnd: 'content-half'
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
          gridColumnEnd: 'content-end'
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
          gridColumnEnd: 'content-end'
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
      variant: BlockVariants.smallContentOnLeft
    },
    style: {
      '[class*=mainContentWrap]': {
        gridRow: 2,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('sm')]: {
          gridRow: 1,
          gridColumnStart: 'content-half',
          gridColumnEnd: 'content-end'
        },

        [theme.containerBreakpoints.up('lg')]: {
          gridRow: 1,
          gridColumnStart: 'five-start',
          gridColumnEnd: 'content-end'
        }
      },

      '[class*=sideContentWrap]': {
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('sm')]: {
          gridColumnEnd: 'content-half'
        },

        [theme.containerBreakpoints.up('lg')]: {
          gridColumnEnd: 'four-end'
        }
      }
    }
  },
  {
    props: {
      variant: BlockVariants.smallContentOnRight
    },
    style: {
      '[class*=mainContentWrap]': {
        gridRow: 2,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnStart: 'content-start',
          gridColumnEnd: 'content-half'
        },

        [theme.containerBreakpoints.up('lg')]: {
          gridRow: 1,
          gridColumnStart: 'content-start',
          gridColumnEnd: 'seven-end'
        }
      },

      '[class*=sideContentWrap]': {
        gridRow: 1,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'content-half',
          gridColumnEnd: 'content-end'
        },

        [theme.containerBreakpoints.up('lg')]: {
          gridColumnStart: 'eight-start',
          gridColumnEnd: 'content-end'
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
