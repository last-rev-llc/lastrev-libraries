import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

import { type Theme } from '../ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Property'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Property'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
    containerType: 'inline-size',
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--section-padding) 0'
  }),

  sideContentWrap: ({ theme }) => ({
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',
    paddingBottom: 'var(--grid-gap-double)',

    [theme.containerBreakpoints.up('lg')]: {
      gridColumnStart: 'content-start',
      gridColumnEnd: 'four-end'
    }
  }),

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

  listLabel: {},

  listValue: {},

  bodyHeader: {
    '&:not(:first-of-type)': {
      paddingTop: 'var(--grid-gap)',
      marginTop: 'var(--grid-gap)',
      borderTop: 'solid',
      borderTopWidth: '1px'
    }
  },

  bodyListItem: ({ theme }) => ({
    'padding': 'var(--grid-gap) 0',

    'borderTopWidth': '1px',
    'borderTopStyle': 'solid',
    '& *': {
      ...theme.typography.h5,
      marginBottom: 0
    }
  }),

  contentWrap: ({ theme }) => ({
    ...theme.mixins.applyColorScheme({ ownerState: { backgroundColor: 'white' }, theme }),
    padding: 'var(--grid-gap-double)',
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    [theme.containerBreakpoints.up('lg')]: {
      gridColumnStart: 'five-start',
      gridColumnEnd: 'full-end',
      paddingRight: 'var(--grid-margin)'
    }
  })

  // name: {},
  // jobTitle: {},
  // email: {}
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