import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { type FormProps } from '../Form/Form.types';

export interface FormAnnualInvestorProps extends FormProps {}

export interface FormAnnualInvestorOwnerState extends FormAnnualInvestorProps {}

interface FormAnnualInvestorClasses {
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

export declare type FormAnnualInvestorClassKey = keyof FormAnnualInvestorClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    FormAnnualInvestor: FormAnnualInvestorClassKey;
  }

  export interface ComponentsPropsList {
    FormAnnualInvestor: FormAnnualInvestorProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    FormAnnualInvestor?: {
      defaultProps?: ComponentsProps['FormAnnualInvestor'];
      styleOverrides?: ComponentsOverrides<Theme>['FormAnnualInvestor'];
      variants?: ComponentsVariants['FormAnnualInvestor'];
    };
  }
}
