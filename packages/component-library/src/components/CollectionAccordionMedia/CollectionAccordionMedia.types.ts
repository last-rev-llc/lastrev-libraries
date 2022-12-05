import { CardProps } from '../Card';
import { CollectionProps } from '../Collection/Collection.types';

export interface CollectionAccordionMediaProps extends CollectionProps {
  items: CardProps[];
  onClick?: (item: CardProps) => void;
}

export interface CollectionAccordionMediaClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the accordionRoot element. */
  accordionRoot: string;
  /** Styles applied to the selectedMediaRoot element. */
  selectedMediaRoot: string;
  /** Styles applied to the selectedMedia element. */
  selectedMedia: string;
  /** Styles applied to the accordionItem element. */
  accordionItem: string;
}

export declare type CollectionAccordionMediaClassKey = keyof CollectionAccordionMediaClasses;
declare const accordionClasses: CollectionAccordionMediaClasses;
export default accordionClasses;
