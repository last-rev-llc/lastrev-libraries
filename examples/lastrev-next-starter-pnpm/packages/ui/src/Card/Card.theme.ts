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
    padding: 'var(--grid-gap)'
  },

  title: ({ ownerState, theme }) => ({
    ...(ownerState?.variant === CardVariants.blog && {
      ...theme.typography.body1
    }),
    fontWeight: '900'
  }),

  actionsWrap: ({ theme }) => ({
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
    // 'zIndex': -1,
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
      'overflow': 'hidden',

      '&:hover': {
        ':is([class*=contentWrap], [class*=actionsWrap], [class*=title])': {
          transform: 'translateY(0)',
          height: 'auto'
        }
      },

      '[class*=Card-cardMedia]': {
        'width': '100%',

        '& > *': {
          width: '100%',
          height: '100%'
        }
      },

      '[class*=Card-title]': {
        // transform: 'translateY(calc(-1 * calc(100% + var(--grid-gap))))'
        transform: 'translateY(calc(-100% - var(--grid-gap)))'
      },

      ':is([class*=contentWrap], [class*=actionsWrap])': {
        transition: 'inherit',
        position: 'absolute',
        bottom: 0,
        // left: 0,
        transform: 'translateY(100%)',
        width: '100%',
        zIndex: 20,
        height: '100%'
      },

      ':is([class*=overline], [class*=subtitle], [class*=body], [class*=actionsWrap])': {
        // maxHeight: 0,
        // height: '100%',
        overflow: 'hidden',
        transition: 'inherit'
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
        ...theme.typography.display5,
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
