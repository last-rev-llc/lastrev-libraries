import { Media_BaseFragmentFragment } from '@graphql-sdk/types';
import { ComponentsOverrides, ComponentsProps, ComponentsVariants } from '@mui/material';

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
}
export interface MediaOwnerState extends MediaProps {}
export interface MediaVideoProps extends MediaProps {
  controls: boolean;
}

export interface MediaClasses {
  /** Styles applied to the root element. */
  root: string;
}

export declare type MediaClassKey = keyof MediaClasses;
declare const accordionClasses: MediaClasses;
export default accordionClasses;

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
      /**
       * @deprecated pass a callback to the slot in `styleOverrides` instead. [See example](https://mui.com/customization/theme-components/#overrides-based-on-props)
       */
      variants?: ComponentsVariants['Media'];
    };
  }
}
