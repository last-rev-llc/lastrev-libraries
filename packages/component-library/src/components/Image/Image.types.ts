export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  columns?: number;
  priority?: boolean;
  itemProp?: string;
  testId?: string;
  media?: string;
  width?: number;
  disableInlineSVG?: boolean;
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
