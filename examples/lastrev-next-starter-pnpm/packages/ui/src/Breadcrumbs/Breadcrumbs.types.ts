import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { LinkProps } from '../Link';

export interface BreadcrumbsProps {
  links: LinkProps[];
  theme?: any;
}

export interface BreadcrumbsOwnerState extends BreadcrumbsProps {}

interface BreadcrumbsClasses {
  /** Styles applied to the root element. */
  root: string;
  breadcrumb: string;
}

export declare type BreadcrumbsClassKey = keyof BreadcrumbsClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Breadcrumbs: BreadcrumbsClassKey;
  }

  export interface ComponentsPropsList {
    Breadcrumbs: BreadcrumbsProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Breadcrumbs?: {
      defaultProps?: ComponentsProps['Breadcrumbs'];
      styleOverrides?: ComponentsOverrides<Theme>['Breadcrumbs'];
      variants?: ComponentsVariants['Breadcrumbs'];
    };
  }
}
