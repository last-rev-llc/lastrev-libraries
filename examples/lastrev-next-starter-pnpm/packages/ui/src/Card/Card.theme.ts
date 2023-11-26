import {
  type ThemeOptions,
  type ComponentsProps,
  type ComponentsOverrides,
  type ComponentsVariants
} from '@mui/material/styles';

import { type Theme } from '../ThemeRegistry/theme.types';

import { CardVariants, CardAspectRatios } from './Card.types';

const defaultProps: ComponentsProps['Card'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Card'] = {
  root: ({ theme, ownerState }) => ({
    containerType: 'inline-size',
    height: '100%',

    ...(ownerState?.variant === CardVariants.hover || ownerState?.variant === CardVariants.person
      ? {
          [theme.containerBreakpoints.up('sm')]: {
            ...theme.mixins.applyColorSchemeOverlay({ ownerState, theme })
          }
        }
      : {
          ...theme.mixins.applyColorScheme({ ownerState, theme })
        })
  }),

  cardWrap: ({ theme, ownerState }) => ({
    'display': 'flex',
    'flexDirection': 'column',
    'height': '100%',
    'boxShadow': 'initial',
    'borderRadius': 0,
    'backgroundColor': 'inherit',
    'position': 'relative',
    'transition': 'transform 0.25s ease-in-out',
    'willChange': 'transform',
    'color': 'inherit',

    '&:hover': {
      transform: 'scale(1)'
    },

    '.swiper-grid &': {
      'transform': 'translateZ(0) scale(1)',

      '&:hover': {
        transform: 'scale(1.05)'
      }
    },

    ...(ownerState?.variant === CardVariants.media &&
      ownerState?.aspectRatio && {
        '[class*=cardMedia] :is(img, picture)': {
          objectFit: 'cover',
          ...(ownerState?.aspectRatio === CardAspectRatios.horizontal && {
            aspectRatio: '16/9'
          }),

          ...(ownerState?.aspectRatio === CardAspectRatios.vertical && {
            aspectRatio: '9/16'
          }),

          ...(ownerState?.aspectRatio === CardAspectRatios.square && {
            aspectRatio: '1/1'
          })
        }
      }),

    ...(ownerState?.aspectRatio === CardAspectRatios.horizontal && {
      [theme.breakpoints.up('md')]: { minHeight: '56.25cqi' }
    }),

    ...(ownerState?.aspectRatio === CardAspectRatios.vertical && {
      [theme.breakpoints.up('md')]: { minHeight: '177.78cqi' }
    }),

    ...(ownerState?.aspectRatio === CardAspectRatios.square && {
      minHeight: '100cqi'
    })
  }),

  media: ({ ownerState, theme }) => ({
    backgroundColor: 'inherit',

    ...((ownerState?.variant === CardVariants.hover || ownerState?.variant === CardVariants.person) && {
      '&::after': {
        backgroundColor: 'inherit',
        opacity: '.5'
      },

      'maxHeight': '100cqi',

      ...(ownerState?.aspectRatio === CardAspectRatios.horizontal && {
        [theme.breakpoints.up('md')]: { maxHeight: 'initial', minHeight: '56.25cqi' }
      }),

      ...(ownerState?.aspectRatio === CardAspectRatios.vertical && {
        [theme.breakpoints.up('md')]: { maxHeight: 'initial', minHeight: '177.78cqi' }
      }),

      ...(ownerState?.aspectRatio === CardAspectRatios.square && {
        minHeight: '100cqi'
      })
    })
  }),

  contentWrap: ({ theme }) => ({
    flex: 1,
    padding: 'var(--grid-gap)'
  }),

  title: {},

  bodyWrap: ({ theme }) => ({
    '*': {
      ...theme.typography.body1
    }
  }),

  actionsWrap: ({ theme }) => ({
    padding: 'var(--grid-gap)',

    [theme.containerBreakpoints.up('sm')]: {
      padding: '0 var(--grid-gap) var(--grid-gap)'
    },

    a: {
      padding: 0,
      margin: 0
    }
  }),

  link: {
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'width': '100%',
    'height': '100%',
    '&:hover': {
      '.MuiCardActionArea-focusHighlight': {
        opacity: 0
      }
    }
  }
};

const createVariants = (theme: Theme): ComponentsVariants['Card'] => [
  {
    props: {
      variant: CardVariants.default
    },
    style: {
      '[class*=actionsWrap]': {
        borderLeft: 'solid 1px var(--mui-palette-text-primary)',
        paddingBottom: 0,
        paddingLeft: 'var(--grid-gap)',
        paddingRight: 0
      },

      '& [class*=Card-content]': {
        'borderLeft': 'solid 1px var(--mui-palette-text-primary)',
        'minHeight': '33cqi',
        'display': 'flex',
        'flexDirection': 'column',
        'paddingBottom': 0,
        'paddingLeft': 'var(--grid-gap)',
        'paddingRight': 0,

        '& > *': {
          marginTop: 'auto'
        }
      },

      '& [class*=Card-title]': {
        marginTop: 0
      }
    }
  },

  {
    props: {
      variant: CardVariants.searchResult
    },
    style: {
      '.MuiCard-root': {
        alignItems: 'flex-start',
        borderLeft: 'solid 1px var(--mui-palette-text-primary)',
        display: 'grid',
        gridGap: 'var(--grid-gap-half)',
        gridTemplateColumns: 'minmax(0, max-content) auto',
        paddingLeft: 'var(--grid-gap)'
      },

      '[class*=contentWrap]': {
        paddingTop: 0,
        paddingBottom: 0,
        gridRow: 1,
        gridColumn: 2
      },

      '[class*=cardMedia]': {
        'maxWidth': 48,
        'gridRow': '1/3',
        'gridColumn': '1',

        [theme.containerBreakpoints.up('sm')]: {
          maxWidth: 96
        },

        [theme.containerBreakpoints.up('lg')]: {
          maxWidth: 256
        },

        '& :is(img, svg, picture)': {
          objectFit: 'contain'
        }
      },

      '[class*=actionsWrap]': {
        gridRow: 2,
        gridColumn: 2,
        paddingBottom: 0
      },

      '& [class*=Card-title]': {
        marginTop: 0
      }
    }
  },

  {
    props: {
      variant: CardVariants.news
    },
    style: {
      'borderLeft': 'solid 1px var(--mui-palette-text-primary)',
      'paddingLeft': 'var(--grid-gap)',

      ':is([class*=Card-cardMedia], [class*=Card-bodyWrap])': {
        display: 'none'
      },

      '[class*=actionsWrap]': {
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0
      },

      '& [class*=Card-content]': {
        'minHeight': '33cqi',
        'display': 'flex',
        'flexDirection': 'column',
        'padding': 0,

        '& > *': {
          marginTop: 'auto'
        }
      },

      '& [class*=Card-title]': {
        marginTop: 0
      }
    }
  },

  {
    props: {
      variant: CardVariants.hover
    },
    style: {
      '[class*=Card-cardMedia]': {
        'width': '100%',
        'height': '100%',
        'position': 'relative',

        '&  :is(img, picture)': {
          width: '100%',
          objectFit: 'cover',
          minHeight: 'inherit',
          height: '100%'
        },

        '&::after': {
          content: '""',
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: 1,
          top: 0,
          left: 0
        }
      },

      [theme.breakpoints.up('sm')]: {
        'overflow': 'hidden',

        '[class*=Card-cardMedia]': {
          'width': '100%',

          '& > *': {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }
        },

        '[class*=Card-title]': {
          transform: 'translateY(calc(-100% - calc(var(--grid-gap) * 1.75)))'
        },

        ':is([class*=contentWrap], [class*=actionsWrap])': {
          transition: 'inherit',
          position: 'absolute',
          bottom: 0,
          transform: 'translateY(100%)',
          width: '100%',
          zIndex: 20,
          height: '100%',
          boxSizing: 'border-box'
        },

        ':is([class*=overline], [class*=subtitle], [class*=body], [class*=actionsWrap])': {
          overflow: 'hidden',
          transition: 'inherit'
        },

        '&:hover': {
          '[class*=Card-title]': {
            transform: 'translateY(0)',
            height: 'auto'
          },

          '[class*=contentWrap]': {
            transform: 'translateY(calc(var(--grid-gap) * -1.75))',
            height: 'auto'
          },

          '[class*=actionsWrap]': {
            transform: 'translateY(0)',
            height: 'auto'
          }
        }
      }
    }
  },
  {
    props: {
      variant: CardVariants.media
    },
    style: {
      '[class*=cardContent]': {
        display: 'none'
      }
    }
  },
  {
    props: {
      variant: CardVariants.icon
    },
    style: {
      'alignItems': 'flex-start',
      'borderLeft': 'solid 1px var(--mui-palette-text-primary)',

      '[class*=Card-title]': {
        ...theme.typography.h2
      },

      '[class*=cardMedia]': {
        maxWidth: 96,
        paddingLeft: 'var(--grid-gap)',

        [theme.containerBreakpoints.up('lg')]: {
          '& > :is(img, svg, picture > img)': {
            objectFit: 'contain'
          }
        }
      }
    }
  },
  {
    props: {
      variant: CardVariants.logo
    },
    style: {
      '[class*=contentWrap]': {
        textAlign: 'center'
      },

      '[class*=cardMedia]': {
        'maxHeight': 96,
        'marginLeft': 'auto',
        'marginRight': 'auto',
        'paddingTop': 'var(--grid-gap)',

        '& > :is(img, svg, picture > img)': {
          objectFit: 'contain',
          width: '100%',
          height: '100%'
        }
      }
    }
  },

  {
    props: {
      variant: CardVariants.timeline
    },
    style: {
      '[class*=contentWrap]': {
        display: 'flex',
        flexDirection: 'column',
        borderLeft: 'solid 1px var(--mui-palette-text-primary)',
        padding: '0 var(--grid-gap)'
      },

      '[class*=bodyWrap]': {
        'order': 1,
        '& *': {
          ...theme.typography.body1
        }
      },

      '[class*=Card-title]': {
        ...theme.typography.h2,
        order: 2,
        marginTop: 'auto',
        marginBottom: 0
      },

      '[class*=Card-subtitle]': {
        order: 3
      }
    }
  },
  {
    props: {
      variant: CardVariants.person
    },
    style: {
      '[class*=Card-cardMedia]': {
        'width': '100%',
        'height': '100%',
        'aspectRatio': '9/16',
        'position': 'relative',

        '& :is(img, picture)': {
          aspectRatio: 'inherit',
          width: '100%',
          objectFit: 'cover',
          minHeight: 'inherit',
          filter: 'grayscale(1)',
          height: '100%'

          // '> img': {
          //   aspectRatio: 'inherit',
          //   objectFit: 'inherit',
          //   height: 'auto'
          // }
        },

        '&::after': {
          content: '""',
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: 1,
          top: 0,
          left: 0
        }
      },

      '[class*=Card-overline], [class*=body]': {
        display: 'none'
      },

      [theme.breakpoints.up('sm')]: {
        'overflow': 'hidden',

        '[class*=Card-cardMedia]': {
          'width': '100%',

          '& > *': {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }
        },

        '[class*=Card-title]': {
          transform: 'translateY(calc(-100% - calc(var(--grid-gap) * 1.75)))'
        },

        ':is([class*=contentWrap], [class*=actionsWrap])': {
          transition: 'inherit',
          position: 'absolute',
          bottom: 0,
          transform: 'translateY(100%)',
          width: '100%',
          zIndex: 20,
          height: '100%',
          boxSizing: 'border-box'
        },

        ':is([class*=overline], [class*=subtitle], [class*=body], [class*=actionsWrap])': {
          overflow: 'hidden',
          transition: 'inherit'
        },

        '&:hover': {
          '[class*=Card-title]': {
            transform: 'translateY(0)',
            height: 'auto'
          },

          '[class*=contentWrap]': {
            transform: 'translateY(calc(var(--grid-gap) * -1.75))',
            height: 'auto'
          },

          '[class*=actionsWrap]': {
            transform: 'translateY(0)',
            height: 'auto'
          }
        }
      }
    }
  }
];

export const cardTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Card: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default cardTheme;
