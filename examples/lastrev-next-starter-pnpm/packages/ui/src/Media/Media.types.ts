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
}
export interface MediaVideoProps extends MediaProps {
  controls: boolean;
}

interface MediaClasses {
  /** Styles applied to the root element. */
  root: string;
}

export declare type MediaClassKey = keyof MediaClasses;
declare const accordionClasses: MediaClasses;
export default accordionClasses;
