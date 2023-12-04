import React from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useForm } from '@formspree/react';

import sidekick from '@last-rev/contentful-sidekick-util';

import Background from '../Background';
import Grid from '../Grid';
import ContentModule from '../ContentModule';

import type { FormPeruProps, FormPeruOwnerState } from './FormPeru.types';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

const FormPeru = (props: FormPeruProps) => {
  const ownerState = { ...props, hasSuccessMessage: false };

  const {
    backgroundImage,
    backgroundColor,
    formspreeId,
    submissionContentItems,
    sidekickLookup,
    introText,
    formDisclaimerText
  } = props;

  const [selectedFund, setSelectedFund] = React.useState<string | null>(null);
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
  const [state, handleSubmit] = useForm(formspreeId || '');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFund((event.target as HTMLInputElement).value);
    setSelectedValue((event.target as HTMLInputElement).value);
  };

  if (!formspreeId) return null;
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit the form using the handleSubmit function
    await handleSubmit(e);
  };

  return (
    <Root ownerState={ownerState}>
      <FormPeruBackground background={backgroundImage} backgroundColor={backgroundColor} testId="FormPeru-background" />

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
        <ContentWrap ownerState={ownerState}>
          {state && state.succeeded ? (
            <SuccessItems>
              {!!submissionContentItems?.length &&
                submissionContentItems.map(
                  (item) =>
                    selectedFund === item?.id && (
                      <ContentModule ownerState={ownerState} component="section" key={item.id} {...item} />
                    )
                )}
            </SuccessItems>
          ) : null}

          {!state?.succeeded && (
            <Box component="form" id={formspreeId} name={formspreeId} onSubmit={onSubmit} style={{ width: '100%' }}>
              <input type="hidden" name="Form" value="TA Realty Peru Form" />
              <FormWrap>
                <FormFields>
                  <FormControl>
                    <FormLabel id="peru-options">Please choose an Option</FormLabel>
                    <RadioGroup
                      aria-labelledby="peru-options"
                      name="Fund Type"
                      value={selectedValue}
                      onChange={handleRadioChange}>
                      <FormControlLabel
                        value="3Zz1XrbatF1BBsZlLBxjPs"
                        id="3Zz1XrbatF1BBsZlLBxjPs"
                        control={<Radio />}
                        label="By checking this box, I affirm that I am a resident of Peru and an investor in TA Realty Core Property Fund, L.P."
                      />

                      <FormControlLabel
                        value="23KPWxTYXWbXIwt0YhAmfz"
                        id="23KPWxTYXWbXIwt0YhAmfz"
                        control={<Radio />}
                        label="By checking this box, I affirm that I am a resident of Peru and an investor in TA Realty Logistics Fund, L.P."
                      />
                    </RadioGroup>
                  </FormControl>
                </FormFields>
                <FormActions ownerState={ownerState}>
                  <SubmitButton
                    ownerState={ownerState}
                    href="#"
                    color="primary"
                    type="submit"
                    __typename="Link"
                    text="Submit"
                    variant="buttonText"
                    icon="logo"
                    iconPosition="Left"
                  />
                </FormActions>
              </FormWrap>

              {!!formDisclaimerText && (
                <DisclaimerTextWrap ownerState={ownerState}>
                  <DisclaimerText
                    ownerState={ownerState}
                    subtitle="Disclaimer"
                    variant="introText"
                    {...sidekick(sidekickLookup, 'body')}
                    __typename="Text"
                    body={formDisclaimerText}
                  />
                </DisclaimerTextWrap>
              )}
            </Box>
          )}
        </ContentWrap>
      </ContentOuterGrid>
    </Root>
  );
};

const Root = styled(Box, {
  name: 'FormPeru',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: FormPeruOwnerState }>``;

const ContentOuterGrid = styled(Box, {
  name: 'FormPeru',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: FormPeruOwnerState }>``;

const SubmitButton = styled(ContentModule, {
  name: 'FormPeru',
  slot: 'SubmitButton',
  overridesResolver: (_, styles) => [styles.submitButton]
})<{ ownerState: FormPeruOwnerState }>``;

const FormFields = styled(Box, {
  name: 'FormPeru',
  slot: 'FormFields',
  overridesResolver: (_, styles) => [styles.formFields]
})<{ ownerState: FormPeruOwnerState }>``;

const FormWrap = styled(Grid, {
  name: 'FormPeru',
  slot: 'FormWrap',
  overridesResolver: (_, styles) => [styles.formWrap]
})<{ ownerState: FormPeruOwnerState }>``;

const FormActions = styled(Grid, {
  name: 'FormPeru',
  slot: 'FormActions',
  overridesResolver: (_, styles) => [styles.formActions]
})<{ ownerState: FormPeruOwnerState }>``;

const ContentWrap = styled(Box, {
  name: 'FormPeru',
  slot: 'ContentWrap',
  overridesResolver: (_, styles) => [styles.contentWrap]
})<{ ownerState: FormPeruOwnerState }>``;

const FormPeruBackground = styled(Background, {
  name: 'FormPeru',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const IntroTextGrid = styled(Grid, {
  name: 'FormPeru',
  slot: 'IntroTextGrid',
  overridesResolver: (_, styles) => [styles.introTextGrid]
})<{ ownerState: FormPeruOwnerState }>``;

const IntroText = styled(ContentModule, {
  name: 'FormPeru',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState: FormPeruOwnerState }>``;

const DisclaimerTextWrap = styled(Grid, {
  name: 'FormPeru',
  slot: 'DisclaimerTextWrap',
  overridesResolver: (_, styles) => [styles.disclaimerTextWrap]
})<{ ownerState: FormPeruOwnerState }>``;

const DisclaimerText = styled(ContentModule, {
  name: 'FormPeru',
  slot: 'DisclaimerText',
  overridesResolver: (_, styles) => [styles.disclaimerText]
})<{ ownerState: FormPeruOwnerState }>``;

const SuccessItems = styled(Box, {
  name: 'FormPeru',
  slot: 'SuccessItems',
  overridesResolver: (_, styles) => [styles.successItems]
})<{ ownerState: FormPeruOwnerState }>``;

export default FormPeru;
