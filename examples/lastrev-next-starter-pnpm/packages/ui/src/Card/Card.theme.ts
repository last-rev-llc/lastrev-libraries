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
    'transition': 'all 0.25s ease-in-out',
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
        '[class*=cardMedia] img': {
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

  media: ({ ownerState }) => ({
    backgroundColor: 'inherit',

    ...((ownerState?.variant === CardVariants.hover || ownerState?.variant === CardVariants.person) && {
      '&::after': {
        backgroundColor: 'inherit',
        opacity: '.5'
      },

      ...(ownerState?.aspectRatio === CardAspectRatios.horizontal && {
        minHeight: '56.25cqi'
      }),

      ...(ownerState?.aspectRatio === CardAspectRatios.vertical && {
        minHeight: '177.78cqi'
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

  title: ({ ownerState, theme }) => ({
    ...(ownerState?.variant === CardVariants.blog && {
      ...theme.typography.body1
    })
  }),

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
      '& [class*=contentWrap]': {
        borderLeft: 'solid 1px var(--mui-palette-text-primary)',
        paddingLeft: 'var(--grid-gap)',
        paddingTop: 0,
        paddingBottom: 0,

        [theme.containerBreakpoints.up('sm')]: {
          paddingLeft: 'var(--grid-gap-half)'
        }
      },

      '& [class*=Card-content]': {
        'minHeight': '33cqi',
        'display': 'flex',
        'flexDirection': 'column',

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

        '& > *': {
          width: '100%',
          objectFit: 'cover',
          minHeight: 'inherit',
          height: 'auto'
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
          height: '100%'
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
          '& > :is(img, svg)': {
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

        '& > :is(img, svg)': {
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
      variant: CardVariants.pricing
    },
    style: {
      '& [class*=Card-content] > *': {
        textAlign: 'center',
        display: 'block'
      },

      '& [class*=Card-title]': {
        ...theme.typography.display1,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
      },

      '& [class*=Card-subtitle]': {
        ...theme.typography.h4,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
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

        '& > *': {
          width: '100%',
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

      '[class*=Card-title]': {
        ...theme.typography.h4
      },

      '[class*=subtitle]': {
        ...theme.typography.overline,
        fontWeight: 700
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

        ':is([class*=Card-title], [class*=subtitle])': {
          transform: 'translateY(calc(-100% - calc(var(--grid-gap) * 2.5)))'
        },

        '&:not(:hover)': {
          '& :is([class*=Card-title], [class*=subtitle])': {
            marginBottom: 0
          }
        },

        ':is([class*=contentWrap], [class*=actionsWrap])': {
          transition: 'inherit',
          position: 'absolute',
          bottom: 0,
          transform: 'translateY(100%)',
          width: '100%',
          zIndex: 20,
          height: '100%'
        },

        ':is([class*=overline], [class*=body], [class*=actionsWrap])': {
          overflow: 'hidden',
          transition: 'inherit'
        },

        '&:hover': {
          ':is([class*=Card-title], [class*=subtitle])': {
            transform: 'translateY(0)',
            height: 'auto'
          },

          '[class*=contentWrap]': {
            transform: 'translateY(calc(var(--grid-gap) * -1.5))',
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
