import { Swiper } from 'swiper/react';
import { MediaProps } from '../Media';
import { CardProps } from '../Card';
import { Breakpoint } from '@mui/material';

export interface CollectionCarouselProps {
  variant: string;
  items?: CardProps[];
  background?: MediaProps;
  itemsVariant?: string;
  itemsWidth?: false | Breakpoint | undefined;
  theme?: any;
  sidekickLookup: string;
  CarouselVariantProps?: { [key: string]: Swiper };
}

export interface CollectionCarouselClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the contentContainer element. */
  contentContainer: string;
  /** Styles applied to the carouselContainer element. */
  carouselContainer: string;
  /** Styles applied to every carouselItem element. */
  carouselItem: string;
}

export declare type CollectionCarouselClassKey = keyof CollectionCarouselClasses;
declare const accordionClasses: CollectionCarouselClasses;
export default accordionClasses;
