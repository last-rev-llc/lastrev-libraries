export interface SEOProps {
  seo?: any;
  enableAntiFlicker?: boolean;
}

export interface SEOClasses {
  // /** Styles applied to the root element. */
  // root: string;
}

export declare type SEOClassKey = keyof SEOClasses;
declare const seoClasses: SEOClasses;
export default seoClasses;
