import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';
// TODO: Needed?
import { Page_BaseFragmentFragment } from '@graphql-sdk/types';

//TODO
export enum PageVariants {
  default = 'default'
}

export interface PageProps extends Page_BaseFragmentFragment {}

export interface PageClasses {
  root: string;
}

export declare type PageClassKey = keyof PageClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Page: PageClassKey;
  }
  export interface ComponentsPropsList {
    Page: PageProps;
  }
}
declare module '@mui/material/styles' {
  interface Components {
    Page?: {
      defaultProps?: ComponentsProps['Page'];
      styleOverrides?: ComponentsOverrides<Theme>['Page'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Page'];
    };
  }
}
