import mockNavigationItem from '../NavigationItem/NavigationItem.mock';
import mockTheme from '../../theme/mock.theme';

export default {
  variant: 'collection-three-per-row',
  items: [
    { ...mockNavigationItem() },
    { ...mockNavigationItem() },
    { ...mockNavigationItem() },
    { ...mockNavigationItem() }
  ],
  itemsVariant: 'standard-round',
  theme: [mockTheme]
};
