import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['Person'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Person'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
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
    paddingBottom: 'calc(2 * var(--grid-gap))',

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

  detailsLabel: {
    '&': {
      paddingBottom: 'var(--grid-gap)'
    }
  },

  bodyHeader: {
    '&:not(:first-of-type)': {
      paddingTop: 'var(--grid-gap)',
      marginTop: 'var(--grid-gap)',
      borderTop: 'solid',
      borderTopWidth: '1px'
    }
  },

  bodyList: {
    padding: 0
  },

  bodyListItem: {
    'paddingLeft': 0,
    '&::before': {
      content: '"– "' /* en dash */,
      display: ' inline-block',
      marginRight: '.25em'
    }
  },

  contentWrap: ({ theme }) => ({
    backgroundColor: theme.palette.white.main,
    padding: 'calc(2 * var(--grid-gap))',
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

const createVariants = (_theme: Theme): ComponentsVariants['Person'] => [];

export const personTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Person: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default personTheme;
