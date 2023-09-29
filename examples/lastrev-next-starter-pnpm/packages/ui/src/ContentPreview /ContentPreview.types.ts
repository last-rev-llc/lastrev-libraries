export interface ContentPreviewProps {
  id?: string;
  loading?: boolean;
  content?: any;
  error?: any;
  environment?: string;
  spaceId?: string;
  locale?: string;
  pageURL?: string;
  livePreview?: boolean;
}

interface ContentPreviewClasses {
  // /** Styles applied to the root element. */
  // root: string;
}

export declare type ContentPreviewClassKey = keyof ContentPreviewClasses;
declare const accordionClasses: ContentPreviewClasses;
export default accordionClasses;
