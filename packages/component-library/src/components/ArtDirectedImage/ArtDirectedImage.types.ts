import { File } from '../Media/Media.types';

export interface ArtDirectedImageProps {
  file?: File;
  fileTablet?: File;
  fileMobile?: File;
  title?: string;
  description?: string;
  className?: string;
  priority?: boolean;
}

export interface ArtDirectedImageClasses {
  /** Styles applied to the root element. */
  root: string;
}
export declare type ArtDirectedImageClassKey = keyof ArtDirectedImageClasses;
declare const accordionClasses: ArtDirectedImageClasses;
export default accordionClasses;
