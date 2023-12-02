import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Text'] = {
  variant: TextVariants.default
};

import { TextVariants } from './Text.types';

const styleOverrides: ComponentsOverrides<Theme>['Text'] = {
  root: {
    'width': '100%',
    'display': 'unset',
    'ol, ul, li': {
      /* Revert padding reset is what gives the indentation to list */

      padding: 'revert'
    },

    '& > *:last-child': {
      paddingBottom: 0,
      marginBottom: 0
    },

    'main > &': {
      'display': 'grid',

      '& > *': {
        display: 'unset',
        gridColumn: 'start/end'
      }
    }
  },

  titleIcon: ({ theme }) => ({
    maxWidth: '96px',
    paddingRight: 'var(--grid-gap)',

    [theme.containerBreakpoints.up('lg')]: {
      '& > :is(img, svg)': {
        objectFit: 'contain'
      }
    }
  }),

  bodyWrap: ({ ownerState, theme }) => ({
    '&&': {
      ...(ownerState?.variant === 'thin'
        ? {
            gridColumnStart: 'start',
            gridColumnEnd: 'end',

            [theme.breakpoints.up('lg')]: {
              gridColumnStart: 'two-start',
              gridColumnEnd: 'eleven-end'
            }
          }
        : {
            display: 'contents'
          })
    },

    '& > *:last-child': {
      marginBottom: 0
    }
  }),

  titleWrap: {
    display: 'flex'
  },

  title: ({ theme, ownerState }) => ({
    ...(ownerState?.variant === TextVariants.default && {
      ...theme.typography.h4
    }),

    ...(ownerState?.variant === TextVariants.introText && {
      ...theme.typography.h3
    })
  }),

  subtitle: ({ theme }) => ({
    ...theme.typography.h5
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['Text'] => [
  // Use prop matching to set variant styles
  {
    props: {
      variant: TextVariants.inline
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
      variant: TextVariants.introText
    },
    style: ({ theme }: { theme: Theme }) => ({
      marginBottom: theme.spacing(4)
    })
  }
];

export const textTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Text: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default textTheme;
