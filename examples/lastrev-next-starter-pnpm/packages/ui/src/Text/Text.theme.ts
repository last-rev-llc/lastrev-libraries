import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Text'] = {
  variant: TextVariants.default
};

import { TextVariants } from './Text.types';

const styleOverrides: ComponentsOverrides<Theme>['Text'] = {
  // Set some static styles
  root: {
    'width': '100%',
    'display': 'unset',
    'ol, ul, li': {
      /* Revert padding reset is what gives the indentation to list */

      padding: 'revert'
    },

    '> *:not(:last-child)': {
      '&:is(p)': {
        marginBottom: 'var(--grid-gap)'
      }
    },
    'main > &': {
      'display': 'grid',

      '& > *': {
        display: 'unset',
        gridColumn: 'content-start/content-end'
      }
    }
  },

  title: ({ theme, ownerState }) => ({
    ...(ownerState?.variant === TextVariants.default && {
      ...theme.typography.h2
    }),

    ...(ownerState?.variant === TextVariants.introText && {
      ...theme.typography.h1
    })
  }),

  subtitle: ({ theme, ownerState }) => ({
    ...(ownerState?.variant === TextVariants.default && {
      ...theme.typography.h3
    }),

    ...(ownerState?.variant === TextVariants.introText && {
      ...theme.typography.h2
    })
  })
  //
  // Use the ownerState to set dynamic styles
  // root: ({ ownerState, theme }) => {
  //   return {
  //     backgroundColor: ownerState.variant === 'example' ? 'red' : theme.vars.palette.background.paper
  //   };
  // }
};

const createVariants = (theme: Theme): ComponentsVariants['Text'] => [
  // Use prop matching to set variant styles
  {
    props: {
      variant: 'inline'
    },
    style: {
      // TODO: Pulled from Text, but adds default padding around elements.   Classes may be wrong
      '& > [class*=Text-root] > *:not(:first-child)': {
        '&:not(:is(ul, ol, li))': {
          marginTop: '1em',
          marginBottom: '2em'
        },

        '&:is(ul, ol)': {
          marginTop: '-1em',
          marginBottom: '3em'
        }
      },

      '& > [class*=Text-root] > *:first-child': {
        marginTop: '0'
      },

      '[class*=MuiTypography-h]': {
        marginBottom: '.5em',
        marginTop: '2em'
      }
    }
  },

  {
    props: {
      variant: 'introText'
    },
    style: {
      'textAlign': 'center',
      'marginBottom': theme.spacing(3),
      '> *': {
        '&:is(p)': {
          marginBottom: theme.spacing(2)
        },
        '&:is(ul, ol)': {
          margin: 0,
          marginBottom: theme.spacing(2)
        },
        '[class*=MuiTypography-h1]': {
          margin: 'var(--h1-margin)'
        },
        '[class*=MuiTypography-h2]': {
          margin: 'var(--h2-margin)'
        },
        '[class*=MuiTypography-h3]': {
          margin: 'var(--h3-margin)'
        },
        '[class*=MuiTypography-h4]': {
          margin: 'var(--h4-margin)'
        },
        '[class*=MuiTypography-h5]': {
          margin: 'var(--h5-margin)'
        },
        '[class*=MuiTypography-h6]': {
          margin: 'var(--h6-margin)'
        },
        '[class*=MuiTypography-display1]': {
          margin: 'var(--display2-margin)'
        },
        '[class*=MuiTypography-display2]': {
          margin: 'var(--display2-margin)'
        }
      }
    }
  }
];

export const textTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Text: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          ins: {
            textDecoration: 'none',
            color: 'var(--variant-highlight-color)'
          }
        }
      }
    }
  }
});

export default textTheme;
