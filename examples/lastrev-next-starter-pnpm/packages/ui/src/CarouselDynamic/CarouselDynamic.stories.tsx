import CarouselDynamic from './CarouselDynamic';

import { carouselDynamicBaseMock } from './CarouselDynamic.mock';
import { CarouselDynamicVariants } from './CarouselDynamic.types';

export default {
  title: 'Components/CarouselDynamic',
  component: CarouselDynamic,
  tags: ['autodocs'],
  argTypes: {
    isCarouselDynamicDesktop: {
      name: 'Is CarouselDynamic on Desktop?',
      control: {
        type: 'boolean'
      }
    },
    isCarouselDynamicTablet: {
      name: 'Is CarouselDynamic on Tablet?',
      control: {
        type: 'boolean'
      }
    },
    isCarouselDynamicMobile: {
      name: 'Is CarouselDynamic on Mobile?',
      control: {
        type: 'boolean'
      }
    }
  }
};

export const OnePerRow = {
  args: { ...carouselDynamicBaseMock({ variant: CarouselDynamicVariants.onePerRow, itemsPerRow: 1 }) }
};

export const TwoPerRow = {
  args: { ...carouselDynamicBaseMock({ variant: CarouselDynamicVariants.twoPerRow, itemsPerRow: 2 }) }
};

export const ThreePerRow = {
  args: { ...carouselDynamicBaseMock({ variant: CarouselDynamicVariants.threePerRow, itemsPerRow: 3 }) }
};

export const FourPerRow = {
  args: { ...carouselDynamicBaseMock({ variant: CarouselDynamicVariants.fourPerRow, itemsPerRow: 4 }) }
};

export const FivePerRow = {
  args: { ...carouselDynamicBaseMock({ variant: CarouselDynamicVariants.fivePerRow, itemsPerRow: 5 }) }
};
