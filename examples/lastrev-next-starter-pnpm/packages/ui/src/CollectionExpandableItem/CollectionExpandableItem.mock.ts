import { blockContentOnLeftMock } from '../Block/Block.mock';
import { collectionBaseMock } from '../Collection/Collection.mock';
import { quoteBaseMock } from '../Quote/Quote.mock';
import { complexMock } from '../RichText/RichText.mock';

import { randomId } from '../utils/randomId';

import type { CollectionExpandableItemProps } from './CollectionExpandableItem.types';

export const collectionExpandableItemBaseMock = (
  override?: Partial<CollectionExpandableItemProps>
): CollectionExpandableItemProps => {
  return {
    id: randomId(),
    __typename: 'CollectionExpandableItem',
    title: 'Collection Example',
    body: complexMock(),
    content: collectionBaseMock({ introText: undefined })
  };
};

export const collectionExpandableItemBlocksMock = ({ ...override } = {}): CollectionExpandableItemProps => ({
  ...collectionExpandableItemBaseMock(override),
  body: undefined,
  title: 'Block Example',
  content: blockContentOnLeftMock({ introText: undefined, title: 'Block 1 - Title' })
});

export const collectionExpandableItemQuotesMock = ({ ...override } = {}): CollectionExpandableItemProps => ({
  ...collectionExpandableItemBaseMock(override),
  body: undefined,
  title: 'Quote Example',
  content: quoteBaseMock({ quote: 'Quote 1' })
});

export default collectionExpandableItemBaseMock;
