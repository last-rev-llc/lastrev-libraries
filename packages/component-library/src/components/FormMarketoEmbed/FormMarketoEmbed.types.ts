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

export interface FormMarketoEmbedClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the form element. */
  form: string;
}

export declare type FormMarketoEmbedClassKey = keyof FormMarketoEmbedClasses;
declare const accordionClasses: FormMarketoEmbedClasses;
export default accordionClasses;
