import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { MediaProps } from '../Media/Media.types';
import type { RichText } from '../RichText/RichText.types';
import type { LinkProps } from '../Link/Link.types';

export interface SiteMessageProps {
  sidekickLookup?: any;
  isElevated?: boolean;
  text?: RichText;
  link?: LinkProps;
  icon?: MediaProps;
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
