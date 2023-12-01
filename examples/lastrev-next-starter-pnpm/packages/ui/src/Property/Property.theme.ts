import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

import { type Theme } from '../ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Property'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Property'] = {
  root: ({ theme }) => ({
    ...theme.mixins.applyColorScheme({ ownerState: { backgroundColor: 'white' }, theme }),
    containerType: 'inline-size',
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--section-padding) 0 0'
  }),

  sideContentWrap: ({ theme }) => ({
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',
    paddingBottom: 'var(--grid-gap-double)',

    [theme.containerBreakpoints.up('lg')]: {
      gridColumnStart: 'content-start',
      gridColumnEnd: 'five-end'
    }
  }),

  sideContentInnerWrap: {
    'display': 'flex',
    'flexDirection': 'column',

    '& > *': {
      marginBottom: 0
    }
  },

  bodyListItem: {
    'padding': 'var(--grid-gap-quarter) 0',

    '& *': {
      marginBottom: 0
    }
  },

  listLabel: ({ theme }) => ({
    ...theme.typography.bodySmall,
    fontWeight: 800
  }),

  listValue: ({ theme }) => ({
    ...theme.typography.bodySmall
  }),

  contentWrap: ({ theme }) => ({
    'gridColumnStart': 'content-start',
    'gridColumnEnd': 'content-end',

    [theme.containerBreakpoints.up('lg')]: {
      gridColumnStart: 'six-start',
      gridColumnEnd: 'full-end',
      paddingRight: 'var(--grid-margin)'
    },

    '& > *': {
      [theme.containerBreakpoints.up('lg')]: {
        paddingTop: '0 !important'
      }
    }
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['Property'] => [];

export const propertyTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Property: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default propertyTheme;
