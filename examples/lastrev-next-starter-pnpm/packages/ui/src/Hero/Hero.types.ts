import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';
import { Palette } from '@mui/material/styles';

import { Hero_BaseFragmentFragment } from '@graphql-sdk/types';

type Color = keyof Palette;

//TODO
export enum HeroVariants {
  default = 'default'
}

export interface HeroProps extends Hero_BaseFragmentFragment {}

export interface HeroClasses {
  root: string;
  mediaRoot: string;
  backgroundRoot: string;
  actionsRoot: string;
  contentContainer: string;
  contentHeightSM: string;
  contentHeightMD: string;
  contentHeightLG: string;
  contentHeightXL: string;
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
