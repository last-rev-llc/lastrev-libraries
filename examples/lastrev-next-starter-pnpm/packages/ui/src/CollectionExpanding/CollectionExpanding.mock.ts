import { lorem } from 'faker';
import { CollectionExpandingProps } from './CollectionExpanding.types';
import { cardBaseMock } from '../Card/Card.mock';
import { blockContentOnLeftMock } from '../Block/Block.mock';
import { collectionBaseMock } from '../Collection/Collection.mock';
import { quoteBaseMock } from '../Quote/Quote.mock';
import { introTextMock } from '../Text/Text.mock';

const collectionExpandingDefaultMock: CollectionExpandingProps = {
  id: lorem.word(),
  __typename: 'collectionExpanding',
  items: [
    cardBaseMock({ title: 'Card 1 - Title' }),
    cardBaseMock({ title: 'Card 2 - Title' }),
    cardBaseMock({ title: 'Card 3 - Title' }),
    cardBaseMock({ title: 'Card 4 - Title' })
  ],
  introText: introTextMock()
};

export const collectionExpandingBaseMock = ({ ...override } = {}) => ({
  ...collectionExpandingDefaultMock,
  ...override
});

export const collectionExpandingCardsMock = ({ ...override } = {}) => ({
  ...collectionExpandingDefaultMock,
  items: [
    collectionBaseMock({ introText: undefined, title: 'Collection 1 - Title' }),
    collectionBaseMock({ introText: undefined, title: 'Collection 2 - Title' })
  ],
  ...override
});

export const collectionExpandingBlocksMock = ({ ...override } = {}) => ({
  ...collectionExpandingDefaultMock,
  ...override,
  items: [
    blockContentOnLeftMock({ introText: undefined, title: 'Block 1 - Title' }),
    blockContentOnLeftMock({ introText: undefined, title: 'Block 2 - Title' }),
    blockContentOnLeftMock({ introText: undefined, title: 'Block 3 - Title' }),
    blockContentOnLeftMock({ introText: undefined, title: 'Block 4 - Title' })
  ]
});

export const collectionExpandingQuotesMock = ({ ...override } = {}) => ({
  ...collectionExpandingDefaultMock,
  ...override,
  items: [
    quoteBaseMock({ quote: 'Quote 1' }),
    quoteBaseMock({ quote: 'Quote 2' }),
    quoteBaseMock({ quote: 'Quote 3' }),
    quoteBaseMock({ quote: 'Quote 4' })
  ]
});

export default collectionExpandingBaseMock;
