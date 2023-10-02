import { cardBaseMock } from '../Card/Card.mock';
import { CardVariants } from '../Card';
import { introTextMock } from '../Text/Text.mock';

import randomId from '../utils/randomId';

import { type CollectionProps, CollectionVariants } from './Collection.types';

export const collectionBaseMock = (override?: Partial<CollectionProps>): CollectionProps => {
  const baseMock: CollectionProps = {
    id: randomId(),
    __typename: 'Collection',
    variant: CollectionVariants.threePerRow,
    backgroundColor: 'background',
    items: [
      cardBaseMock({ variant: override?.itemsVariant }),
      cardBaseMock({ variant: override?.itemsVariant }),
      cardBaseMock({ variant: override?.itemsVariant }),
      cardBaseMock({ variant: override?.itemsVariant }),
      cardBaseMock({ variant: override?.itemsVariant })
    ],
    itemsVariant: CardVariants.default,
    introText: introTextMock({
      title: `This is the Collection ${override?.variant}-${override?.itemsVariant} title`
    })
  };

  let variantOverride;
  switch (override?.variant) {
    default:
      variantOverride = {};
  }

  return { ...baseMock, ...variantOverride, ...override } as CollectionProps;
};

export default collectionBaseMock;
