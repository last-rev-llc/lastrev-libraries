import Carousel from './Carousel';

import { carouselBaseMock } from './Carousel.mock';
import { CarouselVariants } from './Carousel.types';

export default {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    isCarouselDesktop: {
      name: 'Is Carousel on Desktop?',
      control: {
        type: 'boolean'
      }
    },
    isCarouselTablet: {
      name: 'Is Carousel on Tablet?',
      control: {
        type: 'boolean'
      }
    },
    isCarouselMobile: {
      name: 'Is Carousel on Mobile?',
      control: {
        type: 'boolean'
      }
    }
  }
};

export const OnePerRow = {
  args: { ...carouselBaseMock({ variant: CarouselVariants.onePerRow, itemsPerRow: 1 }) }
};

export const TwoPerRow = {
  args: { ...carouselBaseMock({ variant: CarouselVariants.twoPerRow, itemsPerRow: 2 }) }
};

export const ThreePerRow = {
  args: { ...carouselBaseMock({ variant: CarouselVariants.threePerRow, itemsPerRow: 3 }) }
};

export const FourPerRow = {
  args: { ...carouselBaseMock({ variant: CarouselVariants.fourPerRow, itemsPerRow: 4 }) }
};

export const FivePerRow = {
  args: { ...carouselBaseMock({ variant: CarouselVariants.fivePerRow, itemsPerRow: 5 }) }
};
