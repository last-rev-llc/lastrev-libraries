import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

import { HeroVariants } from './Hero.types';

const defaultProps: ComponentsProps['Hero'] = {
  variant: HeroVariants.default
};

const styleOverrides: ComponentsOverrides<Theme>['Hero'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
    containerType: 'inline-size',
    position: 'relative',
    padding: theme.spacing(12, 0),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(10, 0)
    },
    ...(ownerState?.overlap && {
      'paddingBottom': theme.spacing(10),
      [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(10)
      },
      '[class*=Hero-mediaWrap]': {
        background: 'var(--variant-background-color, #FFF)',
        boxShadow: theme.shadows[10]
      }
    })
  }),

  background: ({ theme, ownerState }) => ({
    ...(ownerState?.overlap && {
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: theme.spacing(20),
        width: '100%',
        backgroundColor: 'var(--variant-overlay-color, #FFF)',
        zIndex: 0
      }
    })
  }),

  // title: ({ theme }) => ({ marginBottom: theme.spacing(1) }),

  // overline: ({ theme }) => ({ marginBottom: theme.spacing(1) }),
  title: ({ theme }) => ({}),
  overline: ({ theme }) => ({}),

  // media: {},

  // overline: {},

  content: ({ theme }) => ({
    'paddingRight': 'var(--grid-gap)',

    '> *:last-child': {
      marginBottom: 0
    }
  }),

  // subtitle: {},

  // body: {},

  mainContentWrap: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-start'
  },

  mediaWrap: ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gridRow: 3,
    [theme.containerBreakpoints.up('md')]: {
      gridRow: 1,
      flexDirection: 'row'
    },
    [theme.containerBreakpoints.up('lg')]: {
      gridColumn: 1
    },

    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',

    img: {
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      objectPosition: 'center',
      aspectRatio: '16/10',
      [theme.containerBreakpoints.up('sm')]: {
        aspectRatio: '21/9'
      },
      [theme.containerBreakpoints.up('md')]: {
        aspectRatio: '1/1'
      }
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

  // action: {}
};

const createVariants = (theme: Theme): ComponentsVariants['Hero'] => [
  {
    props: {
      variant: HeroVariants.simpleCentered
    },
    style: {
      'textAlign': 'center',
      'padding': theme.spacing(12, 0),
      '[class*=Hero-mainContentWrap]': {
        gridRow: 1,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end'
      },

      '[class*=Hero-mediaWrap] img': {
        aspectRatio: '21/9'
      },
      '[class*=Hero-actionsWrap]': {
        justifyContent: 'center'
      }
    }
  },
  {
    props: {
      variant: HeroVariants.mediaOnRight
    },
    style: {
      '[class*=Hero-mainContentWrap]': {
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'content-start',
          gridColumnEnd: 'content-half'
        }
      },

      '[class*=Hero-mediaWrap]': {
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
      variant: HeroVariants.mediaOnRightFullBleed
    },
    style: {
      '[class*=Hero-mainContentWrap]': {
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'content-start',
          gridColumnEnd: 'content-half'
        }
      },

      '[class*=Hero-mediaWrap]': {
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
      variant: HeroVariants.mediaOnLeft
    },
    style: {
      '[class*=Hero-mainContentWrap]': {
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'content-half',
          gridColumnEnd: 'content-end'
        }
      },

      '[class*=Hero-mediaWrap]': {
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
      variant: HeroVariants.mediaOnLeftFullBleed
    },
    style: {
      '[class*=Hero-mainContentWrap]': {
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'content-half',
          gridColumnEnd: 'content-end'
        }
      },

      '[class*=Hero-mediaWrap]': {
        gridColumnStart: 'content-half',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('md')]: {
          gridColumnEnd: 'content-half'
        }
      }
    }
  },

  {
    props: {
      variant: HeroVariants.mediaAbove
    },
    style: {
      'textAlign': 'center',
      '[class*=Hero-mainContentWrap]': {
        'gridRow': 2,
        'gridColumnStart': 'content-start',
        'gridColumnEnd': 'content-end',

        '& *': {
          alignSelf: 'center'
        }
      },

      '[class*=Hero-mediaWrap]': {
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
      'textAlign': 'center',
      '[class*=Hero-title]': {
        color: theme.vars.palette.primary.dark
      },
      '[class*=Hero-mainContentWrap]': {
        'gridRow': 1,
        'gridColumnStart': 'content-start',
        'gridColumnEnd': 'content-end',
        '& *': {
          alignSelf: 'center'
        }
      },

      '[class*=Hero-mediaWrap]': {
        gridColumn: 'content-start/content-end',
        maxWidth: 800,
        margin: 'auto',
        gridRow: 2,
        img: {
          aspectRatio: '21/9',
          objectFit: 'contain'
        }
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
