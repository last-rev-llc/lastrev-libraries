import React from 'react';
import NextScript from 'next/script';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormMarketoEmbedProps } from './FormMarketoEmbed.types';

/* 
    Add modifiers to be able to target specific fields
 */
function addFieldModifiers(data: any) {
  const formEl = data.getFormElem();
  const fieldWrappers = formEl.find('.mktoFieldWrap');
  fieldWrappers.each((_: any, element: any) => {
    const currClasses = element.getAttribute('class');
    const isInput = Object.keys(element.children).find((key) => element.children[key].nodeName === 'INPUT');
    const isSelect = Object.keys(element.children).find((key) => element.children[key].nodeName === 'SELECT');
    if (isInput) {
      const inputType = element.children[isInput].getAttribute('type');
      element.setAttribute('class', `${currClasses} -${inputType}`);
    } else if (isSelect) {
      element.setAttribute('class', `${currClasses} -select`);
    }
  });
}

export const FormMarketoEmbed = ({ baseUrl, munchkinId, formId }: FormMarketoEmbedProps) => {
  return (
    <Root>
      <Script
        id="marketo"
        src={`${baseUrl}/js/forms2/js/forms2.min.js`}
        onLoad={() => {
          window.MktoForms2.loadForm(baseUrl, munchkinId, formId, addFieldModifiers);
        }}
      />
      <Form id={`mktoForm_${formId}`} />
    </Root>
  );
};

export default FormMarketoEmbed;

const Root = styled(Box, {
  name: 'FormMarketoEmbed',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => styles.root
})``;

const Script = styled(NextScript, {
  name: 'FormMarketoEmbed',
  slot: 'Script',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => styles.script
})``;

const Form = styled('form', {
  name: 'FormMarketoEmbed',
  slot: 'Form',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => styles.form
})<{ variant?: string }>(({ theme }) => {
  const placeholder = {
    color: '#fff',
    opacity: 0.5,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter
    })
  };
  return {
    'width': '100% !important',
    'paddingRight': '10px',
    '& div': {
      'display': 'flex',
      '& .mktoFormCol': {
        flex: 1
      }
    },
    '& .mktoLabel': {
      display: 'none'
    },
    '& .mktoFormRow': {
      width: '100%'
    },
    '& .mktoOffset': {
      display: 'block !important'
    },
    '& .mktoFieldWrap': {
      'width': '100%',
      'color': '#fff',
      'lineHeight': '1.4375em', // 23px
      'boxSizing': 'border-box', // Prevent padding issue with fullWidth.
      'position': 'relative',
      'cursor': 'text',
      'display': 'inline-flex',
      'alignItems': 'center',
      'borderRadius': 4,
      'borderColor': '#fff',
      'borderWidth': 1,
      'borderStyle': 'solid',
      '& input': {
        'width': '100% !important',
        'font': 'inherit',
        'letterSpacing': 'inherit',
        'color': 'inherit',
        'padding': '16.5px 14px !important',
        'border': 0,
        'boxSizing': 'content-box',
        'background': 'none',
        'height': '1.4375em', // Reset 23pxthe native input line-height
        'margin': 0, // Reset for Safari
        'WebkitTapHighlightColor': 'transparent',
        'display': 'block',
        // Make the flex item shrink with Firefox
        'minWidth': 0,
        'animationName': 'mui-auto-fill-cancel',
        'animationDuration': '10ms',
        '&::-webkit-input-placeholder': placeholder,
        '&::-moz-placeholder': placeholder, // Firefox 19+
        '&:-ms-input-placeholder': placeholder, // IE11
        '&::-ms-input-placeholder': placeholder, // Edge
        '&:focus': {
          outline: 0
        },
        // Reset Firefox invalid required input style
        '&:invalid': {
          boxShadow: 'none'
        },
        '&::-webkit-search-decoration': {
          // Remove the padding when type=search.
          WebkitAppearance: 'none'
        }
      }
    },
    '& .mktoButtonWrap': {
      'marginLeft': '10px !important',
      'width': '100%',
      '& button': {
        'width': '100%',
        'display': 'inline-flex',
        'alignItems': 'center',
        'justifyContent': 'center',
        'position': 'relative',
        'boxSizing': 'border-box',
        'WebkitTapHighlightColor': 'transparent',
        'backgroundImage': 'none !important',
        // We disable the focus ring for mouse, touch and keyboard users.
        'outline': 0,
        'border': `0 !important`,
        'backgroundColor': `${theme.palette.grey.A100} !important`,
        'boxShadow': theme.shadows[2],
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          boxShadow: theme.shadows[2],
          backgroundColor: `${theme.palette.grey[300]} !important`
        },
        '&: hover': {
          boxShadow: theme.shadows[4]
        },
        'margin': 0, // Remove the margin in Safari
        'borderRadius': 4,
        'padding': '8px 22px !important',
        'cursor': 'pointer',
        'userSelect': 'none',
        'verticalAlign': 'middle',
        'MozAppearance': 'none', // Reset
        'WebkitAppearance': 'none', // Reset
        'color': 'inherit !important',
        '&::-moz-focus-inner': {
          borderStyle: 'none' // Remove Firefox dotted outline.
        },
        '@media print': {
          colorAdjust: 'exact'
        }
      }
    }
  };
});
