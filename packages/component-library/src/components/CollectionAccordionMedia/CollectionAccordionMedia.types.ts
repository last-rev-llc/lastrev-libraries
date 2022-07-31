import { CardProps } from '../Card';
import { CollectionProps } from '../Collection/Collection.types';

export interface CollectionAccordionMediaProps extends CollectionProps {
  items: CardProps[];
  onClick?: (item: CardProps) => void;
}

export interface CollectionAccordionMediaClasses {
  /** Styles applied to the root element element*/
  root: string;
  /** Styles applied to the accordionRoot element. */
  accordionRoot: string;
  /** Styles applied to the selectedMediaRoot element. */
  selectedMediaRoot: string;
  /** Styles applied to the SelectedMedia ContentModule element. */
  selectedMedia: string;
  /** Styles applied to the accordionItem element. */
  accordionItem: string;
}

export declare type CollectionAccordionMediaClassKey = keyof CollectionAccordionMediaClasses;
declare const collectionAccordionMediaClasses: CollectionAccordionMediaClasses;
export default collectionAccordionMediaClasses;
