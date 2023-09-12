import { RichText } from '../Text';
import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

export interface AccordionProps {
  __typename?: string;
  internalTitle?: string;
  variant?: any;
  title?: string;
  body?: RichText;
  sidekickLookup?: any;
  children?: any;
  expanded?: boolean;
  onClick?: (event?: any) => void;
}

export interface AccordionClasses {
  root: string;
  rounded: string;
  expanded: string;
  disabled: string;
  gutters: string;
  region: string;
}

export declare type AccordionClassKey = keyof AccordionClasses;
declare const accordionClasses: AccordionClasses;
export default accordionClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Accordion: AccordionClassKey;
  }
  export interface ComponentsPropsList {
    Accordion: AccordionProps;
  }
}
declare module '@mui/material/styles' {
  
  interface Components {
    Accordion?: {
      defaultProps?: ComponentsProps['Accordion'];
      styleOverrides?: ComponentsOverrides<Theme>['Accordion'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Accordion'];
    };
  }
}
