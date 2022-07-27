import { AccordionProps } from '../Accordion';

export interface CollectionAccordionProps {
  variant?: string;
  itemSpacing?: number;
  itemsVariant?: string;
  items?: AccordionProps[];
  theme?: any;
  sidekickLookup?: any;
}

export interface CollectionAccordionClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to each accordion item */
  item: string;
}

export declare type CollectionAccordionClassKey = keyof CollectionAccordionClasses;
declare const accordionClasses: CollectionAccordionClasses;
export default accordionClasses;
