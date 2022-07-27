import { CardProps } from '../Card';
import { CollectionProps } from '../Collection/Collection.types';

export interface CollectionAccordionMediaProps extends CollectionProps {
  items: CardProps[];
  onClick?: (item: CardProps) => void;
}

export interface CollectionAccordionMediaClasses {
  /** Styles applied to the root element for the CollectionAccordionMedia element*/
  root: string;
  /** Styles applied to the accordionRoot for the CollectionAccordionMedia element. */
  accordionRoot: string;
  /** Styles applied to the selectedMediaRoot for the CollectionAccordionMedia element. */
  selectedMediaRoot: string;
  /** Styles applied to the SelectedMedia ContentModule for the CollectionAccordionMedia element. */
  selectedMedia: string;
  /** Styles applied to the accordionItem for the CollectionAccordionMedia element. */
  accordionItem: string;
}

export declare type CollectionAccordionMediaClassKey = keyof CollectionAccordionMediaClasses;
declare const accordionClasses: CollectionAccordionMediaClasses;
export default accordionClasses;
