import {
  type Theme,
  type ThemeOptions,
  type ComponentsProps,
  type ComponentsOverrides,
  type ComponentsVariants,
  alpha
} from '@mui/material/styles';

const defaultProps: ComponentsProps['Form'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Form'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    'containerType': 'inline-size',
    'position': 'relative',
    'width': '100%',
    'display': 'flex',
    'flexDirection': 'column',

    '[class*="Background-root"] + [class*=Section-contentWrap] & [class*=mainContentWrap]': {
      padding: 'var(--grid-gap)',
      paddingTop: 0
    },

    '& form': {
      'border': 'solid 10px blue',
      'display': 'grid',
      'gap': 'var(--grid-gap)',

      '& .hs-recaptcha': {
        display: 'none'
      },

      '& fieldset': {
        maxWidth: '100%',
        display: 'grid',
        margin: 0,

        grid: 'none',
        gap: 'var(--grid-gap)',

        [theme.containerBreakpoints.up('lg')]: {
          gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))'
        }
      },

      '& .field.hs-form-field': {
        'marginRight': 0,
        'position': 'relative',
        'width': '100%',
        'float': 'none',
        'background': 'transparent',

        '& .input': {
          'marginRight': 0,

          '& .hs-input': {
            'width': '100%',
            'maxWidth': '100%',
            'padding': theme.spacing(2),
            'color': 'blue', //theme.palette.text.text,
            'border': `solid 2px ${theme.palette.common.black}`,
            'borderRadius': theme.spacing(0.5),

            '&:hover': {
              borderColor: theme.palette.common.black,
              boxShadow: theme.shadows[1]
            },

            '&:focus': {
              borderColor: theme.palette.common.black,
              boxShadow: theme.shadows[1]
            },

            '&:focus-visible': {
              outline: `${theme.palette.common.black} auto 0px`
            }
          },

          'input': {
            '&': {
              ...theme.typography.bodySmall,
              'height': 'auto',

              '&::placeholder': {
                opacity: 0.7
              }
            }
          },

          'textarea': {
            ...theme.typography.bodySmall,
            'height': 300,
            'maxHeight': '80vh',

            '&::placeholder': {
              opacity: 0.7
            }
          },

          'select': {
            '&': {
              ...theme.typography.bodySmall,

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
            }
          },

          '&.error': {
            borderColor: theme.palette.error.main,
            borderWidth: 1
          }
        }
      },
      '& .hs-fieldtype-checkbox.field.hs-form-field': {
        'ul': {
          listStyleType: 'none',
          padding: 0
        },

        '& .hs-form-checkbox': {
          width: 'fit-content',
          marginBottom: 'var(--grid-gap)'
        },

        '& .hs-form-checkbox-display': {
          'display': 'flex',
          'alignItems': 'center',
          'cursor': 'pointer',

          '& .hs-input': {
            visibility: 'hidden',
            width: 20,
            height: 20,
            padding: 0,
            margin: 0
          },

          '& span': {
            ...theme.typography.bodySmall,
            color: theme.palette.common.black,
            paddingLeft: 'var(--grid-gap)'
          },

          "& input[type='checkbox']::before": {
            width: 20,
            height: 20,
            position: 'absolute',
            cursor: 'pointer',
            backgroundImage:
              'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSIxOSIgaGVpZ2h0PSIxOSIgcng9IjEuNSIgc3Ryb2tlPSIjQkVCRUJFIi8+Cjwvc3ZnPgo=)',
            content: '""',
            visibility: 'visible'
          },

          "& input[type='checkbox']:checked::before": {
            backgroundImage:
              'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSIxOSIgaGVpZ2h0PSIxOSIgcng9IjEuNSIgZmlsbD0iIzA1ODBFOCIvPgo8cmVjdCB4PSIwLjUiIHk9IjAuNSIgd2lkdGg9IjE5IiBoZWlnaHQ9IjE5IiByeD0iMS41IiBzdHJva2U9IiNCRUJFQkUiLz4KPHBhdGggZD0iTTE2Ljk1NTEgNi40NzYxMkwxNS4zODc4IDVMNy45MTI3NCAxMi4wNDc2TDQuNTY3MjcgOC44OTMzMkwzIDEwLjM2OTRMNy45MTI3NyAxNUwxNi45NTUxIDYuNDc2MTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)'
          }
        }
      },

      '& .actions': {
        '& input': {
          ...theme.typography.bodySmall,

          'backgroundColor': theme.palette.common.white,
          'color': theme.palette.common.black,
          'border': `3px solid ${theme.palette.common.black}`,
          'padding': theme.spacing(0.625, 2.625), // Substract border
          'borderRadius': theme.spacing(0.5),
          'textDecoration': 'none',
          'width': '100%',

          '&:hover': {
            borderColor: theme.palette.common.black,
            backgroundColor: theme.palette.common.white
          },

          '&:active': {
            backgroundColor: theme.palette.common.white,
            borderColor: theme.palette.common.black
          }
        }
      },

      '& .hs-error-msgs': {
        'top': 'auto',
        'left': theme.spacing(2),
        'right': theme.spacing(2),
        'margin': 0,
        'padding': 0,
        'border': 0,
        'listStyle': 'none',

        '& li label': {
          ...theme.typography.bodySmall,
          display: 'block !important',
          padding: theme.spacing(0.25, 0, 0),
          color: theme.palette.error.main,
          textAlign: 'left'
        }
      }
    }
  })

  // formContainer: ({ theme, ownerState }) => ({
  //   display: ownerState?.submitted && ownerState?.hasSuccessMessage ? 'none' : 'block'
  // })
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
