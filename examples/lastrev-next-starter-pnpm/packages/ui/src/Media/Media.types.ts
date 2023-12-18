import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { Media_BaseFragmentFragment } from '@graphql-sdk/types';

export interface FileProps {
  url?: string;
  width?: number;
  height?: number;
}

export interface AssetProps {
  file: FileProps;
  title?: string;
  description?: string;
}

export interface MediaProps extends Media_BaseFragmentFragment {
  sx?: any;
  testId?: string;
  priority?: boolean;
  disableInlineSVG?: boolean;
  q?: number;
  unoptimized?: boolean;
  nextImageOptimization: boolean;
  sizes: string;
}
export interface MediaVideoProps extends MediaProps {
  controls: boolean;
}

interface MediaClasses {
  /** Styles applied to the root element. */
  root: string;
}

export declare type MediaClassKey = keyof MediaClasses;
declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Media: MediaClassKey;
  }

  export interface ComponentsPropsList {
    Media: MediaProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Media?: {
      defaultProps?: ComponentsProps['Media'];
      styleOverrides?: ComponentsOverrides<Theme>['Media'];
      variants?: ComponentsVariants['Media'];
    };
  }
}
