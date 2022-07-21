import { RichText } from '../Text';

export interface AccordionProps {
  __typename?: string;
  internalTitle?: string;
  variant?: any;
  title?: string;
  body?: RichText;
  sidekickLookup?: any;
  children?: any;
  expanded?: boolean;
  onClick?: (event?: any) => void;
}

export interface AccordionClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element unless `square={true}`. */
  rounded: string;
  /** State class applied to the root element if `expanded={true}`. */
  expanded: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element unless `disableGutters={true}`. */
  gutters: string;
  /** Styles applied to the region element, the container of the children. */
  region: string;
  /** Styles applied to the region element, the container of the children. */
  accordionSummary: string;
  /** Styles applied to the region element, the container of the children. */
  accordionDetails: string;
  /** Styles applied to the region element, the container of the children. */
  accordionTitle: string;
  /** Styles applied to the region element, the container of the children. */
  accordionBody: string;
  /** Styles applied to the region element, the container of the children. */
  expandMoreIcon: string;
}
export declare type AccordionClassKey = keyof AccordionClasses;
declare const accordionClasses: AccordionClasses;
export default accordionClasses;
