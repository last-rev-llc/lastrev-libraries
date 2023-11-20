import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';
import type { PropertyAsset_BaseFragmentFragment } from '@graphql-sdk/types';

export enum PropertyVariants {
  default = 'default'
}

export interface PropertyAssetProps extends PropertyAsset_BaseFragmentFragment {}

export interface PropertyAssetOwnerState extends PropertyAssetProps {}

interface PropertyAssetClasses {
  root: string;
}

export declare type PropertyAssetClassKey = keyof PropertyAssetClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    PropertyAsset: PropertyAssetClassKey;
  }

  export interface ComponentsPropsList {
    PropertyAsset: PropertyAssetProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    PropertyAsset?: {
      defaultProps?: ComponentsProps['PropertyAsset'];
      styleOverrides?: ComponentsOverrides<Theme>['PropertyAsset'];
      variants?: ComponentsVariants['PropertyAsset'];
    };
  }
}
