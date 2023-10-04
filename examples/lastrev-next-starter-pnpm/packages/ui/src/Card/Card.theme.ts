import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

import { CardVariants } from './Card.types';

const defaultProps: ComponentsProps['Card'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Card'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    containerType: 'inline-size'
  }),

  cardWrap: ({ theme, ownerState }) => ({
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

    ...(ownerState?.variant === CardVariants.icon && {
      alignItems: 'center'
    })
  }),

  media: ({ ownerState, theme }) => ({
    backgroundColor: 'inherit'
  }),

  contentWrap: ({ ownerState, theme }) => ({
    flex: 1,
    padding: 'calc(var(--grid-gap) / 2)'
  }),

  title: ({ ownerState, theme }) => ({
    ...(ownerState?.variant === CardVariants.icon && {
      ...theme.typography.h3
    }),
    ...(ownerState?.variant === CardVariants.blog && {
      ...theme.typography.body1
    }),
    fontWeight: 900
  }),

  actionsWrap: ({ theme }) => ({
    padding: 'calc(var(--grid-gap) / 2)'
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
      '[class*=cardMedia] img': {
        maxWidth: 96,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: 'var(--grid-gap)',
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
