import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { type FormProps } from '../Form/Form.types';

export interface FormContactUsProps extends FormProps {}

export interface FormContactUsOwnerState extends FormContactUsProps {}

interface FormContactUsClasses {
  root: string;
  introTextGrid: string;
  introText: string;
  contentOuterGrid: string;
  contentWrap: string;
  sideContentWrap: string;
  sideContentInnerWrap: string;
  formFields: string;
  formActions: string;
  bodyHeader: string;
  address: string;
  phone: string;
  email: string;
  detailsLabel: string;
}

export declare type FormContactUsClassKey = keyof FormContactUsClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    FormContactUs: FormContactUsClassKey;
  }

  export interface ComponentsPropsList {
    FormContactUs: FormContactUsProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    FormContactUs?: {
      defaultProps?: ComponentsProps['FormContactUs'];
      styleOverrides?: ComponentsOverrides<Theme>['FormContactUs'];
      variants?: ComponentsVariants['FormContactUs'];
    };
  }
}
