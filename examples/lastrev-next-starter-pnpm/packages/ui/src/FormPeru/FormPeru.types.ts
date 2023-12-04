import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { type FormProps } from '../Form/Form.types';

export interface FormPeruProps extends FormProps {}

export interface FormPeruOwnerState extends FormPeruProps {}

interface FormPeruClasses {
  root: string;
  introTextGrid: string;
  introText: string;
  contentOuterGrid: string;
  contentWrap: string;
  formFields: string;
  formWrap: string;
  formActions: string;
  disclaimerTextWrap: string;
  disclaimerText: string;
  successItems: string;
}

export declare type FormPeruClassKey = keyof FormPeruClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    FormPeru: FormPeruClassKey;
  }

  export interface ComponentsPropsList {
    FormPeru: FormPeruProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    FormPeru?: {
      defaultProps?: ComponentsProps['FormPeru'];
      styleOverrides?: ComponentsOverrides<Theme>['FormPeru'];
      variants?: ComponentsVariants['FormPeru'];
    };
  }
}
