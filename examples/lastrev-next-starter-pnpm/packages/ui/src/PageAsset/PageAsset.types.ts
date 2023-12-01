import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';
import type { PageAsset_BaseFragmentFragment } from '@graphql-sdk/types';

export enum PropertyVariants {
  default = 'default'
}

export interface PageAssetProps extends PageAsset_BaseFragmentFragment {}

export interface PageAssetOwnerState extends PageAssetProps {}

interface PageAssetClasses {
  root: string;
}

export declare type PageAssetClassKey = keyof PageAssetClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    PageAsset: PageAssetClassKey;
  }

  export interface ComponentsPropsList {
    PageAsset: PageAssetProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    PageAsset?: {
      defaultProps?: ComponentsProps['PageAsset'];
      styleOverrides?: ComponentsOverrides<Theme>['PageAsset'];
      variants?: ComponentsVariants['PageAsset'];
    };
  }
}
