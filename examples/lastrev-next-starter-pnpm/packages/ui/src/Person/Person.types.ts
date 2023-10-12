import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';
import type { Person_BaseFragmentFragment } from '@graphql-sdk/types';

import { LinkProps } from '../Link/Link.types';
import { type HeroProps } from '../Hero';

export enum PersonVariants {
  default = 'default'
}

export interface PersonProps extends Omit<Person_BaseFragmentFragment, 'variant'> {
  variant: PersonVariants;
  breadcrumbs?: LinkProps[];
  jsonLd: any;
  hero?: HeroProps;
}

export interface PersonOwnerState extends PersonProps {}

interface PersonClasses {
  root: string;
  contentOuterGrid: string;
  breadcrumbsWrap: string;
  headerWrap: string;
  contentWrap: string;
  mainImageWrap: string;
  mainImage: string;
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
      variants?: ComponentsVariants['Person'];
    };
  }
}
