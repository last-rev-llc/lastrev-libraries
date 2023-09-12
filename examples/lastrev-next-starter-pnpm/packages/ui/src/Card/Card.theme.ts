import {
  TypographyStyle,
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['Card'] = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['Card'] = {
  root: ({ theme }) => ({
    'padding': theme.spacing(2),
    'position': 'relative',
    'boxShadow': `0 0 0 1px ${theme.palette.secondary.main}, 0 0 0 1px ${theme.palette.secondary.main}`,
    'border': `solid 3px transparent`,
    'transition': 'all 0.25s ease-in-out',
    'willChange': 'transform',
    'transform': 'translateZ(0)',
    'backgroundColor': theme.palette.common.white,
    '& *': {
      color: theme.palette.common.black
    },

    '&:hover': {
      transform: 'scale(1.05)',
      border: `solid 3px ${theme.palette.secondary.main}`
    }
  }),

  cardLink: () => ({
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'zIndex': 10,
    'width': '100%',
    'height': '100%',
    '&:hover': {
      '.MuiCardActionArea-focusHighlight': {
        opacity: 0
      }
    }
  }),

  cardMedia: ({ theme, ownerState }) => ({
    'display': 'block',
    'position': 'relative',
    'width': '100%',
    'paddingBottom': theme.spacing(2),

    '& > span': {
      width: '100% !important',
      height: '100% !important'
    },

    ...(ownerState?.variant === 'icon' && {
      padding: theme.spacing(0),
      maxWidth: 48,

      [theme.breakpoints.up('lg')]: {
        'padding': theme.spacing(1),
        'maxWidth': 64,
        '& > img': {
          objectFit: 'contain'
        }
      }
    })
  }),

  cardActions: ({ theme }) => ({
    padding: 0,
    marginTop: theme.spacing(1),
    flexDirection: 'column',

    [theme.breakpoints.up('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  }),

  cardAction: () => ({
    paddingLeft: 0,
    marginLeft: 0
  }),

  cardContent: ({ theme, ownerState }) => ({
    ...(ownerState?.variant === 'icon' && {
      '&:last-child': {
        padding: theme.spacing(0)
      }
    })
  }),

  eyebrow: ({ theme }) => ({
    ...theme.typography.body2
  }),

  title: ({ theme }) => ({
    ...theme.typography.h6
  }),

  subtitle: () => ({}),

  body: ({ theme, ownerState }) => ({
    '& *': {
      ...theme.typography.bodySmall
    },

    ...(ownerState?.variant === 'icon' && {
      marginTop: theme.spacing(1)
    })
  })
};

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (theme: Theme): ComponentsVariants['Card'] => [
  {
    props: {
      variant: 'mediaFill'
    },
    style: {
      '[class*=cardMedia]': {
        'width': '100%',

        '& > *': {
          objectFit: 'fill',
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
      variant: 'mediaContain'
    },
    style: {
      '[class*=cardMedia]': {
        '& > *': {
          objectFit: 'contain',
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
      variant: 'mediaSquare'
    },
    style: {
      '[class*=cardMedia]': {
        'aspectRatio': '1/1',
        'width': '100%',

        '& > *': {
          objectFit: 'cover',
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
      variant: 'default'
    },
    style: {
      'padding': theme.spacing(2),
      'display': 'flex',
      'flexDirection': 'column',
      'height': '100%',

      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing(1),
        padding: theme.spacing(3, 3, 2, 4)
      },

      [theme.breakpoints.up('lg')]: {
        flexDirection: 'column',
        gap: 0,
        padding: theme.spacing(2),
        alignItems: 'normal'
      },

      '[class$=Card-cardMedia]': {
        'display': 'flex',
        'flexDirection': 'column',
        'alignItems': 'center',
        'borderRadius': theme.spacing(1),
        '[class$=Media-root]': {
          margin: 0,
          borderRadius: theme.spacing(1),
          objectFit: 'cover',
          aspectRatio: '424/240'
        },

        [theme.breakpoints.up('md')]: {
          flex: '2 1 0px',
          width: 0
        },

        [theme.breakpoints.up('lg')]: {
          flex: 'unset',
          width: 'unset'
        }
      },

      '[class$=Card-eyebrow]': {
        ...theme.typography.body2,
        marginBottom: theme.spacing(2),
        textTransform: 'uppercase',
        color: theme.palette.grey[500],

        [theme.breakpoints.up('md')]: {
          marginBottom: theme.spacing(1)
        },

        [theme.breakpoints.up('lg')]: {
          marginBottom: theme.spacing(2)
        }
      },

      '[class$=Card-title]': {
        marginBottom: theme.spacing(1)
      },

      '[class$=Card-cardContent]': {
        '&:last-child': {
          padding: theme.spacing(1),
          zIndex: 100,

          [theme.breakpoints.up('md')]: {
            flex: '3 1 0px',
            width: 0
          },

          [theme.breakpoints.up('lg')]: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            width: 'unset'
          }
        }
      },

      '[class$=Card-body]': {
        flex: 1
      },

      '[class$=Card-cardActions]': {
        padding: 0,
        marginTop: theme.spacing(8),
        justifyContent: 'space-between',
        flexDirection: 'column',
        gap: theme.spacing(1, 4),

        [theme.breakpoints.up('md')]: {
          flexDirection: 'column'
        }
      },

      '[class$=CategoryTag-root]': {
        overflow: 'hidden'
      },

      '[class$=Card-cardAction]': {
        paddingRight: 0,
        whiteSpace: 'nowrap',
        justifyContent: 'flex-end',
        marginLeft: 'auto'
      }
    }
  },
  {
    props: {
      variant: 'pricing'
    },
    style: {
      'padding': theme.spacing(2),
      'display': 'flex',
      'flexDirection': 'column',
      'height': '100%',
      'backgroundColor': theme.palette.common.white,
      'willChange': 'transform',
      'transform': 'translateZ(0)',

      '& *': {
        textAlign: 'center',
        color: theme.palette.common.black
      },

      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        alignItems: 'flex-start'
      },

      '[class$=Card-cardMedia]': {
        display: 'none'
      },

      '[class$=Card-eyebrow]': {
        ...theme.typography.h4,
        'color': theme.palette.common.black,
        'marginBottom': theme.spacing(2),
        'textTransform': 'uppercase',
        'position': 'relative',
        'display': 'block',

        '&::after': {
          margin: `${theme.spacing(2)} auto 0`,
          height: theme.spacing(0.25),
          width: theme.spacing(4),
          backgroundColor: theme.palette.grey[500],
          display: 'block',
          content: '""'
        },

        [theme.breakpoints.up('md')]: {
          ...theme.typography.h5,
          marginBottom: theme.spacing(1)
        },
        [theme.breakpoints.up('lg')]: {
          marginBottom: theme.spacing(2)
        }
      },

      '[class$=Card-title]': {
        ...theme.typography.h5,
        color: theme.palette.common.black,
        marginBottom: theme.spacing(1),

        [theme.breakpoints.up('md')]: {
          ...theme.typography.h3
        }
      },

      '[class$=Card-subtitle]': {
        ...theme.typography.body2,
        fontWeight: 100,
        color: theme.palette.grey[500],
        marginBottom: theme.spacing(1)
      },

      '[class$=Card-cardContent]': {
        padding: 0,
        flex: 1,
        width: '100%'
      },

      '[class$=Card-body]': {
        flex: 1
      },

      '[class$=MuiTypography-root]': {
        textAlign: 'left'
      },

      '[class$=Card-cardActions]': {
        padding: 0,
        marginTop: theme.spacing(8),
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: theme.spacing(1, 4),

        [theme.breakpoints.up('md')]: {
          flexDirection: 'row'
        }
      },

      '[class$=CategoryTag-root]': {
        overflow: 'hidden'
      },

      '[class$=Card-cardAction]': {
        paddingRight: 0,
        whiteSpace: 'nowrap',
        justifyContent: 'flex-end',
        marginLeft: 'auto'
      },

      '&:hover': {
        'backgroundColor': theme.palette.primary.main,
        'color': theme.palette.common.black,
        'transform': 'scale(1.15)',
        'position': 'relative',
        'zIndex': 2,

        '& *': {
          color: theme.palette.common.black
        }
      }
    }
  }
];

export default (theme: Theme): ThemeOptions => ({
  components: {
    Card: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});
