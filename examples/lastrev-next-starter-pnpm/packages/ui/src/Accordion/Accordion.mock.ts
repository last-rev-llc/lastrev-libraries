import { introTextMock } from '../Text/Text.mock';

import {
  collectionExpandableItemBaseMock,
  collectionExpandableItemBlocksMock
} from '../CollectionExpandableItem/CollectionExpandableItem.mock';

import { randomId } from '../utils/randomId';

import { type AccordionProps, AccordionVariants } from './Accordion.types';

export const accordionBaseMock = (override?: Partial<AccordionProps>): AccordionProps => {
  return {
    id: randomId(),
    __typename: 'Accordion',
    variant: AccordionVariants.default,
    items: [
      collectionExpandableItemBlocksMock({ title: 'Block - Title' }),
      collectionExpandableItemBaseMock({ title: 'Collection - Title' })
    ],
    introText: introTextMock()
  };
};

export const accordionBlocksMock = ({ ...override } = {}) => ({
  ...accordionBaseMock(override),
  items: [
    collectionExpandableItemBlocksMock({ title: 'Block 1 - Title' }),
    collectionExpandableItemBlocksMock({ title: 'Block 2 - Title' }),
    collectionExpandableItemBlocksMock({ title: 'Block 3 - Title' }),
    collectionExpandableItemBlocksMock({ title: 'Block 4 - Title' })
  ]
});

export const accordionCollectionsMock = ({ ...override } = {}) => ({
  ...accordionBaseMock(override),
  items: [
    collectionExpandableItemBaseMock({ title: 'Collection 1 - Title' }),
    collectionExpandableItemBaseMock({ title: 'Collection 2 - Title' })
  ]
});

export default accordionBaseMock;
