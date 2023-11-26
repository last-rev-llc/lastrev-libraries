/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Contentful from '../../utils/contentful';
import styled from 'styled-components';
import styles from './marketo-form.module.scss';
import ReactMarkdown from 'react-markdown';
import ReCAPTCHA from 'react-google-recaptcha';
import ReactDOM from 'react-dom';
import {
  MKTO_BASE_URL,
  MKTO_MUNCHKIN_ID,
  ExcludeCaptchaFormsIds,
  ExcludeCaptchaInstanceIds,
  VALID_MARKETO_FORM_IDS,
  invalidDomains,
  verifyEmailFormIds,
  verifyInstanceIds
} from './marketo-constants';

const Container = styled.div`
  .mktoForm {
    ${(p) => p.formStyles}
  }

  .mktoDisclaimer p {
    ${(p) => p.disclaimerStyles}
  }
`;

const handleError = (element, validationRule, className) => {
  const isInvalid = element.classList.contains(className);
  if (isInvalid === validationRule) {
    element.classList.add('mktoInvalidTouched');
  } else {
    element.classList.remove('mktoInvalidTouched');
  }
};

const MarketoForm = (props) => {
  // TODO moving to environments variables
  const key = '6LcKhioeAAAAAHSdAWHJeDqEVaFnSPKbV2jccg5N';
  const mktoFormId = props.id;
  const {
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

  function onChange(value) {
    let button = null;
    if (formRef.current && value !== null) {
      const elements = formRef?.current?.length;
      for (let i = 0; i < elements; i += 1) {
        const element = formRef.current[i];
        if (element.nodeName === 'BUTTON') {
          button = element;
          button.disabled = false;
        }
      }
    } else {
      button.disabled = false;
    }
  }

  const [mktoScriptLoaded, setMktoScriptLoaded] = useState(false);
  const [disclaimer, setDisclaimer] = useState('');
  const [ref, setRef] = useState(false);
  const [knownVisitor, setknownVisitor] = useState(false);
  const formRef = useRef(null);
  const diplayFormat = displayFormat || 'block';
  const verifyMktoFormId = (id) => verifyEmailFormIds.includes(id);

  // the marketo script takes appx 181ms to load and was negatively impacting our page load and score
  // as it was being loaded in the head. This increases mobile page score by 16 pts and 10 pts on desktop
  const loadMarketoFormScript = () => {
    const mktoScriptId = 'mkto-snippet';

    const [whereToloadScript] = document.getElementsByTagName('head');

    const script = document.createElement('script');
    script.id = mktoScriptId;
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = 'https://engage.livelyme.com/js/forms2/js/forms2.min.js';

    const styles = document.createElement('link');
    styles.id = 'marketo-forms-styles';
    styles.rel = 'stylesheet';
    styles.href = '/static/css/marketo-forms.css';
    styles.media = 'print';
    styles.onload = () => {
      document.getElementById('marketo-forms-styles').media = 'all';
    };

    if (document.getElementById('marketo-forms-styles') != null) {
      document.getElementById('marketo-forms-styles').remove();
    }

    // loads inside of body after all other content
    whereToloadScript.appendChild(script);

    const [headElement] = document.getElementsByTagName('head');
    headElement.appendChild(styles);

    script.addEventListener(
      'load',
      () => {
        setMktoScriptLoaded(true);
      },
      { passive: true }
    );
  };

  const mktoEventListener = () => {
    // eslint-disable-next-line no-undef
    MktoForms2.loadForm(MKTO_BASE_URL, MKTO_MUNCHKIN_ID, mktoFormId, (form) => {
      const findMarketoId = VALID_MARKETO_FORM_IDS.indexOf(mktoFormId);

      if (findMarketoId !== -1) {
        form.onSuccess(() => {
          // Get the form's jquery element and hide it
          form.getFormElem().hide();

          // hide marketo form info and content
          formContainer.current.style.display = 'none';

          // show success info and content
          successContainer.current.style.display = diplayFormat;

          // Return false to prevent the submission handler from taking the lead to the follow up url

          return false;
        });
      }

      if (thankYouPage) {
        form.onSuccess(() => {
          // Take the lead to a different page on successful submit, ignoring the form's configured followUpUrl
          location.href = thankYouPage;

          // Return false to prevent the submission handler continuing with its own processing
          return false;
        });
      }

      if (redirectUrl) {
        form.onSuccess(() => {
          const newRedirectTarget = `${window?.location?.protocol}//${window?.location?.host}/resources/confirmation${redirectUrl}`;
          window.location.href = newRedirectTarget;
          return false;
        });
      }
    });

    // eslint-disable-next-line no-undef
    MktoForms2.whenReady((form) => {
      setknownVisitor(formRef?.current?.length === 3);

      const isEmailGood = (email) => {
        for (let i = 0; i < invalidDomains.length; i++) {
          let domain = invalidDomains[i];
          if (email.indexOf(domain) != -1) {
            return false;
          }
        }
        return true;
      };

      const verifyInstanceFormId = (id) => verifyInstanceIds.includes(id);

      const emailElement = form.getFormElem().find('#Email');
      const instanceID = form.getFormElem().selector;

      const showEmailError = (email) => {
        const isValidEmail = isEmailGood(email);

        if (isValidEmail) {
          return form.submitable(true);
        }

        form.submitable(false);
        form.showErrorMessage('Must be Business email.', emailElement);
      };

      const validateEmail = () => {
        const enteredEmail = form.vals().Email;
        if (enteredEmail && verifyInstanceFormId(instanceID)) {
          showEmailError(enteredEmail);
        }
      };

      if (verifyMktoFormId(mktoFormId)) {
        emailElement.on({
          keyup: validateEmail,
          focus: validateEmail,
          blur: validateEmail
        });

        form.onValidate(validateEmail);
      }
    });

    setRef(true);
  };

  const loadDisclaimerData = async () => {
    const disclaimer = await Contentful.query({ content_type: 'livelySettings' }, 'misc');
    const disclaimerData = disclaimer?.items[0]?.fields?.livelyDisclaimer;
    setDisclaimer(disclaimerData);
  };

  useEffect(() => {
    loadMarketoFormScript();
    loadDisclaimerData();
  }, []);

  useEffect(() => {
    if (formRef && mktoScriptLoaded) {
      mktoEventListener();
    }
  }, [formRef, mktoScriptLoaded]);

  useEffect(() => {
    if (knownVisitor) {
      props.onKnownVisitor(knownVisitor);
    }
  }, [knownVisitor]);

  const [shouldInsert, setShouldInsert] = useState(true);

  useEffect(() => {
    if (formRef.current) {
      const form = formRef.current;
      const elements = formRef?.current?.length;
      const elementsWithId = [];
      let button = null;
      for (let i = 0; i < elements; i += 1) {
        const element = formRef.current[i];
        // TODO define dinamyc styles
        if (element.nodeName === 'SELECT') {
          let selectItem = element;
          selectItem.addEventListener(
            'change',
            () => {
              let selectedValue = selectItem.options[selectItem.options.selectedIndex].value;
              let contactSalesContainer = document.getElementById('contact-sales-container');
              if (selectedValue !== '') {
                if (contactSalesContainer) {
                  contactSalesContainer.style.paddingBottom = '10rem';
                }
              } else {
                if (contactSalesContainer) {
                  contactSalesContainer.style.paddingBottom = '0';
                }
              }
            },
            { passive: true }
          );
        }

        if (element.nodeName === 'BUTTON') {
          button = element;
          button.classList.add(styles.submitButton);
        }

        const hasId = element.id;

        if (hasId) {
          elementsWithId.push(element);
        }
      }
      if (button !== null) {
        button.addEventListener(
          'click',
          () => {
            for (const element of elementsWithId) {
              handleError(element, false, 'mktoValid');
            }
          },
          { passive: true }
        );
      }

      for (const element of elementsWithId) {
        element.addEventListener('blur', () => handleError(element, true, 'mktoInvalid'), { passive: true });
      }

      let submitContainer = null;
      let captchaContainer = null;

      const findFirstChild = (arr, query) => {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === query) return arr[i];
        }
      };

      if (!ExcludeCaptchaFormsIds.includes(form.id)) {
        // eslint-disable-next-line no-undef
        MktoForms2.whenRendered((thisForm) => {
          if (document && cta) {
            const findFormButton = document?.querySelector('.mktoButton');

            if (findFormButton) {
              findFormButton.innerHTML = cta;
            }
          }

          const childNodes = form.children;

          for (let i = 0; i < childNodes.length; i++) {
            let child = childNodes[i];
            if (child.className === 'mktoButtonRow') {
              submitContainer = child;
              break;
            }
          }
          if (shouldInsert && submitContainer && !ExcludeCaptchaInstanceIds.includes(thisForm.getFormElem().selector)) {
            let button = null;
            if (formRef.current) {
              const elements = formRef?.current?.length;
              for (let i = 0; i < elements; i += 1) {
                const element = formRef.current[i];
                if (element.nodeName === 'BUTTON') {
                  button = element;
                  if (buttonText) button.innerText = buttonText;
                  button.disabled = true;
                }
              }
            }

            captchaContainer = document.createElement('div');
            captchaContainer.id = 'captchaContainer';
            form.insertBefore(captchaContainer, submitContainer);
            setShouldInsert(false);
            ReactDOM.render(
              <div className={styles.recaptchaContainer}>
                <ReCAPTCHA sitekey={key} onChange={onChange} />
              </div>,
              findFirstChild(form.children, 'captchaContainer')
            );
          }
        });
      }
    }
  }, [ref]);

  if (!mktoFormId || !mktoScriptLoaded) {
    return null;
  }

  return (
    <Container
      formStyles={props.formStyles}
      disclaimerStyles={props.disclaimerStyles}
      fieldWrapStyles={props.fieldWrapStyles}>
      <form id={`mktoForm_${mktoFormId}`} ref={formRef}>
        {pageType === 'Events' ? (
          <link rel="stylesheet" type="text/css" href="/static/css/new-marketo-forms.css" media="screen" />
        ) : (
          <link rel="stylesheet" type="text/css" href="/static/css/marketo-forms.css" media="screen" />
        )}
      </form>
      <div className={`mktoDisclaimer ${props.hasMargin && styles.marketoDisclaimerWithMargins}`}>
        <ReactMarkdown
          components={{
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
      </div>
    </Container>
  );
};

MarketoForm.defaultProps = {
  hasMargin: true,
  isOnNewtab: true
};

export default MarketoForm;
