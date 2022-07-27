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
  /** Styles applied to the root element for the Accordion element*/
  root: string;
  /** Styles applied to the root element unless `square={true}`. */
  rounded: string;
  /** State class applied to the root element if `expanded={true}`. */
  expanded: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element unless `disableGutters={true}`. */
  gutters: string;
  /** Styles applied to the Region element, the container of the children. */
  region: string;
  /** Styles applied to the Summary for the Accordion element. */
  summary: string;
  /** Styles applied to the Details for the Accordion element. */
  details: string;
  /** Styles applied to the Typography of the title text for the Accordion element. */
  title: string;
  /** Styles applied to the Text of the body for the Accordion element. */
  body: string;
  /** Styles applied to the ExpandMore Icon for the Accordion element. */
  expandMoreIcon: string;
}
export declare type AccordionClassKey = keyof AccordionClasses;
declare const accordionClasses: AccordionClasses;
export default accordionClasses;
