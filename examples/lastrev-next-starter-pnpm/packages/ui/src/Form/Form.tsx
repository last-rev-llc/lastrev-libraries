import React from 'react';

import dynamic from 'next/dynamic';
import Head from 'next/head';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import sidekick from '@last-rev/contentful-sidekick-util';

import Background from '../Background';
import Grid from '../Grid';
import ContentModule from '../ContentModule';

import type { FormProps, FormOwnerState } from './Form.types';

// @ts-ignore
const HSForm = dynamic(() => import('react-hubspot-form'), { ssr: false });

const Form = (props: FormProps) => {
  const [submitted, setSubmitted] = React.useState(false);
  const ownerState = { ...props, submitted, hasSuccessMessage: false };

  const { hubspotPortalId, hubspotFormId, background, backgroundColor, introText, sidekickLookup } = props;
  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Root ownerState={ownerState}>
      <Head>
        <script async type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js" />
      </Head>

      <FormBackground background={background} backgroundColor={backgroundColor} testId="Form-background" />

      {!!introText && (
        <IntroTextGrid ownerState={ownerState}>
          <IntroText
            ownerState={ownerState}
            {...sidekick(sidekickLookup, 'introText')}
            {...introText}
            variant="introText"
          />
        </IntroTextGrid>
      )}

      <ContentOuterGrid ownerState={ownerState}>
        <MainContentWrap ownerState={ownerState}>
          <HSForm
            //   @ts-ignore
            portalId={hubspotPortalId}
            formId={hubspotFormId}
            onSubmit={() => {
              // react-hubspot-form expects this callback to  be here and will throw an error if not found
            }}
            onFormSubmitted={handleSubmit}
            inlineMessage={'Thanks for submitting!'}
            loading={<CircularProgress />}
          />
        </MainContentWrap>
      </ContentOuterGrid>
    </Root>
  );
};

const Root = styled(Box, {
  name: 'Form',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: FormOwnerState }>``;

const FormBackground = styled(Background, {
  name: 'Form',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const ContentOuterGrid = styled(Grid, {
  name: 'Form',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: FormOwnerState }>``;

const MainContentWrap = styled('div', {
  name: 'Block',
  slot: 'MainContentWrap',
  overridesResolver: (_, styles) => [styles.mainContentWrap]
})<{ ownerState: FormOwnerState }>``;

const IntroTextGrid = styled(Grid, {
  name: 'Form',
  slot: 'IntroTextGrid',
  overridesResolver: (_, styles) => [styles.introTextGrid]
})<{ ownerState: FormOwnerState }>``;

const IntroText = styled(ContentModule, {
  name: 'Form',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState: FormOwnerState }>``;

export default Form;
