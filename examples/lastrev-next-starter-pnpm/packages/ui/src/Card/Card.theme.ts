import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

import { CardVariants } from './Card.types';

const defaultProps: ComponentsProps['Card'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Card'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
    containerType: 'inline-size',
    height: '100%',
    ...(ownerState?.link && {
      '&:hover': {
        '[class*="Card-title"]': {
          textDecoration: 'underline'
        }
      }
    })
  }),

  cardWrap: ({ theme, ownerState }) => ({
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'inherit',
    position: 'relative',
    transition: 'all 0.25s ease-in-out',
    willChange: 'transform',
    boxShadow: theme.vars.shadows[0],
    gap: theme.spacing(2),

    overflow: 'visible',
    // transform: 'scale(1)'
    ...(ownerState?.variant === CardVariants.media ||
    ownerState?.variant === CardVariants.blog ||
    ownerState?.variant === CardVariants.person
      ? {
          '[class*=cardMedia] img': { transition: 'all 0.25s ease-in-out' },
          '&:hover': {
            '[class*=cardMedia] img': {
              boxShadow: theme.vars.shadows[8]
            }
          }
        }
      : null),
    ...(ownerState?.variant === CardVariants.stat && {
      // padding: theme.spacing(2, 0),
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: '8px'
    }),
    ...(ownerState?.variant === CardVariants.icon && {
      overflow: 'hidden',
      borderRadius: '8px',
      alignItems: 'center',
      boxShadow: 'none'
    })
  }),

  cardMedia: ({ ownerState, theme }) => ({
    transition: 'all 0.25s ease-in-out',
    backgroundColor: 'inherit',
    padding: 0,
    img: {
      objectFit: 'cover'
    },
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

    ...(ownerState?.variant === CardVariants.media && {
      ...theme.typography.h5
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
    ...(ownerState?.variant === CardVariants.media && {
      ...theme.typography.body1
    }),
    ...(ownerState?.variant === CardVariants.blog && {
      ...theme.typography.body1
    })
  }),

  actionsWrap: ({ theme }) => ({
    padding: 0
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
      '[class*=cardMedia]': {
        width: '100%',

        // 'overflow': 'hidden',
        img: {
          borderRadius: '8px',
          aspectRatio: '1/1',
          width: '100%',
          height: '100%'
        }
      },

      '[class*=cardWrap]': {
        overflow: 'visible'
      },
      '[class*=actionsWrap]': {
        margin: theme.spacing(0, -1)
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
      '[class*=actionsWrap]': {
        margin: theme.spacing(0, -1)
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
      '[class*=actionsWrap]': {
        margin: theme.spacing(0, -1)
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
      '[class*=Card-contentWrap]': {
        flex: 'unset'
      },
      '[class*=Card-cardWrap]': {
        overflow: 'visible',
        gap: theme.spacing(2),
        boxShadow: 'none',
        borderRadius: 4,
        alignItems: 'flex-start'
      },
      '[class*=cardMedia]': {},
      '[class*=cardMedia] img': {
        aspectRatio: '16/9'
      }
    }
  },
  {
    props: {
      variant: CardVariants.person
    },
    style: {
      '[class*=Card-contentWrap]': {
        containerType: 'inline-size',
        // flex: 'unset',
        width: '100%'
      },
      '[class*=Card-cardWrap]': {
        overflow: 'visible', // This is a comment
        gap: theme.spacing(2), // This is another comment
        boxShadow: 'none', // This is a third comment
        borderRadius: 4, // This is a fourth comment
        alignItems: 'flex-start' // This is a fifth comment
      },
      '[class*=cardMedia]': {
        'width': 80,
        'height': 80,
        'paddingTop': 'var(--grid-gap)',
        'aspectRatio': '1 / 1',
        '& > *': {
          borderRadius: '50%',
          objectFit: 'cover',
          objectPosition: 'top',
          aspectRatio: '1 / 1',
          width: '100%',
          display: 'inline-block'
          // overflow: 'hidden'
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
