import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

import { CardVariants } from './Card.types';

const defaultProps: ComponentsProps['Card'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Card'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
    containerType: 'inline-size',
    overflow: 'hidden',
    borderRadius: '8px'
  }),

  cardWrap: ({ theme, ownerState }) => ({
    'padding': 0,
    'display': 'flex',
    'flexDirection': 'column',
    'height': '100%',
    'backgroundColor': 'inherit',
    'position': 'relative',
    'transition': 'all 0.25s ease-in-out',
    'willChange': 'transform',
    'overflow': 'hidden',
    'borderRadius': '8px',
    '&:hover': {
      transform: 'scale(1)'
    },

    '.swiper-grid &': {
      'transform': 'translateZ(0) scale(1)',

      '&:hover': {
        transform: 'scale(1.05)'
      }
    },

    ...(ownerState?.variant === CardVariants.stat && {
      // padding: theme.spacing(2, 0),
      alignItems: 'center'
    }),
    ...(ownerState?.variant === CardVariants.icon && {
      alignItems: 'center',
      boxShadow: 'none'
    })
  }),

  cardMedia: ({ ownerState, theme }) => ({
    backgroundColor: 'inherit',
    padding: 0,
    ...(ownerState?.variant === CardVariants.stat &&
      {
        // paddingTop: theme.spacing(4)
      }),
    ...(ownerState?.variant === CardVariants.icon &&
      {
        // paddingTop: theme.spacing(4)
      })
  }),

  contentWrap: ({ ownerState, theme }) => ({
    flex: 1,
    padding: 0,
    // TODO: MUI Override
    paddingBottom: '0!important',

    ...(ownerState?.variant === CardVariants.stat &&
      {
        // padding: theme.spacing(4)
      })
  }),

  title: ({ ownerState, theme }) => ({
    ...(ownerState?.variant === CardVariants.stat && {
      ...theme.typography.h1
    }),
    ...(ownerState?.variant === CardVariants.icon && {
      ...theme.typography.h4
    }),

    ...(ownerState?.variant === CardVariants.blog && {
      ...theme.typography.h5
    })
  }),

  subtitle: ({ ownerState, theme }) => ({
    ...(ownerState?.variant === CardVariants.icon && {
      ...theme.typography.h3,
      // TODO: Should not be overriding fonts here
      fontWeight: 400
    }),
    ...(ownerState?.variant === CardVariants.stat && {
      ...theme.typography.h4,
      // TODO: Should not be overriding fonts here
      fontWeight: 400
    }),
    ...(ownerState?.variant === CardVariants.blog && {
      ...theme.typography.body1
    })
  }),

  actionsWrap: ({ theme }) => ({
    // padding: 'calc(var(--grid-gap) / 2)'
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
      'textAlign': 'center',
      '[class*=cardWrap]': {
        padding: theme.spacing(5, 3),
        gap: theme.spacing(2)
      },

      '[class*=cardMedia] img': {
        maxWidth: 96,
        // marginLeft: 'auto',
        // marginRight: 'auto',

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
      variant: CardVariants.stat
    },
    style: {
      'textAlign': 'center',
      '[class*=cardWrap]': {
        padding: theme.spacing(5, 3),
        gap: theme.spacing(2)
      },

      '[class*=cardMedia] img': {
        maxWidth: 96,
        // marginLeft: 'auto',
        // marginRight: 'auto',

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
      '[class*=cardWrap]': {
        boxShadow: 'none'
      },
      '[class*=contentWrap]': {
        textAlign: 'center'
      },

      '[class*=cardMedia]': {
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
      variant: CardVariants.blog
    },
    style: {
      '[class*=Card-cardWrap]': {
        gap: theme.spacing(2),
        boxShadow: 'none'
      },
      '[class*=cardMedia] img': {
        aspectRatio: '1/1'
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
