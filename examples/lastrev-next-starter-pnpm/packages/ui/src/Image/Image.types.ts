import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';
// TODO: Needed?
//import { Image_BaseFragmentFragment } from '@graphql-sdk/types';
import { ImageProps as NextImageProps } from 'next/image';
export interface ImageProps extends Omit<NextImageProps, 'src' | 'width' | 'height'> {
  src?: string;
  className?: string;
  columns?: number;
  priority?: boolean;
  itemProp?: string;
  testId?: string;
  media?: string;
  width?: number | string | `${number}` | undefined;
  height?: number | string | `${number}` | undefined;
  disableInlineSVG?: boolean;
  nextImageOptimization?: boolean;
  sizes?: string;
  q?: number;
  unoptimized?: boolean;
  svgContent?: string;
}

//TODO: Use styled for Image
export interface ImageClasses {}

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
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Image'];
    };
  }
}
