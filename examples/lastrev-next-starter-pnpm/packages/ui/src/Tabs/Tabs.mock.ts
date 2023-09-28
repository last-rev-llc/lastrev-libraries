import { lorem } from 'faker';
import type { TabsProps } from './Tabs.types';
import { cardBaseMock } from '../Card/Card.mock';
import { blockContentOnLeftMock } from '../Block/Block.mock';
import { collectionBaseMock } from '../Collection/Collection.mock';
import { quoteBaseMock } from '../Quote/Quote.mock';
import { introTextMock } from '../Text/Text.mock';

const TabsDefaultMock: TabsProps = {
  id: lorem.word(),
  __typename: 'CollectionExpandable',
  items: [
    cardBaseMock({ title: 'Card 1 - Title' }),
    cardBaseMock({ title: 'Card 2 - Title' }),
    cardBaseMock({ title: 'Card 3 - Title' }),
    cardBaseMock({ title: 'Card 4 - Title' })
  ],
  introText: introTextMock()
};

export const TabsBaseMock = ({ ...override } = {}) => ({
  ...TabsDefaultMock,
  ...override
});

export const TabsCardsMock = ({ ...override } = {}) => ({
  ...TabsDefaultMock,
  items: [
    collectionBaseMock({ introText: undefined, title: 'Collection 1 - Title' }),
    collectionBaseMock({ introText: undefined, title: 'Collection 2 - Title' })
  ],
  ...override
});

export const TabsBlocksMock = ({ ...override } = {}) => ({
  ...TabsDefaultMock,
  ...override,
  items: [
    blockContentOnLeftMock({ introText: undefined, title: 'Block 1 - Title' }),
    blockContentOnLeftMock({ introText: undefined, title: 'Block 2 - Title' }),
    blockContentOnLeftMock({ introText: undefined, title: 'Block 3 - Title' }),
    blockContentOnLeftMock({ introText: undefined, title: 'Block 4 - Title' })
  ]
});

export const TabsQuotesMock = ({ ...override } = {}) => ({
  ...TabsDefaultMock,
  ...override,
  items: [
    quoteBaseMock({ quote: 'Quote 1' }),
    quoteBaseMock({ quote: 'Quote 2' }),
    quoteBaseMock({ quote: 'Quote 3' }),
    quoteBaseMock({ quote: 'Quote 4' })
  ]
});

export default TabsBaseMock;
