import { NavigationItem_BaseFragmentFragment } from '@graphql-sdk/types';

export interface HeaderNavLinkNestedProps extends NavigationItem_BaseFragmentFragment {
  id?: string;
  sidekickLookup?: any;
  onRequestClose?: any;
  variant?: string;
}

export interface HeaderNavLinkNestedClasses {
  root: string;
  menuRoot: string;
  menuItem: string;
  navItemLink: string;
}

export declare type HeaderNavLinkNestedClassKey = keyof HeaderNavLinkNestedClasses;
