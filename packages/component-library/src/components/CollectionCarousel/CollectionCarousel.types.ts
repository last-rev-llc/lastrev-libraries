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
  /** Styles applied to the ContentContainer element. */
  contentContainer: string;
  /** Styles applied to the CarouselContent (Swiper) element. */
  carouselContainer: string;
  /** Styles applied each Slide(SwiperSlide) Root element. */
  slideRoot: string;
  /** Styles applied each Slide Box element. */
  item: string;
  /** Styles applied to the CarouselContent ContentModule element. */
  contentModule: string;
}

export declare type CollectionCarouselClassKey = keyof CollectionCarouselClasses;
declare const collectionCarouselClasses: CollectionCarouselClasses;
export default collectionCarouselClasses;
