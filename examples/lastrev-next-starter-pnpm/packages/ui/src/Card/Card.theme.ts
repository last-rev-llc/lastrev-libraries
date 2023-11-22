import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

import { CardVariants } from './Card.types';

const defaultProps: ComponentsProps['Card'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Card'] = {
  root: ({ theme, ownerState }) => ({
    containerType: 'inline-size',
    height: '100%',
    transition: 'all 0.25',
    ...(ownerState?.link && {
      '[class*="Card-title"]': {
        textDecoration: 'underline',
        textDecorationColor: 'transparent'
      },
      '&:hover': {
        '[class*="Card-title"]': {
          textDecorationColor: 'var(--mui-palette-text-primary)'
        }
      }
    })
  }),

  cardWrap: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState: { ...ownerState, color: ownerState?.color }, theme }),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    transition: 'all 0.25s ease-in-out',
    willChange: 'transform',

    // boxShadow: theme.vars.shadows[0],
    gap: theme.spacing(2),

    overflow: 'visible',
    // transform: 'scale(1)'
    ...(ownerState?.link && (ownerState?.variant === CardVariants.media || ownerState?.variant === CardVariants.blog)
      ? {
          '[class*=cardMedia] img': { transition: 'all 0.25s ease-in-out' },
          '&:hover': {
            '[class*=cardMedia] img': {
              // TODO: boxShadow: theme.vars.shadows[12],
              boxShadow: `0px 7px 8px -4px rgba(0,0,0,0.08),0px 12px 17px 2px rgba(0,0,0,0.08),0px 5px 22px 4px rgba(0,0,0,0.08)`,
              transform: 'translateY(-8px)'
            }
          }
        }
      : {}),
    ...(ownerState?.variant === CardVariants.stat && {
      // padding: theme.spacing(2, 0),
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: '8px'
    }),
    ...(ownerState?.variant === CardVariants.icon && {
      overflow: 'hidden',
      borderRadius: '8px',
      alignItems: 'center'
      // boxShadow: 'none'
    })
  }),

  cardMedia: ({ ownerState, theme }) => ({
    'transition': 'all 0.25s ease-in-out',
    'backgroundColor': 'inherit',
    'padding': 0,
    'width': '100%',
    'display': 'flex',
    'justifyContent': 'center',
    '> *': {
      objectFit: 'cover',
      width: '100%',
      height: 'auto',
      aspectRatio: '16/9'
    },
    ...(ownerState?.variant === CardVariants.stat || ownerState?.variant === CardVariants.icon
      ? {
          img: {
            width: 40,
            height: 40
          }
          // paddingTop: theme.spacing(4)
        }
      : null)
  }),

  contentWrap: ({ ownerState, theme }) => ({
    flex: 1,
    width: '100%',
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
      ...theme.typography.h1,
      color: 'var(--variant-highlight-color)'
    }),
    ...(ownerState?.variant === CardVariants.icon && {
      ...theme.typography.h4
    }),

    ...(ownerState?.variant === CardVariants.media && {
      ...theme.typography.h5
    }),
    ...(ownerState?.variant === CardVariants.blog && {
      ...theme.typography.h5
    }),

    // May be different on other variants
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis'
  }),
  bodyWrap: ({ ownerState, theme }) => ({
    minHeight: 64
  }),
  body: ({ ownerState, theme }) => ({
    '.MuiTypography-root': {
      // May be different on other variants
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis'
    }
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
  actionsWrap: ({ theme, ownerState }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    // margin: theme.spacing(0, -1),
    zIndex: 2,
    width: '100%',
    minHeight: 40,
    padding: 0,
    ...(ownerState?.variant === CardVariants.stat || ownerState?.variant === CardVariants.icon
      ? {
          justifyContent: 'center'
        }
      : null)
  }),

  link: {
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'zIndex': 1,
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
          aspectRatio: '16/9',
          width: '100%',
          height: '100%'
        }
      },

      '[class*=cardWrap]': {
        backgroundColor: 'transparent',
        overflow: 'visible',
        padding: 0,
        boxShadow: 'none'
      },
      '[class*=actionsWrap]': {
        // margin: theme.spacing(0, -1)
      },
      '[class*=cardContent]': {
        display: 'none'
      }
    }
  },
  {
    props: {
      variant: CardVariants.default
    },
    style: {
      '[class*=cardMedia]': {
        width: '100%',

        // 'overflow': 'hidden',
        img: {
          borderRadius: '8px',
          aspectRatio: '16/9',
          width: '100%',
          height: '100%'
        }
      },

      '[class*=cardWrap]': {
        backgroundColor: 'transparent',
        overflow: 'visible',
        padding: 0,
        boxShadow: 'none'
      },
      '[class*=actionsWrap]': {
        // margin: theme.spacing(0, -1)
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
        'backgroundColor': `${theme.vars.palette.cardBackground}`,
        '.MuiTypography-body1': {
          color: `${theme.vars.palette.cardBackgroundContrastText}`
        },
        'padding': theme.spacing(5, 3),
        'gap': theme.spacing(2)
      },
      '[class*=actionsWrap]': {
        // margin: theme.spacing(0, -1)
      },
      '[class*=cardMedia] img': {
        maxWidth: 96,
        // marginLeft: 'auto',
        // marginRight: 'auto',
        objectFit: 'contain',
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
        'backgroundColor': `${theme.vars.palette.cardBackground}`,
        '.MuiTypography-body1': {
          color: `${theme.vars.palette.cardBackgroundContrastText}`
        },
        'padding': theme.spacing(5, 3),
        'gap': theme.spacing(2)
      },
      '[class*=actionsWrap]': {
        // margin: theme.spacing(0, -1)
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
        boxShadow: 'none',
        background: 'transparent'
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
        backgroundColor: 'transparent',
        padding: 0,
        overflow: 'visible',
        gap: theme.spacing(2),
        boxShadow: 'none',
        borderRadius: 4,
        alignItems: 'flex-start'
      },
      '[class*=cardMedia]': {},
      '[class*=actionsWrap]': { alignItems: 'flex-end', flex: 1 },
      '[class*=cardMedia] > *': {
        aspectRatio: '16/9',
        borderRadius: 4
      }
    }
  },
  {
    props: {
      variant: CardVariants.person
    },
    style: {
      'backgroundColor': 'transparent',
      '[class*=Card-contentWrap]': {
        containerType: 'inline-size',
        // flex: 'unset',
        width: '100%',
        backgroundColor: 'transparent'
      },
      '[class*=Card-cardWrap]': {
        overflow: 'visible',
        gap: theme.spacing(3),
        boxShadow: 'none',
        borderRadius: 4,
        alignItems: 'flex-start',
        backgroundColor: 'transparent'
      },

      '[class*="Card-title"]': {
        ...theme.typography.h4
      },
      '[class*=cardMedia]': {
        'width': 80,
        'height': 80,
        // 'paddingTop': 'var(--grid-gap)',
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
    },
    MuiCardActions: {
      defaultProps: { disableSpacing: true }
    }
  }
});

export default cardTheme;
