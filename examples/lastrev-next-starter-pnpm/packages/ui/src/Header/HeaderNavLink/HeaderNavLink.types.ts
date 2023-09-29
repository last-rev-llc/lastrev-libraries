import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { NavigationItem_BaseFragmentFragment } from '@graphql-sdk/types';

export interface HeaderNavLinkProps extends NavigationItem_BaseFragmentFragment {
  id?: string;
  subNavigation?: Array<HeaderNavLinkProps>;
  sidekickLookup?: any;
  onRequestClose?: any;
  variant?: string;
}

export interface HeaderNavLinkOwnerState extends HeaderNavLinkProps {
  numOfCols?: number;
  hasMegaNav?: boolean;
}

interface HeaderNavLinkClasses {
  root: string;
  navItemLink: string;
  navItemSubMenu: string;
  navItemSubMenuItem: string;
  navItemSubMenuWrapper: string;
  megaNavContainer: string;
  megaNavContent: string;
  megaNavTitle: string;
  megaNavActions: string;
  megaNavAction: string;
  megaNavMedia: string;
}

export declare type HeaderNavLinkClassKey = keyof HeaderNavLinkClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    HeaderNavLink: HeaderNavLinkClassKey;
  }

  export interface ComponentsPropsList {
    HeaderNavLink: HeaderNavLinkProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    HeaderNavLink?: {
      defaultProps?: ComponentsProps['HeaderNavLink'];
      styleOverrides?: ComponentsOverrides<Theme>['HeaderNavLink'];
      variants?: ComponentsVariants['HeaderNavLink'];
    };
  }
}
