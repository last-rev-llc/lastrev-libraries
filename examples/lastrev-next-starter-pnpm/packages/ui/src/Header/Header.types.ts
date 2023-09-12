import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { Header_BaseFragmentFragment } from '@graphql-sdk/types';

export interface HeaderProps extends Header_BaseFragmentFragment {
  variant?: 'elevation' | 'outlined' | undefined;
  color?: any;
  colorScheme?: string;
  sidekickLookup?: any;
  menuVisible?: boolean;
  menuBreakpoint?: string;
}

export interface HeaderClasses {
  root: string;
  superNav: string;
  superNavContainer: string;
  supernavIcon: string;
  supernavLink: string;
  logo: string;
  logoRoot: string;
  contentContainer: string;
  contentSpacer: string;
  headerMenuNav: string;
  headerMenuNavItems: string;
  headerMenuNavItem: string;
  headerMenuMobileCtas: string;
  headerMenuMobileCtaItem: string;
  headerMenuCtas: string;
  headerMenuCtaItem: string;
}

export declare type HeaderClassKey = keyof HeaderClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Header: HeaderClassKey;
  }
  export interface ComponentsPropsList {
    Header: HeaderProps;
  }
}
declare module '@mui/material/styles' {
  interface Components {
    Header?: {
      defaultProps?: ComponentsProps['Header'];
      styleOverrides?: ComponentsOverrides<Theme>['Header'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Header'];
    };
  }
}
