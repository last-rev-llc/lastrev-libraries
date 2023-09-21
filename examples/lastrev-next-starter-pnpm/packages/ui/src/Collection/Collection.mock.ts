import { lorem } from 'faker';
import { CollectionProps, CollectionVariants } from './Collection.types';
import { cardBaseMock } from '../Card/Card.mock';
import { introTextMock } from '../Text/Text.mock';

export const collectionBaseMock = (override?: Partial<CollectionProps>) => {
  const baseMock = {
    id: lorem.word(),
    __typename: 'Collection',
    variant: 'threePerRow',
    backgroundColor: 'background',
    items: [
      cardBaseMock({ variant: override?.itemsVariant }),
      cardBaseMock({ variant: override?.itemsVariant }),
      cardBaseMock({ variant: override?.itemsVariant }),
      cardBaseMock({ variant: override?.itemsVariant }),
      cardBaseMock({ variant: override?.itemsVariant })
    ],
    itemsVariant: 'default',
    introText: introTextMock({
      title: `This is the Collection ${override?.variant}-${override?.itemsVariant} title`
    })
  };
  let variantOverride;
  switch (override?.variant) {
    default:
      variantOverride = {};
  }
  return { ...baseMock, ...variantOverride, ...override };
};

export default collectionBaseMock;
