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

export interface ContentPreviewClasses {
  // /** Styles applied to the root element. */
  // root: string;
}

export declare type ContentPreviewClassKey = keyof ContentPreviewClasses;
declare const contentPreviewClasses: ContentPreviewClasses;
export default contentPreviewClasses;
