import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['RichText'] = {};

const styleOverrides: ComponentsOverrides<Theme>['RichText'] = {
  // Set some static styles
  root: ({ theme }) => ({
    'width': '100%',
    'ol, ul': {
      'padding': '0 0 0 calc(var(--grid-gap) * 1)',

      '& > li': {
        marginBottom: theme.spacing(1),
        padding: 'revert'
      }
    },

    '& > *:not(:last-child)': {
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
    },

    'overline': {
      'display': 'block',
      'fontWeight': 'var(--overline-font-weight)',
      'fontSize': 'var(--overline-font-size)',
      'lineHeight': 'var(--overline-line-height)',
      'textTransform': 'uppercase',
      '&:not(:last-child)': {
        // margin: 'var(--overline-margin)'
      }
    }
    // '& > *:not(:first-child)': {
    //   '&:is(p)': { marginBottom: 'var(--grid-gap)' },
    //   '&:not(:is(ul, ol, li))': {
    //     marginTop: '1em',
    //     marginBottom: '1em'
    //   },

    //   '&:is(span)': {
    //     // Image Wraps
    //     marginTop: '2em !important',
    //     marginBottom: '2em !important'
    //   }
    // }
  })
};

const createVariants = (theme: Theme): ComponentsVariants['RichText'] => [
  // Use prop matching to set variant styles
  {
    props: {
      variant: 'inline'
    },
    style: {
      // TODO: Pulled from Text, but adds default padding around elements.   Classes may be wrong
      // '& > [class*=Text-root] > *:not(:first-child)': {
      //   '&:not(:is(ul, ol, li))': {
      //     marginTop: '1em',
      //     marginBottom: '1em'
      //   },
      //   '&:is(ul, ol)': {
      //     marginTop: '-1em',
      //     marginBottom: '2em'
      //   },
      //   '&:is(span)': {
      //     // Image Wraps
      //     marginTop: '2em !important',
      //     marginBottom: '2em !important'
      //   },
      //   '&[class*=MuiTypography-h]': {
      //     marginBottom: '.5em',
      //     marginTop: '1em'
      //   }
      // },
      // '& > [class*=Text-root] > *:first-child': {
      //   marginTop: '0'
      // },
      // '[class*=MuiTypography-h]': {
      //   marginBottom: '.5em',
      //   marginTop: '2em'
      // }
    }
  },

  {
    props: {
      variant: 'introText'
    },
    style: ({ theme }: { theme: Theme }) => ({
      marginBottom: theme.spacing(4)
    })
  }
];

export const richTextTheme = (theme: Theme): ThemeOptions => ({
  components: {
    RichText: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default richTextTheme;
