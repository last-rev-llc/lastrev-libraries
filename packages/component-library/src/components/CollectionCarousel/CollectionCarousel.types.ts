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
  /** Styles applied to the root for the CollectionCarousel element. */
  root: string;
  /** Styles applied to the ContentContainer for the CollectionCarousel element. */
  contentContainer: string;
  /** Styles applied to the CarouselContent (Swiper) for the CollectionCarousel element. */
  carouselContainer: string;
  /** Styles applied each Slide(SwiperSlide) Root for the CollectionCarousel element. */
  slideRoot: string;
  /** Styles applied each Slide Box for the CollectionCarousel element. */
  slide: string;
  /** Styles applied to the CarouselContent ContentModule for the CollectionCarousel element. */
  content: string;
}

export declare type CollectionCarouselClassKey = keyof CollectionCarouselClasses;
declare const accordionClasses: CollectionCarouselClasses;
export default accordionClasses;
