import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';
import { ModuleIntegration_BaseFragmentFragment } from '@graphql-sdk/types';

// TODO
export enum FormVariants {
  hubspotFormFooter = 'hubspotFormFooter'
}

export interface FormProps extends ModuleIntegration_BaseFragmentFragment {
  submitted?: boolean;
  hasSuccessMessage?: boolean;
}

export interface FormClasses {
  root: string;
  formContainer: string;
  formOuterContainer: string;
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
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Form'];
    };
  }
}