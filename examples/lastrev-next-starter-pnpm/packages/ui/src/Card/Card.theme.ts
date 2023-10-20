import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

import { CardVariants } from './Card.types';

const defaultProps: ComponentsProps['Card'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Card'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    'containerType': 'inline-size',
    'position': 'relative',
    'transition': 'all 0.25s ease-in-out',
    'willChange': 'transform',
    'display': 'flex',
    'flexDirection': 'column',
    'height': '100%',
    'boxShadow': 'initial',
    'borderRadius': 0,

    '&:hover': {
      transform: 'scale(1)'
    },

    '.swiper-grid &': {
      'transform': 'translateZ(0) scale(1)',

      '&:hover': {
        transform: 'scale(1.05)'
      }
    }
  }),

  contentWrap: {
    flex: 1,
    padding: 'calc(var(--grid-gap) / 2)'
  },

  title: ({ ownerState, theme }) => ({
    ...(ownerState?.variant === CardVariants.blog && {
      ...theme.typography.body1
    }),
    fontWeight: '900'
  }),

  actionsWrap: ({ theme }) => ({
    padding: 'calc(var(--grid-gap) / 2)'
    // display: 'flex'
    // padding: 'var(--grid-gap)',
    // gap: 'var(--grid-gap)'
    // flexDirection: 'column',
    // alignItems: 'center',
    // // TODO: Need additional breakpoints here
    // [theme.containerBreakpoints.up('sm')]: {
    //   flexDirection: 'row'
    // }
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
      '[class*=Card-cardMedia]': {
        'width': '100%',
        'height': '100%',
        'aspectRatio': '9/16',

        '& > *': {
          width: '100%',
          height: '100%'
        }
        // TODO Overlay
        // '&::after': {
        //   content: '""',
        //   position: 'absolute',
        //   height: '100%',
        //   width: '100%',
        //   backgroundColor: 'rgba(currentColor, .5)',
        //   zIndex: 2,
        //   top: 0,
        //   left: 0
        // }
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
          transform: 'translateY(calc(-100% - calc(var(--grid-gap) * 1.5)))'
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
  },
  {
    props: {
      variant: CardVariants.media
    },
    style: {
      '[class*=Card-cardMedia]': {
        'width': '100%',

        '& > *': {
          width: '100%',
          height: '100%'
        }
      },

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
      'borderLeft': 'solid 1px currentColor',

      '[class*=Card-title]': {
        ...theme.typography.h1,
        fontWeight: '900'
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
      '[class*=Card-contentWrap]': {
        containerType: 'inline-size'
      },

      '[class*=cardMedia]': {
        'maxWidth': '50%',
        'paddingTop': 'var(--grid-gap)',
        'marginLeft': 'auto',
        'marginRight': 'auto',
        'aspectRatio': '1 / 1',

        '& > *': {
          borderRadius: '50%',
          objectFit: 'cover',
          aspectRatio: '1 / 1',
          width: '100%',
          display: 'inline-block',
          overflow: 'hidden'
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
