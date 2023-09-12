import { NavigationItem_BaseFragmentFragment } from '@graphql-sdk/types';

export interface HeaderNavGroupProps extends NavigationItem_BaseFragmentFragment {
  id?: string;
  subNavigation?: Array<HeaderNavGroupProps>;
  sidekickLookup?: any;
  onRequestClose?: any;
  variant?: string;
}

export interface HeaderNavGroupClasses {
  root: string;
  menuRoot: string;
  menuItem: string;
  navItemLink: string;
  navItemGroup: string;
  navItemSubMenu: string;
  navItemSubMenuItem: string;
  navItemSubMenuWrapper: string;
}

export declare type HeaderNavGroupClassKey = keyof HeaderNavGroupClasses;
