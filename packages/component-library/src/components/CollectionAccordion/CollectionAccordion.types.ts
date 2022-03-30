import { AccordionProps } from '../Accordion';

export interface CollectionAccordionProps {
  items?: AccordionProps[];
  variant?: string;
  itemSpacing?: number;
  itemsVariant?: string;
  theme?: any;
  sidekickLookup?: any;
}

export interface CollectionAccordionClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to every accordion item */
  accordionItem: string;
}

export declare type CollectionAccordionClassKey = keyof CollectionAccordionClasses;
declare const accordionClasses: CollectionAccordionClasses;
export default accordionClasses;
