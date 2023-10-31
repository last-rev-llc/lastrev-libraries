import {
  type Theme,
  type ThemeOptions,
  type ComponentsProps,
  type ComponentsOverrides,
  type ComponentsVariants,
  alpha,
  css
} from '@mui/material/styles';

const defaultProps: ComponentsProps['Form'] = {};

// const marketoStyles = css`
//   .mktoForm {
//     margin: 0 auto;
//     max-width: 460px !important;
//     width: 100% !important;
//     font-size: 16px !important;
//     font-family: 'Muli', sans-serif !important;
//     font-style: normal !important;
//     font-weight: 400 !important;
//     padding: 10px !important;
//   }

//   .mktoFormRow {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
//     grid-column-gap: 2rem;
//   }

//   @media only screen and (max-width: 480px) {
//     .mktoFormRow {
//       grid-template-columns: auto;
//     }
//   }

//   .mktoClear {
//     display: none;
//   }

//   .mktoForm .mktoFormCol {
//     width: 100%;
//   }

//   .mktoForm .mktoFieldWrap {
//     width: 100%;
//   }

//   .mktoErrorArrow {
//     background-color: #efefef !important;
//     border: none !important;
//   }

//   .mktoErrorMsg {
//     background: #efefef !important;
//     box-shadow: none !important;
//     border: none !important;
//     color: #ba0b51 !important;
//     text-shadow: none !important;
//     margin-top: 7px !important;
//   }

//   .mktoTextField,
//   .mktoEmailField,
//   .mktoTelField,
//   .mktoUrlField,
//   .mktoNumberField {
//     border-radius: 0 !important;
//     padding: 0.65rem !important;
//     width: 100% !important;
//     height: auto !important;
//     line-height: inherit !important;
//     font-size: inherit !important;
//     -webkit-appearance: none;
//     -moz-appearance: none;
//     border: 1px solid #ebebe8;
//   }

//   @media only screen and (max-width: 480px) {
//     .mktoTextField,
//     .mktoEmailField,
//     .mktoTelField,
//     .mktoUrlField,
//     .mktoNumberField {
//       font-size: 0.9rem !important;
//     }
//   }

//   .mktoFieldWrap {
//     /*margin-bottom: 10px !important;*/
//   }

//   .mktoOffset {
//     height: 2px !important;
//   }

//   @media only screen and (max-width: 480px) {
//     .mktoLabel {
//       top: 10px !important;
//     }
//   }

//   .mktoForm span {
//     margin-left: 0 !important;
//   }

//   .mktoLabel {
//     width: auto !important;
//     position: absolute;
//     font-size: 12px;
//     z-index: 1;
//     float: none !important;
//   }

//   .mktoLayoutLeft .mktoLabel {
//     width: auto !important;
//     position: absolute;
//     font-size: 12px;
//     z-index: 1;
//     float: none !important;
//     top: 38px;
//     left: -18px;
//   }

//   .mktoLayoutAbove .mktoLabel {
//     width: auto !important;
//     position: absolute;
//     font-size: 12px;
//     z-index: 1;
//     float: none !important;
//     top: 18px;
//     left: -12px;
//   }

//   .mktoForm select {
//     border: 1px solid #ebebe8;
//     border-radius: 0 !important;
//     width: 100% !important;
//     background: url('../images/arrow-down.svg') no-repeat 95% center !important;
//     color: #777;
//     cursor: pointer;
//     font-size: 0.9375em;
//     font-style: normal;
//     font-weight: normal;
//     height: auto;
//     max-width: none;
//     overflow: hidden;
//     padding: 0.65rem !important;
//     -webkit-appearance: none;
//     appearance: none;
//   }

//   @media only screen and (max-width: 480px) {
//     .mktoForm select {
//       font-size: 0.9rem !important;
//     }
//   }

//   /* For IE 10+ set display of drop down to none similar to appearance:none */
//   select::-ms-expand {
//     display: none;
//   }

//   .mktoButtonRow {
//     width: 100%;
//   }

//   .mktoButton {
//     -webkit-text-decoration: none;
//     text-decoration: none;
//     cursor: pointer;
//     padding: 15px 24px;
//     font-size: 15px;
//     text-align: center;
//     font-weight: 700;
//     line-height: 1em;
//     -webkit-font-smoothing: antialiased;
//     opacity: 1;
//     -webkit-transition-duration: 0.4s;
//     transition-duration: 0.4s;
//     min-width: 150px;
//     border: none;
//     background-color: #19a69d;
//     color: white;
//     border-radius: 4px;
//     margin: 24px auto 0 auto !important;
//     display: block;
//   }

//   .mktoDisclaimer {
//     /* giving this grid-row number since we want this element to be last, since the form
//   is loading from a http request, the html tree first renders the disclaimer element and
//   then the form itself, like this we ensurace it is at last position */
//     grid-row: 100;
//   }

//   .mktoDisclaimer p {
//     color: #757575;
//     font-size: 13px;
//     font-family: 'Muli', sans-serif;
//     line-height: 1rem;
//     margin: 0;
//   }

//   .mktoDisclaimer p a {
//     text-decoration: underline;
//     font-size: inherit;
//   }

//   .mktoInvalidTouched {
//     border: 2px solid #c30b55 !important;
//     border-radius: 4px !important;
//   }

//   .mktoInvalidTouched:focus {
//     border: 2px solid #c30b55 !important;
//     border-radius: 4px !important;
//     outline: 2px solid transparent;
//   }

//   .mktoTemplateBox {
//     font-weight: 700;
//     text-align: center !important;
//   }
//   .mktoTemplateBox span a {
//     font-weight: normal;
//     color: #19a69d !important;
//   }

//   @media only screen and (max-width: 345px) {
//     .mktoField {
//       width: 90% !important;
//     }
//     .mktoForm select {
//       width: 90% !important;
//     }
//   }

//   .mktoForm iframe[title='reCAPTCHA'] {
//     padding: 0;
//     margin: 10px;
//   }
// `;

const styleOverrides: ComponentsOverrides<Theme>['Form'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    'containerType': 'inline-size',
    'position': 'relative',
    'width': '100%',
    'display': 'flex',
    'flexDirection': 'column',
    // ...marketoStyles,

    '& form': {
      border: 'solid 10px blue',
      display: 'grid',
      gap: 'var(--grid-gap)'
    },

    '.mktoFormRow': {
      display: 'contents'
    },

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

    // '.error': {
    //   textAlign: 'center',
    //   background: `rgba(${theme.palette.error.main}, 0.8)`,
    //   padding: theme.spacing(0.5)
    // },
    // '.marketoDisclaimerWithMargins': {
    //   marginTop: theme.spacing(3) + ' !important',
    //   marginBottom: theme.spacing(3.75)
    // },
    // '.recaptchaContainer': {
    //   display: 'flex',
    //   justifyContent: 'center',
    //   paddingTop: theme.spacing(1) + ' !important',

    //   [theme.breakpoints.down('sm')]: {
    //     padding: 0 + ' !important',
    //     marginLeft: theme.spacing(-2.5) + ' !important',
    //     display: 'block',
    //     margin: 0
    //   }
    // }
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
