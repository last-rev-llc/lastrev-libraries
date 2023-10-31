import { useState, useEffect } from 'react';

interface MarketoProps {
  formId: string;
  callback: (form: any) => void; // You should replace 'any' with the actual type of form
}

declare global {
  interface Window {
    MktoForms2: any; // Replace 'any' with the actual type if available
  }
}

export const useMarketo = ({ formId, callback }: MarketoProps) => {
  const [scriptAdded, setScriptAdded] = useState<boolean>(false);
  const [formLoaded, setFormLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (scriptAdded) {
      if (!formLoaded) {
        window.MktoForms2.loadForm(
          `//${process.env.NEXT_PUBLIC_MARKETO_BASE_URL}`,
          process.env.NEXT_PUBLIC_MUNCHKIN_ID,
          formId,
          callback
        );
        window.MktoForms2.whenRendered((form: any) => {
          // Replace 'any' with the actual type of form
          const formElement = form.getFormElem()[0];
          const formElementId = form.getFormElem()[0].id.split('_')[1];

          /** Remove the style attribute and make for, and id attributes unique */
          Array.from(formElement.querySelectorAll('[style]'))
            .concat(formElement)
            .forEach((element) => {
              element.removeAttribute('style');
              if (element.hasAttribute('id') && element.tagName !== 'FORM') {
                element.setAttribute('id', `${element.getAttribute('id')}_${formElementId}`);
              }

              if (element.tagName === 'LABEL') {
                element.setAttribute('for', `${element.getAttribute('for')}_${formElementId}`);
              }
            });

          /** Remove <span /> from DOM */
          Array.from(formElement.querySelectorAll('.mktoInstruction')).forEach((element) => {
            element.remove();
          });

          /** Remove <style /> from DOM */
          Array.from(formElement.children).forEach((element) => {
            if (element.type && element.type === 'text/css') {
              element.remove();
            }
          });
        });
        setFormLoaded(true);
      }
    } else {
      if (window.MktoForms2) {
        setScriptAdded(true);
      } else {
        const script = document.createElement('script');
        script.defer = true;
        script.onload = () => (window?.MktoForms2 ? setScriptAdded(true) : null);
        script.src = `//${process.env.NEXT_PUBLIC_MARKETO_BASE_URL}/js/forms2/js/forms2.min.js`;
        document.head.appendChild(script);
      }
    }
  }, [scriptAdded, formId, formLoaded, callback]);

  // Ensure you return something from your hook if needed
};
