import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';
import { Person_BaseFragmentFragment } from '@graphql-sdk/types';

export enum PersonVariants {
  default = 'default'
}

export interface PersonProps extends Person_BaseFragmentFragment {}

export interface PersonClasses {
  root: string;
  featuredMedia: string;
  name: string;
  jobTitle: string;
  email: string;
  body: string;
}

export declare type PersonClassKey = keyof PersonClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Person: PersonClassKey;
  }
  export interface ComponentsPropsList {
    Person: PersonProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Person?: {
      defaultProps?: ComponentsProps['Person'];
      styleOverrides?: ComponentsOverrides<Theme>['Person'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Person'];
    };
  }
}