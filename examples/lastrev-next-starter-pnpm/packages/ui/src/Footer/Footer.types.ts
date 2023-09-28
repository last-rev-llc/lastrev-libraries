import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { Footer_BaseFragmentFragment, Link_BaseFragmentFragment } from '@graphql-sdk/types';

export interface FooterProps extends Footer_BaseFragmentFragment {
  socialLinks?: [Link_BaseFragmentFragment];
}

export interface FooterOwnerState extends FooterProps {}

export interface FooterClasses {
  root: string;
  contentOuterGrid: string;
  logoRoot: string;
  logo: string;
  disclaimer: string;
  socialLinks: string;
  socialLink: string;
  footerMenuNav: string;
  footerMenuNavItems: string;
  footerMenuNavItem: string;
  introContentsWrap: string;
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
      variants?: ComponentsVariants['Footer'];
    };
  }
}
