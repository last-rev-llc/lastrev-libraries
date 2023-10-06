import Carousel from './Carousel';

import { carouselBaseMock } from './Carousel.mock';
import { CarouselVariants } from './Carousel.types';

export default {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    // TODO: Setup Carousel controls
  }
};

export const OnePerRow = {
  args: { ...carouselBaseMock({ variant: CarouselVariants.onePerRow }) }
};
export const TwoPerRow = {
  args: { ...carouselBaseMock({ variant: CarouselVariants.twoPerRow }) }
};
export const ThreePerRow = {
  args: { ...carouselBaseMock({ variant: CarouselVariants.threePerRow }) }
};
export const FourPerRow = {
  args: { ...carouselBaseMock({ variant: CarouselVariants.fourPerRow }) }
};
export const FivePerRow = {
  args: { ...carouselBaseMock({ variant: CarouselVariants.fivePerRow }) }
};
