import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

import { CardPricingVariants } from './CardPricing.types';

const defaultProps: ComponentsProps['CardPricing'] = {};

const styleOverrides: ComponentsOverrides<Theme>['CardPricing'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    containerType: 'inline-size'
  }),

  cardWrap: ({ theme, ownerState }) => ({
    'padding': 0,
    'display': 'flex',
    'flexDirection': 'column',
    'height': '100%',
    // 'boxShadow': 'initial',
    // 'borderRadius': 0,
    'backgroundColor': 'inherit',
    'position': 'relative',
    'transition': 'all 0.25s ease-in-out',
    'willChange': 'transform',
    'color': 'inherit',

    'overflow': 'hidden',
    '&:hover': {
      transform: 'scale(1)'
    },

    '.swiper-grid &': {
      'transform': 'translateZ(0) scale(1)',

      '&:hover': {
        transform: 'scale(1.05)'
      }
    },

    ...(ownerState?.variant === CardPricingVariants.stat && {
      // padding: theme.spacing(2, 0),
      alignItems: 'center'
    }),
    ...(ownerState?.variant === CardPricingVariants.icon && {
      alignItems: 'center',
      boxShadow: 'none'
    })
  }),

  cardMedia: ({ ownerState, theme }) => ({
    backgroundColor: 'inherit',
    padding: 0,
    ...(ownerState?.variant === CardPricingVariants.stat &&
      {
        // paddingTop: theme.spacing(4)
      }),
    ...(ownerState?.variant === CardPricingVariants.icon &&
      {
        // paddingTop: theme.spacing(4)
      })
  }),

  contentWrap: ({ ownerState, theme }) => ({
    flex: 1,
    padding: 0,
    // TODO: MUI Override
    paddingBottom: '0!important',

    ...(ownerState?.variant === CardPricingVariants.stat &&
      {
        // padding: theme.spacing(4)
      })
  }),

  title: ({ ownerState, theme }) => ({
    ...(ownerState?.variant === CardPricingVariants.stat && {
      ...theme.typography.h1
    }),
    ...(ownerState?.variant === CardPricingVariants.stat && {
      ...theme.typography.h1
    }),
    ...(ownerState?.variant === CardPricingVariants.blog && {
      ...theme.typography.body1
    })
  }),

  subtitle: ({ ownerState, theme }) => ({
    ...(ownerState?.variant === CardPricingVariants.stat && {
      ...theme.typography.h3,
      // TODO: Should not be overriding fonts here
      fontWeight: 400
    }),
    ...(ownerState?.variant === CardPricingVariants.stat && {
      ...theme.typography.h3,
      // TODO: Should not be overriding fonts here
      fontWeight: 400
    }),
    ...(ownerState?.variant === CardPricingVariants.blog && {
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
      '.MuiCardPricingActionArea-focusHighlight': {
        opacity: 0
      }
    }
  }
};

const createVariants = (theme: Theme): ComponentsVariants['CardPricing'] => [
  {
    props: {
      variant: CardPricingVariants.media
    },
    style: {
      '[class*=CardPricing-cardMedia]': {
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
      variant: CardPricingVariants.icon
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
      variant: CardPricingVariants.stat
    },
    style: {
      'textAlign': 'center',

      '[class*=cardMedia]': {
        paddingTop: 'var(--grid-gap)'
      },
      '[class*=cardMedia] img': {
        maxWidth: 96,
        marginLeft: 'auto',
        marginRight: 'auto',
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
      variant: CardPricingVariants.logo
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
      variant: CardPricingVariants.pricing
    },
    style: {
      '& [class*=CardPricing-content] > *': {
        textAlign: 'center',
        display: 'block'
      },

      '& [class*=CardPricing-title]': {
        ...theme.typography.display1,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
      },

      '& [class*=CardPricing-subtitle]': {
        ...theme.typography.display5,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
      }
    }
  },
  {
    props: {
      variant: CardPricingVariants.person
    },
    style: {
      '[class*=CardPricing-contentWrap]': {
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
    CardPricing: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default cardTheme;
