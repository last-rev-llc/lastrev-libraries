import {
  type Theme,
  type ThemeOptions,
  type ComponentsProps,
  type ComponentsOverrides,
  type ComponentsVariants,
  alpha
} from '@mui/material/styles';

const defaultProps: ComponentsProps['FormContactUs'] = {};

const styleOverrides: ComponentsOverrides<Theme>['FormContactUs'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    containerType: 'inline-size',
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  }),

  sideContentWrap: ({ theme }) => ({
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',
    paddingBottom: 'var(--grid-gap-double)',

    [theme.containerBreakpoints.up('md')]: {
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

  contentWrap: ({ theme }) => ({
    backgroundColor: theme.palette.white.main,
    padding: 'var(--grid-gap-double)',
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    [theme.containerBreakpoints.up('md')]: {
      gridColumnStart: 'five-start',
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
      'gridColumnStart': 'content-start',
      'gridColumnEnd': 'content-end',

      '*': {
        ...theme.typography.h4,
        fontWeight: 'unset',
        marginBottom: 0,
        lineHeight: 1
      },

      'label': {
        opacity: 0.5,
        color: 'var(--text-color) !important'
      },

      '.MuiInput-root::before': {
        borderColor: 'var(--text-color) !important',
        opacity: 0.5
      },

      '.MuiInput-root::after': {
        borderColor: 'var(--text-color) !important',
        opacity: 0.5
      },

      [theme.containerBreakpoints.up('md')]: {
        ...((ownerState?.formLayout === 'twoColumn' || ownerState?.formLayout === 'block') && {
          '&:nth-child(odd)': {
            gridColumnStart: 'content-start',
            gridColumnEnd: 'content-half'
          },

          '&:nth-child(even)': {
            gridColumnStart: 'content-half',
            gridColumnEnd: 'content-end'
          },

          '&[class*=fullWidth]': {
            gridColumnStart: 'content-start',
            gridColumnEnd: 'content-end'
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
