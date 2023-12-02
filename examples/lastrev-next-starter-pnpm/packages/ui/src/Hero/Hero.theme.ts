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
    position: 'relative',
    zIndex: 2
  }),

  bottomContentWrap: ({ theme }) => ({
    '& > *': {
      [theme.containerBreakpoints.up('sm')]: {
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
    gridColumnStart: 'start',
    gridColumnEnd: 'end',
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
    justifyContent: 'center',
    gridColumnStart: 'start',
    gridColumnEnd: 'end'
  },

  mediaWrap: ({ ownerState, theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    boxShadow: theme.shadows['L'],
    maxHeight: 'inherit',
    gridColumnStart: 'start',
    gridColumnEnd: 'end',

    picture: {
      display: 'flex',
      height: '100%',
      width: '100%',

      [theme.containerBreakpoints.down('md')]: {
        maxHeight: '30vh'
      }
    },

    img: {
      width: '100%',
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
  }),

  scrollToContentWrap: ({ theme }) => ({
    'position': 'absolute',
    'zIndex': 100,
    'bottom': 0,

    '& > *': {
      gridColumn: 'start/end',
      justifySelf: 'flex-end',
      paddingLeft: 'var(--grid-gap-half)',
      // paddingRight: 'var(--grid-margin)',
      minHeight: '4em',
      borderLeft: 'solid 1px var(--mui-palette-schemes-navy-secondary-main)',
      display: 'flex',
      transform: 'translate(0, 50%)',
      marginBottom: 0,
      whiteSpace: 'noWrap',
      cursor: 'pointer',

      [theme.containerBreakpoints.up('xl')]: {
        transform: 'translate(100%, 50%)'
      }
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

        [theme.containerBreakpoints.up('md')]: {
          gridColumnEnd: 'three-quarter'
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

        [theme.containerBreakpoints.up('md')]: {
          gridColumnEnd: 'three-quarter'
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

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnEnd: 'three-quarter'
        }
      },

      '[class*=mediaWrap]': {
        gridRow: 1,

        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'three-quarter',
          alignItems: 'flex-end'
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

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnStart: 'half'
        }
      },

      '[class*=mediaWrap]': {
        gridRow: 1,
        gridColumnStart: 'start',
        gridColumnEnd: 'end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'half',
          alignItems: 'flex-end'
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

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnEnd: 'half'
        }
      },

      '[class*=mediaWrap]': {
        gridRow: 1,
        gridColumnStart: 'full-start',
        gridColumnEnd: 'full-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'half',
          alignItems: 'flex-end'
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

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnStart: 'half'
        }
      },

      '[class*=mediaWrap]': {
        [theme.containerBreakpoints.up('md')]: {
          gridColumnEnd: 'half',
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

        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnStart: 'half'
        }
      },

      '[class*=mediaWrap]': {
        gridColumnStart: 'full-start',
        gridColumnEnd: 'full-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnEnd: 'half',
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

        '& *': {
          alignSelf: 'center'
        }
      },

      '[class*=mediaWrap]': {
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

        '& *': {
          alignSelf: 'center'
        }
      },

      '[class*=mediaWrap]': {
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
