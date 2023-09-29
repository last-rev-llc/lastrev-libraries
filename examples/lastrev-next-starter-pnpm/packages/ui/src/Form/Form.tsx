import React from 'react';

import dynamic from 'next/dynamic';
import Head from 'next/head';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import type { FormProps } from './Form.types';

// TODO: Remove hubspot form or make new component?
// @ts-ignore
// const HSForm = dynamic(() => import('react-hubspot-form'), { ssr: false });

const Form = ({ settings, variant }: FormProps) => {
  const [submitted, setSubmitted] = React.useState(false);
  const ownerState = { variant, submitted, hasSuccessMessage: false };
  const handleSubmit = () => {
    setSubmitted(true);
  };

  const { portalId, formId } = settings;

  return (
    <Root ownerState={ownerState}>
      <FormOuterContainer ownerState={ownerState}>
        <Head>
          <script async type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js" />
        </Head>
        {/* @ts-ignore */}
        <FormContainer ownerState={ownerState}>
          {/* <HSForm
            //   @ts-ignore
            portalId={portalId}
            formId={formId}
            onSubmit={() => {
              // react-hubspot-form expects this callback to  be here and will throw an error if not found
               
             }}
            onFormSubmitted={handleSubmit}
            inlineMessage={'Thanks for submitting!'}
            loading={<CircularProgress />}
          /> */}
        </FormContainer>
      </FormOuterContainer>
    </Root>
  );
};

const Root = styled(Box, {
  name: 'Form',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState?: any }>(() => ({}));

const FormOuterContainer = styled(Box, {
  name: 'Form',
  slot: 'FormOuterContainer',
  overridesResolver: (_, styles) => [styles.formOuterContainer]
})<{ ownerState?: any }>(() => ({}));

const FormContainer = styled(Box, {
  name: 'Form',
  slot: 'FormContainer',
  overridesResolver: (_, styles) => [styles.formContainer]
})(() => ({}));

export default Form;
