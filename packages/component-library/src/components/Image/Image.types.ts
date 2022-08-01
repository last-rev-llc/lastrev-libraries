import { ImageProps as NextImageProps } from 'next/image';
export interface ImageProps extends Omit<NextImageProps, 'src'> {
  src?: string;
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
  svgContent?: string;
}

//TODO: Use styled for Image
export interface ImageClasses {
  /** Styles applied to the root element. */
  // root: string;
}

export declare type ImageClassKey = keyof ImageClasses;
declare const imageClasses: ImageClasses;
export default imageClasses;
