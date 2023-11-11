import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

import { RichTextVariants } from './RichText.types';

const defaultProps: ComponentsProps['RichText'] = {};

const styleOverrides: ComponentsOverrides<Theme>['RichText'] = {
  // Set some static styles
  root: ({ ownerState, theme }) => ({
    'width': '100%',
    'ol, ul': {
      'padding': '0 0 0 var(--grid-gap-double)',

      '& > li': {
        marginBottom: '1em',
        padding: 'revert'
      }
    }
  })
};

const createVariants = (theme: Theme): ComponentsVariants['RichText'] => [
  // Use prop matching to set variant styles
  {
    props: {
      variant: RichTextVariants.inline
    },
    style: {
      // TODO: Pulled from Text, but adds default padding around elements.   Classes may be wrong
      '& > [class*=Text-root] > *:not(:first-child)': {
        '&:not(:is(ul, ol, li))': {
          marginTop: '1em',
          marginBottom: '1em'
        },

        '&:is(ul, ol)': {
          marginTop: '-1em',
          marginBottom: '2em'
        },

        '&:is(span)': {
          // Image Wraps
          marginTop: '2em !important',
          marginBottom: '2em !important'
        },

        '&[class*=MuiTypography-h]': {
          marginBottom: '.5em',
          marginTop: '1em'
        },

        '&[class*=-h1]': {
          ...theme.typography.display3
        },

        '&[class*=-h2]': {
          ...theme.typography.display4
        },

        '&[class*=-h3]': {
          ...theme.typography.display5
        },

        '&[class*=-h4]': {
          ...theme.typography.display5
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
      variant: RichTextVariants.introText
    },
    style: ({ theme }: { theme: Theme }) => ({
      marginBottom: theme.spacing(4)
    })
  },

  {
    props: {
      variant: RichTextVariants.smallText
    },
    style: ({ theme }: { theme: Theme }) => ({
      '& *': {
        ...theme.typography.bodySmall
      }
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
