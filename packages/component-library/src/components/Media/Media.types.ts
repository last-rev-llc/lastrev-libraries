import { ImageProps } from '../Image';

export interface File {
  url?: string;
  width?: number;
  height?: number;
}
export interface Asset {
  file: File;
  title?: string;
  description?: string;
}
export interface MediaProps extends Omit<ImageProps, 'src'> {
  __typename?: any;
  file?: File;
  fileTablet?: File;
  fileMobile?: File;
  variant?: string;
  title?: string;
  description?: string;
  alt?: string;
  desktop?: Asset;
  tablet?: Asset;
  mobile?: Asset;
  sidekickLookup?: any;
  sx?: any;
  testId?: string;
  priority?: boolean;
  disableInlineSVG?: boolean;
  q?: number;
  unoptimized?: boolean;
}
export interface MediaVideoProps {
  variant?: string;
  file?: File;
  title?: string;
  sidekickLookup?: any;
  sx?: any;
  testId?: string;
  controls?: boolean;
}

export interface MediaClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the artDirectedRoot element. */
  artDirectedRoot: string;
  /** Styles applied to the embedRoot element. */
  embedRoot: string;
  /** Styles applied to the videoRoot element. */
  videoRoot: string;
}

export declare type MediaClassKey = keyof MediaClasses;
declare const accordionClasses: MediaClasses;
export default accordionClasses;
