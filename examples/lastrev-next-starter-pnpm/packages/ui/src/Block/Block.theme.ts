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
    xl: 2
  },
  [BlockVariants.contentOnRight]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
  },
  [BlockVariants.contentOnRightFullBleed]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
  },
  [BlockVariants.contentOnLeft]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
  },
  [BlockVariants.contentOnLeftFullBleed]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
  },
  [BlockVariants.smallContentOnLeft]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
  },
  [BlockVariants.smallContentOnRight]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
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

  introText: { gridColumn: 'start / end' },

  contentOuterGrid: {
    '> *': {
      gridColumnStart: 'auto'
    }
  },

  content: {
    'display': 'flex',
    'flexDirection': 'column',

    '& > *:last-child': {
      paddingBottom: 0,
      marginBottom: 0
    }
  },

  mainContentWrap: ({ ownerState }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: ownerState?.supplementalContent ? 'flex-start' : 'center',
    borderLeft: 'solid 1px var(--mui-palette-text-primary)',
    paddingLeft: 'var(--grid-gap)',
    gridColumnStart: 'start',
    gridColumnEnd: 'end',

    ...(!ownerState?.media && {
      gridRow: '1 !important'
    })
  }),

  sideContentWrap: ({ ownerState, theme }) => ({
    display: 'flex',
    alignItems: ownerState?.supplementalContent ? 'flex-start' : 'center',
    justifyContent: ownerState?.supplementalContent ? 'flex-start' : 'center',
    flexDirection: 'column',
    gridColumnStart: 'start',
    gridColumnEnd: 'end',

    ...(!ownerState?.media && {
      [theme.containerBreakpoints.down('md')]: {
        gridRow: '2 !important'
      }
    })
  }),

  actionsWrap: ({ theme, ownerState }) => ({
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--grid-gap)',

    [theme.containerBreakpoints.up('lg')]: {
      flexDirection: 'row'
    }
  })
};

const createVariants = (theme: Theme): ComponentsVariants['Block'] => [
  {
    props: {
      variant: BlockVariants.default
    },
    style: {
      '[class*=mainContentWrap]': {
        gridRow: 2,

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnEnd: 'half'
        }
      },

      '[class*=sideContentWrap]': {
        gridRow: 1,

        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'half'
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

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnEnd: 'half'
        }
      },

      '[class*=sideContentWrap]': {
        gridRow: 1,

        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'half'
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

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnEnd: 'half'
        }
      },

      '[class*=sideContentWrap]': {
        gridRow: 1,
        gridColumnStart: 'full-start',
        gridColumnEnd: 'full-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'half',
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

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnStart: 'half'
        }
      },

      '[class*=sideContentWrap]': {
        [theme.containerBreakpoints.up('md')]: {
          gridColumnEnd: 'half'
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

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnStart: 'half'
        }
      },

      '[class*=sideContentWrap]': {
        gridColumnStart: 'full-start',
        gridColumnEnd: 'full-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnEnd: 'half'
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

        [theme.containerBreakpoints.up('sm')]: {
          gridRow: 1,
          gridColumnStart: 'half'
        },

        [theme.containerBreakpoints.up('lg')]: {
          gridRow: 1,
          gridColumnStart: 'five-start'
        }
      },

      '[class*=sideContentWrap]': {
        [theme.containerBreakpoints.up('sm')]: {
          gridColumnEnd: 'half'
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

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnEnd: 'half'
        },

        [theme.containerBreakpoints.up('lg')]: {
          gridRow: 1,

          gridColumnEnd: 'seven-end'
        }
      },

      '[class*=sideContentWrap]': {
        gridRow: 1,

        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'half'
        },

        [theme.containerBreakpoints.up('lg')]: {
          gridColumnStart: 'eight-start'
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
