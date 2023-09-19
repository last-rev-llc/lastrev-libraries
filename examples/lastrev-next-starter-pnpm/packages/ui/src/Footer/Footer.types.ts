import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { Footer_BaseFragmentFragment } from '@graphql-sdk/types';

export interface FooterProps extends Footer_BaseFragmentFragment {}

export interface FooterClasses {
  root: string;
  footerContent: string;
  container: string;
  mainSection: string;
  logo: string;
  logoUrl: string;
  disclaimer: string;
  socialLinks: string;
  socialLink: string;
  navigationItems: string;
  navigationItem: string;
  introContents: string;
  introContent: string;
  divider: string;
  legalSection: string;
  copyrightDisclaimer: string;
  legalLinks: string;
  legalLink: string;
}

export declare type FooterClassKey = keyof FooterClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Footer: FooterClassKey;
  }
  export interface ComponentsPropsList {
    Footer: FooterProps;
  }
}
declare module '@mui/material/styles' {
  interface Components {
    Footer?: {
      defaultProps?: ComponentsProps['Footer'];
      styleOverrides?: ComponentsOverrides<Theme>['Footer'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Footer'];
    };
  }
}
