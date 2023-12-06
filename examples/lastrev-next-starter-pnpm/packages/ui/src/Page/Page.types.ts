import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { Page_BaseFragmentFragment } from '@graphql-sdk/types';
import { LinkProps } from '../Link/Link.types';

export enum PageVariants {
  default = 'default'
}

export interface PageProps extends Omit<Page_BaseFragmentFragment, 'variant'> {
  variant?: PageVariants;
  breadcrumbs?: LinkProps[];
}

interface PageClasses {
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
      variants?: ComponentsVariants['Page'];
    };
  }
}
