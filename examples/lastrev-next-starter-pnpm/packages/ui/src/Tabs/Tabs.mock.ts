import { introTextMock } from '../Text/Text.mock';

import {
  collectionExpandableItemBaseMock,
  collectionExpandableItemQuotesMock,
  collectionExpandableItemBlocksMock
} from '../CollectionExpandableItem/CollectionExpandableItem.mock';

import randomId from '../utils/randomId';

import type { TabsProps } from './Tabs.types';

export const tabsBaseMock = (override?: Partial<TabsProps>): TabsProps => {
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

export const tabsBlocksMock = ({ ...override } = {}) => ({
  ...tabsBaseMock(override),
  items: [
    collectionExpandableItemBlocksMock({ title: 'Block 1 - Title' }),
    collectionExpandableItemBlocksMock({ title: 'Block 2 - Title' }),
    collectionExpandableItemBlocksMock({ title: 'Block 3 - Title' }),
    collectionExpandableItemBlocksMock({ title: 'Block 4 - Title' })
  ]
});

export const tabsCollectionMock = ({ ...override } = {}) => ({
  ...tabsBaseMock(override),
  items: [
    collectionExpandableItemBaseMock({ title: 'Collection 1 - Title' }),
    collectionExpandableItemBaseMock({ title: 'Collection 2 - Title' })
  ]
});

export const tabsQuotesMock = ({ ...override } = {}) => ({
  ...tabsBaseMock(override),
  items: [
    collectionExpandableItemQuotesMock({ title: 'Quote 1' }),
    collectionExpandableItemQuotesMock({ title: 'Quote 2' }),
    collectionExpandableItemQuotesMock({ title: 'Quote 3' }),
    collectionExpandableItemQuotesMock({ title: 'Quote 4' })
  ]
});
