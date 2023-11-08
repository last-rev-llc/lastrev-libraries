import React from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useForm } from '@formspree/react';

import sidekick from '@last-rev/contentful-sidekick-util';

import Background from '../Background';
import Grid from '../Grid';
import ContentModule from '../ContentModule';

import type { FormContactUsProps, FormContactUsOwnerState } from './FormContactUs.types';

const FormContactUs = (props: FormContactUsProps) => {
  const formId = 'mwkdzyrq';
  const [state, handleSubmit] = useForm(formId);

  const ownerState = { ...props, hasSuccessMessage: false };

  const { backgroundImage, backgroundColor, id, sidekickLookup, introText } = props;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit the form using the handleSubmit function
    await handleSubmit(e);
  };

  return (
    <Root ownerState={ownerState}>
      <FormContactUsBackground
        background={backgroundImage}
        backgroundColor={backgroundColor}
        testId="FormContactUs-background"
      />

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
        <SideContentWrap ownerState={ownerState}>
          <SideContentInnerWrap ownerState={ownerState}>
            <Typography variant="overline">Contact Details</Typography>
          </SideContentInnerWrap>
        </SideContentWrap>
        <ContentWrap ownerState={ownerState}>
          {state.succeeded ? (
            <>Success!</>
          ) : (
            <>
              <form id={formId} name={formId} onSubmit={onSubmit} style={{ width: '100%' }}>
                <input type="hidden" name="form-name" value={formId} />
                <FormFields ownerState={ownerState}>
                  <TextField label="First Name" id="lastName" name="lastName" type="text" required variant="standard" />
                  <TextField
                    label="Last Name"
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    variant="standard"
                  />
                  <TextField label="Email" id="email" name="email" type="email" required variant="standard" />
                  <TextField
                    label="Company Name"
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    variant="standard"
                  />
                  <TextField
                    label="Message"
                    id="message"
                    name="message"
                    fullWidth
                    multiline
                    rows="3"
                    required
                    variant="standard"
                  />
                </FormFields>

                <FormActions ownerState={ownerState}>
                  <SubmitButton
                    ownerState={ownerState}
                    href="#"
                    color="navy"
                    type="submit"
                    __typename="Link"
                    text="Submit"
                    variant="buttonText"
                    icon="logo"
                    iconPosition="Left"
                  />
                </FormActions>
              </form>
            </>
          )}
        </ContentWrap>
      </ContentOuterGrid>
    </Root>
  );
};

const Root = styled(Box, {
  name: 'FormContactUs',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: FormContactUsOwnerState }>``;

const ContentOuterGrid = styled(Grid, {
  name: 'FormContactUs',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: FormContactUsOwnerState }>``;

const SubmitButton = styled(ContentModule, {
  name: 'FormContactUs',
  slot: 'SubmitButton',
  overridesResolver: (_, styles) => [styles.submitButton]
})<{ ownerState: FormContactUsOwnerState }>``;

const FormFields = styled(Grid, {
  name: 'FormContactUs',
  slot: 'FormFields',
  overridesResolver: (_, styles) => [styles.formFields]
})<{ ownerState: FormContactUsOwnerState }>``;

const FormActions = styled(Grid, {
  name: 'FormContactUs',
  slot: 'FormActions',
  overridesResolver: (_, styles) => [styles.formActions]
})<{ ownerState: FormContactUsOwnerState }>``;

const ContentWrap = styled(Box, {
  name: 'FormContactUs',
  slot: 'ContentWrap',
  overridesResolver: (_, styles) => [styles.contentWrap]
})<{ ownerState: FormContactUsOwnerState }>``;

const FormContactUsBackground = styled(Background, {
  name: 'FormContactUs',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const SideContentWrap = styled(Box, {
  name: 'FormContactUs',
  slot: 'SideContentWrap',
  overridesResolver: (_, styles) => [styles.sideContentWrap]
})<{ ownerState: FormContactUsOwnerState }>``;

const SideContentInnerWrap = styled(Box, {
  name: 'FormContactUs',
  slot: 'SideContentInnerWrap',
  overridesResolver: (_, styles) => [styles.sideContentInnerWrap]
})<{ ownerState: FormContactUsOwnerState }>``;

const IntroTextGrid = styled(Grid, {
  name: 'FormContactUs',
  slot: 'IntroTextGrid',
  overridesResolver: (_, styles) => [styles.introTextGrid]
})<{ ownerState: FormContactUsOwnerState }>``;

const IntroText = styled(ContentModule, {
  name: 'FormContactUs',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState: FormContactUsOwnerState }>``;

export default FormContactUs;
