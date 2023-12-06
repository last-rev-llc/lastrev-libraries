import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';
import type { Property_BaseFragmentFragment } from '@graphql-sdk/types';

import { LinkProps } from '../Link/Link.types';
import { type HeroProps } from '../Hero';

export enum PropertyVariants {
  default = 'default'
}

export interface PropertyProps extends Omit<Property_BaseFragmentFragment, 'variant'> {
  variant: PropertyVariants;
  breadcrumbs?: LinkProps[];
  jsonLd: any;
  hero?: HeroProps;
}

export interface PropertyOwnerState extends PropertyProps {}

interface PropertyClasses {
  root: string;
  contentOuterGrid: string;
  contentWrap: string;
  sideContentWrap: string;
  sideContentInnerWrap: string;
  name: string;
  jobTitle: string;
  email: string;
  body: string;
  bodyHeader: string;
  bodyList: string;
  bodyListItem: string;
  listLabel: string;
  listValue: string;
}

export declare type PropertyClassKey = keyof PropertyClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Property: PropertyClassKey;
  }

  export interface ComponentsPropsList {
    Property: PropertyProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Property?: {
      defaultProps?: ComponentsProps['Property'];
      styleOverrides?: ComponentsOverrides<Theme>['Property'];
      variants?: ComponentsVariants['Property'];
    };
  }
}
