import { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { FileProps } from '../Media/Media.types';

export interface ArtDirectedImageProps {
  file?: FileProps;
  fileTablet?: FileProps;
  fileMobile?: FileProps;
  title?: string;
  description?: string;
  className?: string;
  priority?: boolean;
  testId?: any;
}

export interface ArtDirectedImageClasses {
  /** Styles applied to the root element. */
  root: string;
}

export declare type ArtDirectedImageClassKey = keyof ArtDirectedImageClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    ArtDirectedImage: ArtDirectedImageClassKey;
  }
  export interface ComponentsPropsList {
    ArtDirectedImage: ArtDirectedImageProps;
  }
}
declare module '@mui/material/styles' {
  interface Components {
    ArtDirectedImage?: {
      defaultProps?: ComponentsProps['ArtDirectedImage'];
      styleOverrides?: ComponentsOverrides<Theme>['ArtDirectedImage'];
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['ArtDirectedImage'];
    };
  }
}
