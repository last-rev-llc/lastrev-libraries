import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { CollectionExpandable_BaseFragmentFragment } from '@graphql-sdk/types';

export enum AccordionVariants {
  default = 'default'
}

export interface AccordionProps extends Omit<CollectionExpandable_BaseFragmentFragment, 'variant'> {
  variant: AccordionVariants;
}

export interface AccordionOwnerState extends AccordionProps {}

interface AccordionClasses {
  root: string;
  contentOuterGrid: string;
  introTextGrid: string;
  introText: string;
  accordionItem: string;
  summaryWrap: string;
  summary: string;
  detailsWrap: string;
  details: string;
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
