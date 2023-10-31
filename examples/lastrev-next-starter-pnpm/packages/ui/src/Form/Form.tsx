import React, { useState, useEffect, useRef } from 'react';
// import dynamic from 'next/dynamic';
// import Head from 'next/head';
import { styled } from '@mui/material/styles';
// import ReactMarkdown from 'react-markdown';
// import ReCAPTCHA from 'react-google-recaptcha';
import sidekick from '@last-rev/contentful-sidekick-util';
import { useMarketo } from '../utils/useMarketo';

import Background from '../Background';
import Grid from '../Grid';
import ContentModule from '../ContentModule';

import type { FormProps, FormOwnerState } from './Form.types';
import ErrorBoundary from '../ErrorBoundary';
import Box from '@mui/material/Box';
import { TextField, Button } from '@mui/material';

export const ExcludeCaptchaFormsIds = ['mktoForm_1547', 'mktoForm_1831', 'mktoForm_1832', 'mktoForm_1833'];

export const ExcludeCaptchaInstanceIds = [
  'form#mktoForm_1547',
  'form#mktoForm_1831',
  'form#mktoForm_1832',
  'form#mktoForm_1833'
];

export const VALID_MARKETO_FORM_IDS = ['1547', '1832', '1831', '1833'];

export const invalidDomains = [
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

export const verifyEmailFormIds = ['1972', '1026', '1280', '1365', '1055', '1051', '1049', '1053', '1747', '1047'];

export const verifyInstanceIds = [
  'form#mktoForm_1972',
  'form#mktoForm_1026',
  'form#mktoForm_1280',
  'form#mktoForm_1365',
  'form#mktoForm_1055',
  'form#mktoForm_1051',
  'form#mktoForm_1049',
  'form#mktoForm_1053',
  'form#mktoForm_1747',
  'form#mktoForm_1047'
];

// const Container = styled.div`
//   .mktoForm {
//     ${(p: { formStyles: string }) => p.formStyles}
//   }

//   .mktoDisclaimer p {
//     ${(p: { disclaimerStyles: string }) => p.disclaimerStyles}
//   }
// `;

const handleError = (element: HTMLElement, validationRule: boolean, className: string) => {
  const isInvalid = element.classList.contains(className);
  if (isInvalid === validationRule) {
    element.classList.add('mktoInvalidTouched');
  } else {
    element.classList.remove('mktoInvalidTouched');
  }
};

const Form = (props: FormProps) => {
  const ownerState = { ...props };
  const formId = '1972';
  const key = '6LcKhioeAAAAAHSdAWHJeDqEVaFnSPKbV2jccg5N';
  const {
    background,
    backgroundColor,
    introText,
    sidekickLookup,
    // formId,
    formContainer,
    successContainer,
    isOnNewtab,
    pageType,
    thankYouPage,
    redirectUrl,
    displayFormat,
    buttonText,
    cta
  } = props;

  useMarketo({
    formId: formId,
    callback: () => {}
  });

  // function onChange(value: string | null) {
  //   let button: HTMLButtonElement | null = null;
  //   if (formRef.current && value !== null) {
  //     const elements = formRef?.current?.length;
  //     for (let i = 0; i < elements; i += 1) {
  //       const element = formRef.current[i];
  //       if (element.nodeName === 'BUTTON') {
  //         button = element as HTMLButtonElement;
  //         button.disabled = false;
  //       }
  //     }
  //   } else if (button) {
  //     button.disabled = false;
  //   }
  // }

  // const [mktoScriptLoaded, setMktoScriptLoaded] = useState(false);
  const [disclaimer, setDisclaimer] = useState('');
  // const [ref, setRef] = useState(false);
  // const [knownVisitor, setKnownVisitor] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  // const diplayFormat = displayFormat || 'form';
  // const verifyFormId = (id: string) => verifyEmailFormIds.includes(id);

  // const loadMarketoFormScript = () => {
  //   const mktoScriptId = 'mkto-snippet';

  // const mktoEventListener = () => {
  //   MktoForms2.loadForm(MKTO_BASE_URL, MKTO_MUNCHKIN_ID, formId, (form) => {
  //     const findMarketoId = VALID_MARKETO_FORM_IDS.indexOf(formId);

  //     if (findMarketoId !== -1) {
  //       form.onSuccess(() => {
  //         // Get the form's jquery element and hide it
  //         form.getFormElem().hide();

  //         // hide marketo form info and content
  //         formContainer.current!.style.display = 'none';

  //         // show success info and content
  //         successContainer.current!.style.display = diplayFormat;

  //         // Return false to prevent the submission handler from taking the lead to the follow up url
  //         return false;
  //       });
  //     }

  //     if (thankYouPage) {
  //       form.onSuccess(() => {
  //         // Take the lead to a different page on successful submit, ignoring the form's configured followUpUrl
  //         location.href = thankYouPage;

  //         // Return false to prevent the submission handler continuing with its own processing
  //         return false;
  //       });
  //     }

  //     if (redirectUrl) {
  //       form.onSuccess(() => {
  //         const newRedirectTarget = `${window?.location?.protocol}//${window?.location?.host}/resources/confirmation${redirectUrl}`;
  //         window.location.href = newRedirectTarget;
  //         return false;
  //       });
  //     }
  //   });

  //   MktoForms2.whenReady((form) => {
  //     setKnownVisitor(formRef?.current?.length === 3);

  //     const isEmailGood = (email: string) => {
  //       for (let i = 0; i < invalidDomains.length; i++) {
  //         let domain = invalidDomains[i];
  //         if (email.indexOf(domain) !== -1) {
  //           return false;
  //         }
  //       }
  //       return true;
  //     };

  //     const verifyInstanceFormId = (id: string) => verifyInstanceIds.includes(id);

  //     const emailElement = form.getFormElem().find('#Email');
  //     const instanceID = form.getFormElem().selector;

  //     const showEmailError = (email: string) => {
  //       const isValidEmail = isEmailGood(email);

  //       if (isValidEmail) {
  //         return form.submitable(true);
  //       }

  //       form.submitable(false);
  //       form.showErrorMessage('Must be Business email.', emailElement);
  //     };

  //     const validateEmail = () => {
  //       const enteredEmail = form.vals().Email;
  //       if (enteredEmail && verifyInstanceFormId(instanceID)) {
  //         showEmailError(enteredEmail);
  //       }
  //     };

  //     if (verifyFormId(formId)) {
  //       emailElement.on({
  //         keyup: validateEmail,
  //         focus: validateEmail,
  //         blur: validateEmail
  //       });

  //       form.onValidate(validateEmail);
  //     }
  //   });

  //   setRef(true);
  // };

  // const loadDisclaimerData = async () => {
  //   // You need to implement the Contentful query here.
  //   // Assuming Contentful.query is a function that returns a promise.
  //   const disclaimer = await Contentful.query({ content_type: 'livelySettings' }, 'misc');
  //   const disclaimerData = disclaimer?.items[0]?.fields?.livelyDisclaimer;
  //   setDisclaimer(disclaimerData);
  // };

  // useEffect(() => {
  //   loadMarketoFormScript();
  //   loadDisclaimerData();
  // }, []);

  // useEffect(() => {
  //   if (formRef && mktoScriptLoaded) {
  //     mktoEventListener();
  //   }
  // }, [formRef, mktoScriptLoaded]);

  // useEffect(() => {
  //   if (knownVisitor) {
  //     props.onKnownVisitor(knownVisitor);
  //   }
  // }, [knownVisitor]);

  // const [shouldInsert, setShouldInsert] = useState(true);

  // useEffect(() => {
  //   if (formRef.current) {
  //     const form = formRef.current;
  //     const elements = formRef?.current?.length;
  //     const elementsWithId: HTMLElement[] = [];
  //     let button: HTMLButtonElement | null = null;
  //     for (let i = 0; i < elements; i += 1) {
  //       const element = formRef.current[i];
  //       // TODO define dinamyc styles
  //       if (element.nodeName === 'SELECT') {
  //         let selectItem = element as HTMLSelectElement;
  //         selectItem.addEventListener(
  //           'change',
  //           () => {
  //             let selectedValue = selectItem.options[selectItem.options.selectedIndex].value;
  //             let contactSalesContainer = document.getElementById('contact-sales-container');
  //             if (selectedValue !== '') {
  //               if (contactSalesContainer) {
  //                 contactSalesContainer.style.paddingBottom = '10rem';
  //               }
  //             } else {
  //               if (contactSalesContainer) {
  //                 contactSalesContainer.style.paddingBottom = '0';
  //               }
  //             }
  //           },
  //           { passive: true }
  //         );
  //       }

  //       if (element.nodeName === 'BUTTON') {
  //         button = element as HTMLButtonElement;
  //         button.classList.add(styles.submitButton);
  //       }

  //       const hasId = element.id;

  //       if (hasId) {
  //         elementsWithId.push(element);
  //       }
  //     }
  //     if (button !== null) {
  //       button.addEventListener(
  //         'click',
  //         () => {
  //           for (const element of elementsWithId) {
  //             handleError(element, false, 'mktoValid');
  //           }
  //         },
  //         { passive: true }
  //       );
  //     }

  //     for (const element of elementsWithId) {
  //       element.addEventListener('blur', () => handleError(element, true, 'mktoInvalid'), { passive: true });
  //     }

  //     let submitContainer: HTMLElement | null = null;
  //     let captchaContainer: HTMLDivElement | null = null;

  //     const findFirstChild = (arr: HTMLCollection, query: string) => {
  //       for (let i = 0; i < arr.length; i++) {
  //         if (arr[i].id === query) return arr[i] as HTMLElement;
  //       }
  //     };

  //     if (!ExcludeCaptchaFormsIds.includes(form.id)) {
  //       MktoForms2.whenRendered((thisForm) => {
  //         if (document && cta) {
  //           const findFormButton = document?.querySelector('.mktoButton');

  //           if (findFormButton) {
  //             findFormButton.innerHTML = cta;
  //           }
  //         }

  //         const childNodes = form.children;

  //         for (let i = 0; i < childNodes.length; i++) {
  //           let child = childNodes[i];
  //           if (child.className === 'mktoButtonRow') {
  //             submitContainer = child as HTMLElement;
  //             break;
  //           }
  //         }
  //         if (shouldInsert && submitContainer && !ExcludeCaptchaInstanceIds.includes(thisForm.getFormElem().selector)) {
  //           let button: HTMLButtonElement | null = null;
  //           if (formRef.current) {
  //             const elements = formRef?.current?.length;
  //             for (let i = 0; i < elements; i += 1) {
  //               const element = formRef.current[i];
  //               if (element.nodeName === 'BUTTON') {
  //                 button = element as HTMLButtonElement;
  //                 if (buttonText) button.innerText = buttonText;
  //                 button.disabled = true;
  //               }
  //             }
  //           }

  //           captchaContainer = document.createElement('div');
  //           captchaContainer.id = 'captchaContainer';
  //           form.insertBefore(captchaContainer, submitContainer);
  //           setShouldInsert(false);
  //           ReactDOM.render(
  //             <div className={styles.recaptchaContainer}>
  //               <ReCAPTCHA sitekey={key} onChange={onChange} />
  //             </div>,
  //             findFirstChild(form.children, 'captchaContainer')
  //           );
  //         }
  //       });
  //     }
  //   }
  // }, [ref]);

  // if (!formId || !mktoScriptLoaded) {
  //   return null;
  // }

  return (
    <ErrorBoundary>
      <Root data-testid="Form" {...sidekick(sidekickLookup)} ownerState={ownerState}>
        {/* <Script
          src=`https://$[process.end.NEXT_].livelyme.com/js/forms2/js/forms2.min.js``
          strategy="afterInteractive"
          onLoad={() => {
            // Callback to execute when the script has loaded
            setMktoScriptLoaded(true);
          }}
        /> */}
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
            <TextField label="Full Name" name="fullName" type="text" fullWidth required />
            <TextField label="Company Name" name="companyName" type="text" fullWidth required />
            <TextField label="Email" name="email" type="email" fullWidth required />
            <TextField label="Phone Number" name="phone" type="tel" fullWidth required />
            <TextField label="Address" name="address" type="text" fullWidth required />
            <TextField label="Address Line 2" name="address_line_2" type="text" fullWidth />
            <TextField label="City" name="city" type="text" fullWidth required />
            <TextField label="State" name="state" type="text" fullWidth required />
            <TextField label="ZIP" name="zip" type="text" fullWidth required />
            <TextField label="Country" name="country" type="text" fullWidth required />
            <Button type="submit" size="large" variant="contained">
              Submit
            </Button>
            {/* <Container
      formStyles={props.formStyles}
      disclaimerStyles={props.disclaimerStyles}
      fieldWrapStyles={props.fieldWrapStyles}> */}
            {/* <form id={`mktoForm_${formId}`} ref={formRef}>
              {pageType === 'Events' ? (
                <link rel="stylesheet" type="text/css" href="/static/css/new-marketo-forms.css" media="screen" />
              ) : (
                <link rel="stylesheet" type="text/css" href="/static/css/marketo-forms.css" media="screen" />
              )}
            </form>
            <div className={`mktoDisclaimer ${props.hasMargin && styles.marketoDisclaimerWithMargins}`}>
              <ReactMarkdown
                renderers={{
                  // eslint-disable-next-line react/display-name
                  link: (props) => {
                    return isOnNewtab ? (
                      <a href={props.href} target="_blank" rel="noreferrer">
                        {props.children}
                      </a>
                    ) : (
                      <a href={props.href}>{props.children}</a>
                    );
                  }
                }}>
                {disclaimer}
              </ReactMarkdown>
            </div> */}
            <form id={`mktoForm_${formId}`} />
            {/* </Container> */}
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
