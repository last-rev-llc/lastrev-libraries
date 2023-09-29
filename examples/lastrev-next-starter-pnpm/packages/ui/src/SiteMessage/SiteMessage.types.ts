import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type {
  Media_BaseFragmentFragment,
  Link_BaseFragmentFragment,
  Text_BaseFragmentFragment
} from '@graphql-sdk/types';

export interface SiteMessageProps {
  sidekickLookup?: any;
  isElevated?: boolean;
  text?: Text_BaseFragmentFragment;
  link?: Link_BaseFragmentFragment;
  icon?: Media_BaseFragmentFragment;
}

export interface SiteMessageOwnerState extends SiteMessageProps {}

interface SiteMessageClasses {
  root: string;
  contentOuterGrid: string;
  contentWrap: string;
  link: string;
  icon: string;
  text: string;
}

export declare type SiteMessageClassKey = keyof SiteMessageClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    SiteMessage: SiteMessageClassKey;
  }

  export interface ComponentsPropsList {
    SiteMessage: SiteMessageProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    SiteMessage?: {
      defaultProps?: ComponentsProps['SiteMessage'];
      styleOverrides?: ComponentsOverrides<Theme>['SiteMessage'];
      variants?: ComponentsVariants['SiteMessage'];
    };
  }
}
