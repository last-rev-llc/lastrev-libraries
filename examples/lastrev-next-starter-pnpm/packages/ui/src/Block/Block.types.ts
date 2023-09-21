import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { Block_BaseFragmentFragment } from '@graphql-sdk/types';

export enum BlockVariants {
  default = 'default',
  contentOnRight = 'contentOnRight',
  contentOnRightFullBleed = 'contentOnRightFullBleed',
  contentOnLeft = 'contentOnLeft',
  contentOnLeftFullBleed = 'contentOnLeftFullBleed',
  contentBelow = 'contentBelow',
  contentAbove = 'contentAbove'
}

export interface BlockProps extends Block_BaseFragmentFragment {}
export interface BlockOwnerState extends BlockProps {}

export interface BlockClasses {
  root: string;
  introTextGrid: string;
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

export declare type BlockClassKey = keyof BlockClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Block: BlockClassKey;
  }
  export interface ComponentsPropsList {
    Block: BlockProps;
  }
}
declare module '@mui/material/styles' {
  interface Components {
    Block?: {
      defaultProps?: ComponentsProps['Block'];
      styleOverrides?: ComponentsOverrides<Theme>['Block'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Block'];
    };
  }
}
