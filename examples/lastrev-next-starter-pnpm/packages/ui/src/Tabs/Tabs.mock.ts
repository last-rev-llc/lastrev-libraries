import { introTextMock } from '../Text/Text.mock';

import {
  collectionExpandableItemBaseMock,
  collectionExpandableItemBlocksMock
} from '../CollectionExpandableItem/CollectionExpandableItem.mock';

import { randomId } from '../utils/randomId';

import { type TabsProps, TabsVariants } from './Tabs.types';

export const tabsBaseMock = (override?: Partial<TabsProps>): TabsProps => {
  return {
    id: randomId(),
    __typename: 'CollectionExpandable',
    variant: TabsVariants.default,
    items: [
      collectionExpandableItemBlocksMock({ title: 'Block - Title' }),
      collectionExpandableItemBaseMock({ title: 'Collection - Title' })
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
