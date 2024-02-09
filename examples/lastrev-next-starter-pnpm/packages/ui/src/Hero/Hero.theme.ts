import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

import { HeroVariants } from './Hero.types';

const defaultProps: ComponentsProps['Hero'] = {
  variant: HeroVariants.default
};

const styleOverrides: ComponentsOverrides<Theme>['Hero'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    containerType: 'inline-size',
    position: 'relative',
    padding: 'var(--grid-gap) 0',

    [theme.breakpoints.up('md')]: {
      padding: 'var(--grid-margin) 0'
    }
  }),

  background: ({ theme }) => ({
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: theme.spacing(22),
      width: '100%',
      backgroundColor: 'var(--variant-overlay-color)',
      zIndex: 0
    }
  }),

  // title: ({ theme }) => ({ marginBottom: theme.spacing(1) }),

  // overline: ({ theme }) => ({ marginBottom: theme.spacing(1) }),

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
    justifyContent: 'center'
  },

  mediaWrap: ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    boxShadow: theme.shadows['L']
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
      variant: HeroVariants.simple
    },
    style: {
      'textAlign': 'center',
      'padding': theme.spacing(12, 0),
      '[class*=Hero-mainContentWrap]': {
        gridRow: 1,
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end'
      },

      '[class*=Hero-mediaWrap]': {},
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

      '[class*=mediaWrap]': {
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
      variant: HeroVariants.mediaOnRightFullBleed
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

      '[class*=mediaWrap]': {
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
      variant: HeroVariants.mediaOnLeft
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

      '[class*=mediaWrap]': {
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

      '[class*=mediaWrap]': {
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
