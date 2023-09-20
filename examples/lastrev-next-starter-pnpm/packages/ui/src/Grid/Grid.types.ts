import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { Grid_BaseFragmentFragment } from '@graphql-sdk/types';

export enum GridVariants {
  default = 'default',
  contentOnRight = 'contentOnRight',
  contentOnRightFullBleed = 'contentOnRightFullBleed',
  contentOnLeft = 'contentOnLeft',
  contentOnLeftFullBleed = 'contentOnLeftFullBleed',
  contentBelow = 'contentBelow',
  contentAbove = 'contentAbove'
}

export interface GridProps extends Grid_BaseFragmentFragment {}

export interface GridClasses {
  root: string;
  introTextWrapper: string;
  introText: string;
  contentOuterGrid: string;
  categoriesWrapper: string;
  mainContentWrapper: string;
  content: string;
  angledArrowIcon: string;
  overline: string;
  title: string;
  subtitle: string;
  body: string;
  sideContentWrapper: string;
  mediaItems: string;
  actionsWrapper: string;
  action: string;
  common: string;
}

export declare type GridClassKey = keyof GridClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Grid: GridClassKey;
  }
  export interface ComponentsPropsList {
    Grid: GridProps;
  }
}
declare module '@mui/material/styles' {
  interface Components {
    Grid?: {
      defaultProps?: ComponentsProps['Grid'];
      styleOverrides?: ComponentsOverrides<Theme>['Grid'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Grid'];
    };
  }
}
