import mockNavigationItem from '../NavigationItem/NavigationItem.mock';
import { NavigationBarProps } from './NavigationBar';
import mockTheme from '../../theme/mock.theme';

export default (): NavigationBarProps => ({
  variant: 'collection-three-per-row',
  items: [
    { ...mockNavigationItem() },
    { ...mockNavigationItem() },
    { ...mockNavigationItem() },
    { ...mockNavigationItem() }
  ],
  itemsVariant: 'standard-round',
  theme: [mockTheme],
  sidekickLookup: 'sidekick-lookup'
});
