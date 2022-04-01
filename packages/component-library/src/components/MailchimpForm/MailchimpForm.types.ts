import { Breakpoint } from '@mui/material/styles';
import { RichText } from '../Text';
import { MediaProps } from '../Media';

export interface MailchimpFormProps {
  internalTitle?: string;
  title?: string;
  subtitle?: string;
  body?: RichText;
  successMessage?: RichText;
  actions?: any[];
  image?: MediaProps | MediaProps[];
  background?: any;
  contentWidth?: false | Breakpoint | undefined;
  variant?: any;
  theme?: any;
  sidekickLookup?: any;
}

export interface FormFields {
  EMAIL: string;
  FNAME?: string;
  LNAME?: string;
}

export type StatusTypes = 'sending' | 'error' | 'success' | undefined | null;

export type SubscribeType = (data: FormFields) => void;

export interface CustomFormProps {
  internalTitle?: string;
  status?: StatusTypes;
  message?: String | Error | null;
  subscribe: SubscribeType;
  actions?: any[];
  successMessage?: RichText;
  image?: MediaProps | MediaProps[];
  sidekickLookup?: any;
}
export interface SubscribeFormData {
  EMAIL: string;
  FNAME?: string;
  LNAME?: string;
}

export interface MailchimpFormClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the contentContainer element. */
  contentContainer: string;
  /** Styles applied to the formImage element. */
  formImage: string;
  /** Styles applied to the formContainer element. */
  formContainer: string;
  /** Styles applied to the submitContainer element. */
  submitContainer: string;
}

export declare type MailchimpFormClassKey = keyof MailchimpFormClasses;
declare const accordionClasses: MailchimpFormClasses;
export default accordionClasses;
