import {
  type ThemeOptions,
  type ComponentsProps,
  type ComponentsOverrides,
  type ComponentsVariants
} from '@mui/material/styles';

import { type Theme } from '../ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['FormPeru'] = {};

const styleOverrides: ComponentsOverrides<Theme>['FormPeru'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
    containerType: 'inline-size',
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 0
  }),

  disclaimerTextWrap: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState: { backgroundColor: 'navy' }, theme }),
    'padding': 'var(--section-padding) 0',

    '& > *': {
      gridColumnStart: 'start',
      gridColumnEnd: 'end',

      [theme.containerBreakpoints.up('md')]: {
        gridColumnStart: 'two-start',
        gridColumnEnd: 'ten-end'
      }
    }
  }),

  formWrap: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState: { backgroundColor: 'lightGray' }, theme }),
    padding: 'var(--section-padding) 0'
  }),

  successItems: {
    '& > *': {
      padding: 'var(--section-padding) 0'
    }
  },

  formFields: ({ theme, ownerState }) => ({
    'gridColumnStart': 'start',
    'gridColumnEnd': 'end',

    [theme.containerBreakpoints.up('md')]: {
      gridColumnStart: 'two-start',
      gridColumnEnd: 'ten-end'
    },

    'label': {
      ...theme.typography.h5,

      color: 'var(--mui-palette-text-primary) !important'
    },

    '.MuiInput-root::before': {
      borderColor: 'var(--mui-palette-text-primary) !important',
      opacity: 0.5
    },

    '.MuiInput-root::after': {
      borderColor: 'var(--mui-palette-text-primary) !important',
      opacity: 0.5
    }
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['FormPeru'] => [];

export const formPeruTheme = (theme: Theme): ThemeOptions => ({
  components: {
    FormPeru: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default formPeruTheme;
