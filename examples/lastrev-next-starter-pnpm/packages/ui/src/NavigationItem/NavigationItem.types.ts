import { NavigationItem_BaseFragmentFragment } from '@graphql-sdk/types';

export interface NavigationItemProps extends NavigationItem_BaseFragmentFragment {
  id?: string;
  subNavigation?: Array<NavigationItemProps>;
  sidekickLookup?: any;
  onRequestClose?: any;
  variant?: string;
}

export interface NavigationItemClasses {
  root: string;
  menuRoot: string;
  menuItem: string;
  navItemLink: string;
  navItemSubMenu: string;
  navItemSubMenuItem: string;
  navItemSubMenuWrapper: string;
}

export declare type NavigationItemClassKey = keyof NavigationItemClasses;
