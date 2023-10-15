import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { NavigationItem_BaseFragmentFragment } from '@graphql-sdk/types';

export interface HeaderNavGroupProps extends NavigationItem_BaseFragmentFragment {
  id?: string;
  subNavigation?: Array<HeaderNavGroupProps>;
  sidekickLookup?: any;
  onRequestClose?: any;
  variant?: string;
}

export interface HeaderNavGroupOwnerState extends HeaderNavGroupProps {
  numOfCols?: number;
  hasMegaNav?: boolean;
}

interface HeaderNavGroupClasses {
  root: string;
  menuRoot: string;
  menuItem: string;
  navItemLink: string;
  navItemLinkGroup: string;
  navItemGroup: string;
  navItemSubMenu: string;
  navItemSubMenuItem: string;
}

export declare type HeaderNavGroupClassKey = keyof HeaderNavGroupClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    HeaderNavGroup: HeaderNavGroupClassKey;
  }

  export interface ComponentsPropsList {
    HeaderNavGroup: HeaderNavGroupProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    HeaderNavGroup?: {
      defaultProps?: ComponentsProps['HeaderNavGroup'];
      styleOverrides?: ComponentsOverrides<Theme>['HeaderNavGroup'];
      variants?: ComponentsVariants['HeaderNavGroup'];
    };
  }
}
