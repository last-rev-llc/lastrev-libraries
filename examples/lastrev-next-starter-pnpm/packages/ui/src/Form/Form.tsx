'use client';

import React from 'react';
import ReactDOM from 'react-dom';

import { styled } from '@mui/material/styles';
import ReCAPTCHA from 'react-google-recaptcha';
import sidekick from '@last-rev/contentful-sidekick-util';

// import Background from '../Background';
import Grid from '../Grid';
import ContentModule from '../ContentModule';

import type { FormProps, FormOwnerState } from './Form.types';
import ErrorBoundary from '../ErrorBoundary';
import Box from '@mui/material/Box';
import Script from 'next/script';
import { Button, Typography } from '@mui/material';

declare global {
  interface Window {
    MktoForms2: any; // Replace 'any' with the actual type if available
  }
}

const RECAPTCHA_SITE_KEY = '6LcKhioeAAAAAHSdAWHJeDqEVaFnSPKbV2jccg5N';

export const invalidPersonalDomains = [
  '@gmail.',
  '@yahoo.',
  '@hotmail.',
  '@live.',
  '@aol.',
  '@outlook.',
  '@vomo.',
  '@godaddy.',
  '@comcast.',
  '@verizon.',
  '@zoho.',
  '@msn.',
  '@icloud.'
];

const Form = (props: FormProps) => {
  const ownerState = { ...props };
  const [submitEl, setSubmitEl] = React.useState<Element | null>(null);
  const [submitText, setSubmitText] = React.useState('Submit');
  const {
    introText,
    sidekickLookup,
    marketoFormId,
    confirmationPath,
    allowPersonalEmailAddresses,
    hideRecaptcha,
    disclaimerText
  } = props;

  const handleCaptchaChange = (token?: string | null) => {
    console.log({ token });
  };

  React.useEffect(() => {});
  if (!props.marketoFormId) {
    return null;
  }

  const ButtonPortal = submitEl
    ? ReactDOM.createPortal(
        <Button type="submit" variant="contained" color="primary" size="large">
          {submitText}
        </Button>,
        submitEl
      )
    : null;
  return (
    <ErrorBoundary>
      <Root data-testid="Form" {...sidekick(sidekickLookup)} ownerState={ownerState}>
        {ButtonPortal}
        {/* <FormBackground background={background} backgroundColor={backgroundColor} testId="Form-background" /> */}

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
            <Script
              id="marketo-forms-script"
              src={`//${process.env.NEXT_PUBLIC_MARKETO_BASE_URL}/js/forms2/js/forms2.min.js`}
              onLoad={() => {
                console.log('Script onLoad');
                window.MktoForms2.loadForm(
                  `//${process.env.NEXT_PUBLIC_MARKETO_BASE_URL}`,
                  process.env.NEXT_PUBLIC_MUNCHKIN_ID,
                  marketoFormId,
                  (form: any) => {
                    const submitBtnWrap = document.querySelector(`#mktoForm_${marketoFormId} .mktoButtonWrap`)!;
                    const submitBtn = document.querySelector(`#mktoForm_${marketoFormId} button[type=submit]`)!;
                    setSubmitText(submitBtn?.innerHTML);
                    submitBtnWrap.innerHTML = '';
                    setSubmitEl(submitBtnWrap);
                    // TODO: Go to path or asset?
                    if (confirmationPath) {
                      form.onSuccess(() => {
                        console.log('onSuccess');
                        location.href = `${location.href}/${confirmationPath}`;

                        // Return false to prevent the submission handler continuing with its own processing
                        return false;
                      });
                    }

                    form.onSubmit(() => {
                      console.log('onSubmit');
                      const isEmailGood = (email: string) => {
                        for (let i = 0; i < invalidPersonalDomains.length; i++) {
                          let domain = invalidPersonalDomains[i];
                          if (email.indexOf(domain) !== -1) {
                            return false;
                          }
                        }
                        return true;
                      };

                      const emailElement = form.getFormElem().find('#Email');

                      const showEmailError = (email: string) => {
                        const isValidEmail = isEmailGood(email);

                        if (isValidEmail) {
                          console.log('valid email');
                          return form.submittable(false);
                        }

                        form.submittable(false);
                        form.showErrorMessage('Must be Business email.', emailElement);
                      };

                      const validateEmail = () => {
                        console.log('validateEmail', { allowPersonalEmailAddresses });
                        const enteredEmail = form.vals().Email;

                        if (enteredEmail) {
                          showEmailError(enteredEmail);
                        }
                      };

                      if (!allowPersonalEmailAddresses) {
                        emailElement.on({
                          keyup: validateEmail,
                          focus: validateEmail,
                          blur: validateEmail
                        });

                        form.onValidate(validateEmail);
                      }
                    });
                  }
                );
              }}
            />
            <FormWrap ownerState={ownerState}>
              <form id={`mktoForm_${marketoFormId}`}></form>
              {!hideRecaptcha && (
                <RecaptchaWrap ownerState={ownerState}>
                  <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={handleCaptchaChange} />
                </RecaptchaWrap>
              )}
              {disclaimerText ? <FormDisclaimer ownerState={ownerState}>{disclaimerText}</FormDisclaimer> : null}
            </FormWrap>
          </MainContentWrap>
        </ContentOuterGrid>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Form',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: FormOwnerState }>``;

// const FormBackground = styled(Background, {
//   name: 'Form',
//   slot: 'Background',
//   overridesResolver: (_, styles) => [styles.background]
// })<{}>``;

const RecaptchaWrap = styled(Box, {
  name: 'Form',
  slot: 'RecaptchaWrap',
  overridesResolver: (_, styles) => [styles.recaptchaWrap]
})<{ ownerState: FormOwnerState }>``;

const FormWrap = styled(Box, {
  name: 'Form',
  slot: 'FormWrap',
  overridesResolver: (_, styles) => [styles.formWrap]
})<{ ownerState: FormOwnerState }>``;

const FormDisclaimer = styled(Typography, {
  name: 'Form',
  slot: 'FormDisclaimer',
  overridesResolver: (_, styles) => [styles.formDisclaimer]
})<{ ownerState: FormOwnerState }>``;

const ContentOuterGrid = styled(Grid, {
  name: 'Form',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
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

const MainContentWrap = styled('div', {
  name: 'Form',
  slot: 'MainContentWrap',
  overridesResolver: (_, styles) => [styles.mainContentWrap]
})<{ ownerState: FormOwnerState }>``;

export default Form;
