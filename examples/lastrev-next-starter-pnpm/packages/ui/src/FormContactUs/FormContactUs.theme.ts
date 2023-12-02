import {
  type ThemeOptions,
  type ComponentsProps,
  type ComponentsOverrides,
  type ComponentsVariants
} from '@mui/material/styles';

import { type Theme } from '../ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['FormContactUs'] = {};

const styleOverrides: ComponentsOverrides<Theme>['FormContactUs'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
    containerType: 'inline-size',
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  }),

  sideContentWrap: ({ theme }) => ({
    gridColumnStart: 'start',
    gridColumnEnd: 'end',
    paddingBottom: 'var(--grid-gap-double)',

    [theme.containerBreakpoints.up('md')]: {
      gridColumnEnd: 'half'
    }
  }),

  detailsLabel: {
    '&': {
      paddingBottom: 'var(--grid-gap)'
    }
  },

  sideContentInnerWrap: {
    'display': 'flex',
    'flexDirection': 'column',
    'borderLeft': 'solid',
    'borderLeftWidth': '1px',
    'paddingLeft': 'var(--grid-gap)',

    '& > *': {
      marginBottom: 0
    }
  },

  address: {
    whiteSpace: 'pre-line'
  },

  contentWrap: ({ theme }) => ({
    ...theme.mixins.applyColorScheme({ ownerState: { backgroundColor: 'white' }, theme }),
    padding: 'var(--grid-gap-double)',
    gridColumnStart: 'start',
    gridColumnEnd: 'end',

    [theme.containerBreakpoints.up('md')]: {
      gridColumnStart: 'half',
      gridColumnEnd: 'full-end',
      paddingRight: 'var(--grid-margin)'
    }
  }),

  bodyHeader: {
    '&:not(:first-of-type)': {
      paddingTop: 'var(--grid-gap)',
      marginTop: 'var(--grid-gap)',
      borderTop: 'solid',
      borderTopWidth: '1px'
    }
  },

  formFields: ({ theme, ownerState }) => ({
    'paddingBottom': 'var(--grid-gap-double)',
    '& > *': {
      'gridColumnStart': 'start',
      'gridColumnEnd': 'end',

      '*': {
        ...theme.typography.h5,
        fontWeight: 'unset',
        marginBottom: 0,
        lineHeight: 1
      },

      'label': {
        opacity: 0.5,
        color: 'var(--mui-palette-text-primary) !important'
      },

      '.MuiInput-root::before': {
        borderColor: 'var(--mui-palette-text-primary) !important',
        opacity: 0.5
      },

      '.MuiInput-root::after': {
        borderColor: 'var(--mui-palette-text-primary) !important',
        opacity: 0.5
      },

      [theme.containerBreakpoints.up('md')]: {
        ...((ownerState?.formLayout === 'twoColumn' || ownerState?.formLayout === 'block') && {
          '&:nth-child(odd)': {
            gridColumnStart: 'start',
            gridColumnEnd: 'half'
          },

          '&:nth-child(even)': {
            gridColumnStart: 'half',
            gridColumnEnd: 'end'
          },

          '&[class*=fullWidth]': {
            gridColumnStart: 'start',
            gridColumnEnd: 'end'
          }
        })
      }
    }
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['FormContactUs'] => [];

export const formContactUsTheme = (theme: Theme): ThemeOptions => ({
  components: {
    FormContactUs: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default formContactUsTheme;
