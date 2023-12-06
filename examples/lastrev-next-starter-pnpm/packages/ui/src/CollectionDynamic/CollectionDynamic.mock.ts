import { cardBaseMock } from '../Card/Card.mock';
import { CardVariants } from '../Card';
import { introTextMock } from '../Text/Text.mock';

import { randomId } from '../utils/randomId';

import { type CollectionDynamicProps, CollectionDynamicVariants } from './CollectionDynamic.types';

export const collectionDynamicBaseMock = (override?: Partial<CollectionDynamicProps>): CollectionDynamicProps => {
  const baseMock: CollectionDynamicProps = {
    id: randomId(),
    __typename: 'CollectionDynamic',
    variant: CollectionDynamicVariants.threePerRow,
    // backgroundColor: 'black',
    items: [
      cardBaseMock({ variant: override?.itemsVariant }),
      cardBaseMock({ variant: override?.itemsVariant }),
      cardBaseMock({ variant: override?.itemsVariant }),
      cardBaseMock({ variant: override?.itemsVariant }),
      cardBaseMock({ variant: override?.itemsVariant })
    ],
    itemsVariant: CardVariants.default,
    introText: introTextMock({
      title: `This is the CollectionDynamic ${override?.variant}-${override?.itemsVariant} title`
    })
  };

  let variantOverride;
  switch (override?.variant) {
    default:
      variantOverride = {};
  }

  return { ...baseMock, ...variantOverride, ...override } as CollectionDynamicProps;
};

export default collectionDynamicBaseMock;
