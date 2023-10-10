import { cardBaseMock } from '../Card/Card.mock';
import { CardVariants } from '../Card';
import { introTextMock } from '../Text/Text.mock';

import { randomId } from '../utils/randomId';

import { type CarouselProps, CarouselVariants } from './Carousel.types';

export const carouselBaseMock = (override?: Partial<CarouselProps>): CarouselProps => {
  const itemsVariant = override?.itemsVariant ?? CardVariants.default;
  const baseMock: CarouselProps = {
    id: randomId(),
    __typename: 'Carousel',
    variant: CarouselVariants.threePerRow,
    backgroundColor: 'black',
    items: [
      cardBaseMock({ variant: itemsVariant }),
      cardBaseMock({ variant: itemsVariant }),
      cardBaseMock({ variant: itemsVariant }),
      cardBaseMock({ variant: itemsVariant })
      // cardBaseMock({ variant: override?.itemsVariant })
    ],
    itemsVariant: itemsVariant,
    introText: introTextMock({
      title: `This is the Carousel ${override?.variant}-${override?.itemsVariant} title`
    }),
    isCarouselDesktop: false,
    isCarouselTablet: true,
    isCarouselMobile: false
  };

  let variantOverride;
  switch (override?.variant) {
    default:
      variantOverride = {};
  }

  return { ...baseMock, ...variantOverride, ...override } as CarouselProps;
};

export default carouselBaseMock;
