import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { CollectionExpandable_BaseFragment } from '@graphql-sdk/types';

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

export interface AccordionProps extends CollectionExpandable_BaseFragment {
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
      variants?: ComponentsVariants['Accordion'];
    };
  }
}
