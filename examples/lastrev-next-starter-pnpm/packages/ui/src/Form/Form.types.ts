import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { Form_BaseFragmentFragment } from '@graphql-sdk/types';

export enum FormVariants {
  default = 'default',
  footer = 'footer'
}

export interface FormProps extends Form_BaseFragmentFragment {
  submitted?: boolean;
  hasSuccessMessage?: boolean;
  variant: FormVariants;
}

export interface FormOwnerState extends FormProps {}

interface FormClasses {
  root: string;
  introTextGrid: string;
  introText: string;
  contentOuterGrid: string;
  mainContentWrap: string;
}

export declare type FormClassKey = keyof FormClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Form: FormClassKey;
  }

  export interface ComponentsPropsList {
    Form: FormProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Form?: {
      defaultProps?: ComponentsProps['Form'];
      styleOverrides?: ComponentsOverrides<Theme>['Form'];
      variants?: ComponentsVariants['Form'];
    };
  }
}
