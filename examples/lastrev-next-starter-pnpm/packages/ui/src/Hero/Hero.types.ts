import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { Hero_BaseFragmentFragment } from '@graphql-sdk/types';
import { RichText } from '../RichText/RichText.types';
import { MediaProps } from '../Media/Media.types';
import { LinkProps } from '../Link/Link.types';

// TODO Review
export enum HeroVariants {
  default = 'default',
  mediaOnRight = 'mediaOnRight',
  mediaOnRightFullBleed = 'mediaOnRightFullBleed',
  mediaOnLeft = 'mediaOnLeft',
  mediaOnLeftFullBleed = 'mediaOnLeftFullBleed',
  mediaBelow = 'mediaBelow',
  mediaAbove = 'mediaAbove'
}

// TODO Review
export enum HeroHeightVariants {
  sm = '25vh',
  md = '50vh',
  lg = '75vh',
  xl = '100vh'
}

// TODO: Check these types, but might be needed for owner state in themes
export interface HeroProps extends Hero_BaseFragmentFragment {
  backgroundColor?: string;
  contentHeight?: string;
  contentWidth?: string;
  disableGutters?: boolean;
  variant: string;
  background?: MediaProps;
  overline?: string;
  title?: string;
  subtitle?: string;
  body?: RichText;
  images?: [MediaProps];
  actions?: [LinkProps];
  sidekickLookup?: any;
}

export interface HeroClasses {
  heroRoot: string;
  mainContentWrapper: string;
  contentOuterGrid: string;
  content: string;
  backgroundRoot: string;
  backgroundRootContent: string;
  contentHeightSM: string;
  contentHeightMD: string;
  contentHeightLG: string;
  contentHeightXL: string;
  overline: string;
  title: string;
  subtitle: string;
  body: string;
  sideContentWrapper: string;
  images: string;
  actionsWrapper: string;
  action: string;
  common: string;
}

export declare type HeroClassKey = keyof HeroClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Hero: HeroClassKey;
  }
  export interface ComponentsPropsList {
    Hero: HeroProps;
  }
}
declare module '@mui/material/styles' {
  interface Components {
    Hero?: {
      defaultProps?: ComponentsProps['Hero'];
      styleOverrides?: ComponentsOverrides<Theme>['Hero'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Hero'];
    };
  }
}
