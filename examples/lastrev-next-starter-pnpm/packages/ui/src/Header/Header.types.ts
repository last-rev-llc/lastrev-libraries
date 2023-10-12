import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { Header_BaseFragmentFragment } from '@graphql-sdk/types';
import { type RichTextProps } from '../RichText';
import { type MediaProps } from '../Media';
import { type LinkProps } from '../Link';

export enum HeaderVariants {
  elevation = 'elevation',
  outlined = 'outlined'
}

export interface HeaderProps extends Header_BaseFragmentFragment {
  variant?: HeaderVariants | undefined;
  sidekickLookup?: any;
  menuVisible?: boolean;
  menuBreakpoint?: string;
  siteMessageIcon?: MediaProps;
  siteMessageText?: RichTextProps;
  siteMessageLink?: LinkProps;
}

export interface HeaderOwnerState extends HeaderProps {}

interface HeaderClasses {
  root: string;
  siteMessageWrap: string;
  logo: string;
  logoRoot: string;
  contentContainer: string;
  contentSpacer: string;
  headerMenuNav: string;
  headerMobileNavWrap: string;
  headerMenuNavItems: string;
  headerMenuNavItem: string;
  headerMenuNavItemLink: string;
  headerMenuCtas: string;
  headerMenuCtaItem: string;
  menuIcon: string;
  closeIcon: string;
  iconButtonWrap: string;
  iconButton: string;
  contentOuterGrid: string;
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
      variants?: ComponentsVariants['Header'];
    };
  }
}
