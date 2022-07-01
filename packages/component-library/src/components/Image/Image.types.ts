import { ImageProps as NextImageProps } from 'next/image';
export interface ImageProps extends NextImageProps {
  className?: string;
  columns?: number;
  priority?: boolean;
  itemProp?: string;
  testId?: string;
  media?: string;
  width?: number;
  disableInlineSVG?: boolean;
  nextImageOptimization?: boolean;
  sizes?: string;
  q?: number;
  unoptimized?: boolean;
}

//TODO: Use styled for Image
export interface ImageClasses {
  /** Styles applied to the root element. */
  // root: string;
}

export declare type ImageClassKey = keyof ImageClasses;
declare const accordionClasses: ImageClasses;
export default accordionClasses;
