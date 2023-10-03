import { introTextMock } from '../Text/Text.mock';

import {
  collectionExpandableItemBaseMock,
  collectionExpandableItemQuotesMock,
  collectionExpandableItemBlocksMock
} from '../CollectionExpandableItem/CollectionExpandableItem.mock';

import randomId from '../utils/randomId';

import { AccordionProps } from './Accordion.types';

export const accordionBaseMock = (override?: Partial<AccordionProps>): AccordionProps => {
  return {
    id: randomId(),
    __typename: 'CollectionExpandable',
    items: [
      collectionExpandableItemBlocksMock({ title: 'Block - Title' }),
      collectionExpandableItemBaseMock({ title: 'Collection - Title' }),
      collectionExpandableItemQuotesMock({ title: 'Quote - Title' })
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

export const accordionQuotesMock = ({ ...override } = {}) => ({
  ...accordionBaseMock(override),
  items: [
    collectionExpandableItemQuotesMock({ title: 'Quote 1' }),
    collectionExpandableItemQuotesMock({ title: 'Quote 2' }),
    collectionExpandableItemQuotesMock({ title: 'Quote 3' }),
    collectionExpandableItemQuotesMock({ title: 'Quote 4' })
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
