import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

import { HeroVariants } from './Hero.types';

interface LayoutConfig {
  [key: string]: { [breakpoint: string]: number };
}

export const layoutConfig: LayoutConfig = {
  [HeroVariants.mediaOnRight]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
  },
  [HeroVariants.mediaOnRightFullBleed]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
  },
  [HeroVariants.mediaOnLeft]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
  },
  [HeroVariants.mediaOnLeftFullBleed]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
  },
  [HeroVariants.mediaSmall]: {
    xs: 1,
    sm: 1,
    md: 3,
    lg: 3,
    xl: 3
  }
};

const defaultProps: ComponentsProps['Hero'] = {
  variant: HeroVariants.default
};

const styleOverrides: ComponentsOverrides<Theme>['Hero'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
    containerType: 'inline-size',
    position: 'relative'
  }),

  bottomContentWrap: ({ theme }) => ({
    '& > *': {
      [theme.containerBreakpoints.up('sm')]: {
        // margin: 'calc(2 * var(--section-padding)) 0 0 !important',
        padding: '0 !important'
      }
    }
  }),

  contentOuterGrid: ({ theme, ownerState }) => ({
    overflow: 'hidden',

    [theme.containerBreakpoints.up('md')]: {
      ...(!!ownerState?.images?.length && {
        maxHeight: '40vh'
      })
    }
  }),

  title: ({ theme, ownerState }) => ({
    whiteSpace: 'pre-line',
    ...(!ownerState?.isHomepage && {
      ...theme.typography.h2
    })
  }),

  overline: ({ theme }) => ({
    [theme.containerBreakpoints.down('md')]: {
      marginBottom: 0
    }
  }),

  content: ({ theme }) => ({
    'display': 'flex',
    'flexDirection': 'column',
    'minHeight': '10vh',
    'justifyContent': 'center',
    'margin': 'var(--grid-gap) 0',
    'gap': 'var(--grid-gap)',

    [theme.containerBreakpoints.up('md')]: {
      // margin: 'var(--section-padding) 0',
      minHeight: '30vh',
      padding: 0,
      gap: 0
    },

    '> *:last-child': {
      marginBottom: 0
    }
  }),

  breadcrumbsWrap: ({ theme }) => ({
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',
    order: 2,

    [theme.containerBreakpoints.up('md')]: {
      position: 'absolute',
      bottom: 'var(--grid-gap)'
    }
  }),

  mainContentWrap: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center'
  },

  mediaWrap: ({ ownerState, theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    boxShadow: theme.shadows['L'],
    maxHeight: 'inherit',

    picture: {
      display: 'flex',
      height: '100%',
      width: '100%',

      [theme.containerBreakpoints.down('md')]: {
        maxHeight: '30vh'
      }
    },

    img: {
      objectFit: !!ownerState?.showFullImage ? 'contain' : 'cover'
    }
  }),

  actionsWrap: ({ theme }) => ({
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    [theme.containerBreakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  })
};

const createVariants = (theme: Theme): ComponentsVariants['Hero'] => [
  {
    props: {
      variant: HeroVariants.simple
    },
    style: {
      '[class*=Hero-mainContentWrap]': {
        gridRow: 1,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnEnd: 'nine-end'
        }
      }
    }
  },
  {
    props: {
      variant: HeroVariants.news
    },
    style: {
      '[class*=Hero-mainContentWrap]': {
        gridRow: 1,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnEnd: 'nine-end'
        }
      },

      '[class*=Hero-contentInnerWrap]': {
        padding: 'var(--section-padding) 0 calc(2 * var(--section-padding))'
      }
    }
  },
  {
    props: {
      variant: HeroVariants.mediaSmall
    },
    style: {
      '[class*=mainContentWrap]': {
        gridRow: 2,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnEnd: 'six-end'
        },

        [theme.containerBreakpoints.up('lg')]: {
          gridColumnEnd: 'nine-end'
        }
      },

      '[class*=mediaWrap]': {
        gridRow: 1,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'seven-start',
          alignItems: 'flex-end'
        },

        [theme.containerBreakpoints.up('lg')]: {
          gridColumnStart: 'ten-start'
        }
      }
    }
  },
  {
    props: {
      variant: HeroVariants.mediaOnRight
    },
    style: {
      '[class*=mainContentWrap]': {
        gridRow: 2,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnEnd: 'four-end'
        },

        [theme.containerBreakpoints.up('lg')]: {
          gridColumnEnd: 'five-end'
        }
      },

      '[class*=mediaWrap]': {
        gridRow: 1,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'five-start',
          alignItems: 'flex-end'
        },

        [theme.containerBreakpoints.up('lg')]: {
          gridColumnStart: 'six-start'
        }
      }
    }
  },
  {
    props: {
      variant: HeroVariants.mediaOnRightFullBleed
    },
    style: {
      '[class*=mainContentWrap]': {
        gridRow: 2,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnEnd: 'four-end'
        },

        [theme.containerBreakpoints.up('lg')]: {
          gridColumnEnd: 'five-end'
        }
      },

      '[class*=mediaWrap]': {
        gridRow: 1,
        gridColumnStart: 'full-start',
        gridColumnEnd: 'full-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'five-start',
          alignItems: 'flex-end'
        },

        [theme.containerBreakpoints.up('lg')]: {
          gridColumnStart: 'six-start'
        }
      }
    }
  },
  {
    props: {
      variant: HeroVariants.mediaOnLeft
    },
    style: {
      '[class*=mainContentWrap]': {
        gridRow: 2,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnStart: 'content-half'
        }
      },

      '[class*=mediaWrap]': {
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnEnd: 'content-half',
          alignItems: 'flex-start'
        }
      }
    }
  },
  {
    props: {
      variant: HeroVariants.mediaOnLeftFullBleed
    },
    style: {
      '[class*=mainContentWrap]': {
        gridRow: 2,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnStart: 'content-half'
        }
      },

      '[class*=mediaWrap]': {
        gridColumnStart: 'full-start',
        gridColumnEnd: 'full-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnEnd: 'content-half',
          alignItems: 'flex-start'
        }
      }
    }
  },

  {
    props: {
      variant: HeroVariants.mediaAbove
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

      '[class*=mediaWrap]': {
        gridColumn: 'content-start/content-end',
        gridRow: 1
      }
    }
  },
  {
    props: {
      variant: HeroVariants.mediaBelow
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

      '[class*=mediaWrap]': {
        gridColumn: 'content-start/content-end',
        gridRow: 2
      }
    }
  }
];

export const heroTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Hero: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default heroTheme;
