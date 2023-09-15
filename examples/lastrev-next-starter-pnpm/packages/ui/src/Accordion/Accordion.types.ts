import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { Accordion_BaseFragmentFragment } from '@graphql-sdk/types';

type AccordionVariants =
  | 'default'
  | 'defaultCircleImage'
  | 'onePerRow'
  | 'twoPerRow'
  | 'twoPerRowOffset'
  | 'threePerRow'
  | 'fourPerRow'
  | 'customerLogos'
  | 'contentGrid'
  | 'pricing'
  | undefined;

export interface AccordionProps extends Accordion_BaseFragmentFragment {
  variant?: AccordionVariants;
}

export interface AccordionClasses {
  root: string;
  contentContainer: string;
  introTextWrapper: string;
  introText: string;
  itemsContainer: string;
  item: string;
  actionsContainer: string;
  action: string;
}

export declare type AccordionClassKey = keyof AccordionClasses;

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
