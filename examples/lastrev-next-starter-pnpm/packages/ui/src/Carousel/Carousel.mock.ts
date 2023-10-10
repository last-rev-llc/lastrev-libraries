import { cardBaseMock } from '../Card/Card.mock';
import { CardVariants } from '../Card';
import { introTextMock } from '../Text/Text.mock';

import { randomId } from '../utils/randomId';

import { type CarouselProps, CarouselVariants } from './Carousel.types';

export const carouselBaseMock = (override?: Partial<CarouselProps>): CarouselProps => {
  const itemsVariant = override?.itemsVariant ?? CardVariants.default;
  const baseMock: CarouselProps = {
    id: randomId(),
    __typename: 'Collection',
    variant: CarouselVariants.threePerRow,
    itemsPerRow: 3, // This needs to stay aligned with the variant
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
    isCarouselDesktop: true,
    isCarouselTablet: true,
    isCarouselMobile: true
  };

  let variantOverride;
  switch (override?.variant) {
    default:
      variantOverride = {};
  }

  const mock = { ...baseMock, ...variantOverride, ...override, numItems: baseMock.items.length } as CarouselProps;
  mock.numItems = baseMock.items.length;

  return mock;
};

export default carouselBaseMock;
