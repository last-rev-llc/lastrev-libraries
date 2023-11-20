import { cardBaseMock } from '../Card/Card.mock';
import { CardVariants } from '../Card';
import { introTextMock } from '../Text/Text.mock';

import { randomId } from '../utils/randomId';

import { type CarouselDynamicProps, CarouselDynamicVariants } from './CarouselDynamic.types';

export const carouselDynamicBaseMock = (override?: Partial<CarouselDynamicProps>): CarouselDynamicProps => {
  const itemsVariant = override?.itemsVariant ?? CardVariants.default;
  const baseMock: CarouselDynamicProps = {
    id: randomId(),
    __typename: 'Collection',
    variant: CarouselDynamicVariants.threePerRow,
    itemsPerRow: 3, // This needs to stay aligned with the variant
    // backgroundColor: 'black',
    items: [
      cardBaseMock({ variant: itemsVariant }),
      cardBaseMock({ variant: itemsVariant }),
      cardBaseMock({ variant: itemsVariant }),
      cardBaseMock({ variant: itemsVariant })
      // cardBaseMock({ variant: override?.itemsVariant })
    ],
    itemsVariant: itemsVariant,
    introText: introTextMock({
      title: `This is the CarouselDynamic ${override?.variant}-${override?.itemsVariant} title`
    }),
    isCarouselDynamicDesktop: true,
    isCarouselDynamicTablet: true,
    isCarouselDynamicMobile: true
  };

  let variantOverride;
  switch (override?.variant) {
    default:
      variantOverride = {};
  }

  const mock = {
    ...baseMock,
    ...variantOverride,
    ...override,
    numItems: baseMock.items.length
  } as CarouselDynamicProps;
  mock.numItems = baseMock.items.length;

  return mock;
};

export default carouselDynamicBaseMock;
