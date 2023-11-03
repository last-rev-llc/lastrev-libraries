import {
  type Theme,
  type ThemeOptions,
  type ComponentsProps,
  type ComponentsOverrides,
  type ComponentsVariants,
  alpha
} from '@mui/material/styles';
import { FormVariants } from './Form.types';

const defaultProps: ComponentsProps['Form'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Form'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    containerType: 'inline-size',
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  }),

  recaptchaWrap: {
    order: 1,
    margin: '0 auto var(--grid-gap)'
  },

  formWrap: ({ theme, ownerState }) => ({
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'space-between',

    '&& form': {
      'display': 'contents',
      ':is( .mktoPlaceholder, .mktoOffset, .mktoClear, .mktoGutter, .mktoButtonWrap,  .mktoClear, .mktoGutter, .mktoOffset)':
        {
          display: 'contents'
        },

      '.mktoFormRow': {
        display: 'flex',
        flexDirection: 'row',
        gap: 'var(--grid-gap)'
      },

      '.mktoFormCol': {
        float: 'unset',
        width: '100%',
        marginBottom: 'var(--grid-gap) !important'
      },

      '.mktoError': {
        'bottom': '.5em !important',
        'left': 'var(--grid-gap) !important',
        'right': 'unset !important',
        'top': 'unset !important',
        'fontSize': '.75em',
        '*': {
          backgroundColor: 'transparent',
          backgroundImage: 'unset',
          border: 'unset !important',
          textShadow: 'unset',
          boxShadow: 'unset',
          color: theme.vars.palette.error.main,
          fontSize: 'inherit',
          padding: 0,
          margin: 0,
          display: 'inline !important'
        }
      },

      ':is(label)': {
        display: 'none'
      },

      '.mktoFieldWrap': {
        order: 0,
        float: 'unset',
        width: '100%',
        height: '100%',
        position: 'relative'
      },

      '.mktoButtonRow': {
        width: '100%',
        margin: 'auto',
        order: 2
      },

      ':is(select, input, textarea)': {
        ...theme.typography.body1,
        'height': 'auto',
        'width': '100% !important',
        'maxWidth': '100%',
        'padding': 'var(--grid-gap)',
        'border': 'unset',
        'borderBottomStyle': `solid`,
        'borderBottomWidth': `2px`,
        'borderRadius': 0,
        'backgroundColor': '#efefef',

        '&[aria-invalid=true]': {
          borderBottomColor: theme.vars.palette.error.main
        },

        '&::placeholder': {
          opacity: 0.7
        },

        '&:hover': {
          borderColor: theme.vars.palette.common.black,
          boxShadow: theme.shadows[1]
        },

        '&:focus': {
          borderColor: theme.vars.palette.common.black,
          boxShadow: theme.shadows[1]
        },

        '&:focus-visible': {
          outline: `${theme.vars.palette.common.black} auto 0px`
        }
      },

      'textarea': {
        height: 300,
        maxHeight: '80vh'
      },

      'select': {
        'appearance': 'none',
        'backgroundImage':
          'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxNyAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gXAogICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMS45OTc1IDAuNzM3NTQ5TDguNSA2LjQ2MjU1TDE1LjAwMjUgMC43Mzc1NDlMMTcgMi41MDAwNUw4LjUgMTBMMCAyLjUwMDA1TDEuOTk3NSAwLjczNzU0OVoiIGZpbGw9IiNBNEE0QTQiLz4gXAogICAgICAgICAgICAgICAgICAgIDwvc3ZnPg==)',
        'backgroundPosition': 'right center',
        'backgroundRepeat': 'no-repeat',
        'backgroundSize': 17,
        'backgroundOrigin': 'content-box',

        '&.is-placeholder': {
          color: alpha(theme.palette.common.black, 0.7)
        }
      },

      'button': {
        ...theme.typography.body1,

        'backgroundColor': theme.vars.palette.common.white,
        'color': theme.vars.palette.common.black,
        'border': `3px solid ${theme.vars.palette.common.black}`,
        'padding': theme.spacing(0.625, 2.625), // Substract border
        'borderRadius': theme.spacing(0.5),
        'textDecoration': 'none',
        'width': 'unset',
        'margin': '0 auto',
        'display': 'block',

        '&:hover': {
          borderColor: theme.vars.palette.common.black,
          backgroundColor: theme.vars.palette.common.white
        },

        '&:active': {
          backgroundColor: theme.vars.palette.common.white,
          borderColor: theme.vars.palette.common.black
        }
      }
    }
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['Form'] => [];

export const formTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Form: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default formTheme;
