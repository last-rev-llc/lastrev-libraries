import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { Page_BaseFragmentFragment } from '@graphql-sdk/types';

export enum PageVariants {
  default = 'default'
}

export interface PageProps extends Page_BaseFragmentFragment {
  disableBackToTop?: boolean;
  variant?: PageVariants;
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
