import { navigationItemBaseMock } from '../NavigationItem/NavigationItem.mock';

import type { NavigationBarProps } from './NavigationBar.types';

const navigationBarDefaultMock: NavigationBarProps = {
  variant: 'NavigationBar-three-per-row',
  items: [
    { ...navigationItemBaseMock() },
    { ...navigationItemBaseMock() },
    { ...navigationItemBaseMock() },
    { ...navigationItemBaseMock() }
  ],
  itemsVariant: 'standard-round',
  sidekickLookup: 'sidekick-lookup'
};

export const navigationBarBaseMock = ({ ...override } = {}) => ({
  ...navigationBarDefaultMock,
  ...override
});

export default navigationBarBaseMock;
