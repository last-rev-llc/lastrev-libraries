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
  root: {
    'position': 'relative',
    'transition': 'all 0.25s ease-in-out',
    'willChange': 'transform',
    'transform': 'translateZ(0)',
    'display': 'flex',
    'flexDirection': 'column',
    'height': '100%',
    'maxWidth': '640px',

    '&:hover': {
      transform: 'scale(1.05)'
    }
  },

  link: {
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'zIndex': -1,
    'width': '100%',
    'height': '100%',
    '&:hover': {
      '.MuiCardActionArea-focusHighlight': {
        opacity: 0
      }
    }
  },

  content: { flex: 1 }
};

const createVariants = (theme: Theme): ComponentsVariants['Card'] => [
  {
    props: {
      variant: CardVariants.media
    },
    style: {
      '[class*=Card-media]': {
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
      '[class*=Card-media]': {
        // padding: theme.spacing(0),
        maxWidth: 96,
        marginLeft: 'auto',
        marginRight: 'auto',

        [theme.containerBreakpoints.up('lg')]: {
          // 'padding': theme.spacing(1),
          '& > img': {
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
      '[class*=Card-media]': {
        '& > *': {
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
      '[class*=Card-content]': {
        containerType: 'inline-size'
      },

      '[class*=cardMedia]': {
        // TODO: Margin and padding here should match the content.   Mixin?
        // 'marginBottom': theme.spacing(-2),
        '& > *': {
          borderRadius: '50%',
          aspectRatio: '1 / 1',
          width: '100%',
          // padding: theme.spacing(2),

          display: 'inline-block',
          overflow: 'hidden'
        }
      },

      '[class*=Card-title]': {
        // TODO: Saving container query for later
        // [`@container (min-width: ${theme.breakpoints.values.xs}${theme.breakpoints.unit})`]: {
        //   backgroundColor: 'blue'
        // }
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
