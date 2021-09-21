import React from 'react';
import Script from 'next/script';
import { Box } from '@material-ui/core';
import styled from '@material-ui/system/styled';

declare global {
  interface Window {
    MktoForms2: any;
  }
}

export interface FormMarketoEmbedProps {
  baseUrl: string;
  munchkinId: string;
  formId: string;
}

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
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(() => ({}));

const Form = styled('form', {
  name: 'FormMarketoEmbed',
  slot: 'Form',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => ({
    ...styles.form
  })
})<{ variant?: string }>(() => ({}));
