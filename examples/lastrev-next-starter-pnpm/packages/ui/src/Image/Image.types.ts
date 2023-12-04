import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';
// TODO: Needed?
//import type { Image_BaseFragmentFragment } from '@graphql-sdk/types';
import type { ImageProps as NextImageProps } from 'next/image';

export interface ColumnConfig {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}
export interface ImageProps extends Omit<NextImageProps, 'src' | 'width' | 'height' | 'sizes'> {
  src?: string;
  className?: string;
  columns?: ColumnConfig;
  priority?: boolean;
  itemProp?: string;
  testId?: string;
  media?: string;
  width?: number | string | `${number}` | undefined;
  height?: number | string | `${number}` | undefined;
  disableInlineSVG?: boolean;
  nextImageOptimization?: boolean;
  q?: number;
  unoptimized?: boolean;
  svgContent?: string;
  aspectRatio?: string;
}

//TODO: Use styled for Image
interface ImageClasses {}

export declare type ImageClassKey = keyof ImageClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Image: ImageClassKey;
  }

  export interface ComponentsPropsList {
    Image: ImageProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Image?: {
      defaultProps?: ComponentsProps['Image'];
      styleOverrides?: ComponentsOverrides<Theme>['Image'];
      variants?: ComponentsVariants['Image'];
    };
  }
}
