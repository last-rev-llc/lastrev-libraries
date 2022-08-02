import mockNavigationItem from '../NavigationItem/NavigationItem.mock';
import { NavigationBarProps } from './NavigationBar';
import mockLink from '../Link/Link.mock';
import mockTheme from '../../theme';

export const mockWithNavigationItems = (): NavigationBarProps => ({
  variant: 'NavigationBar-three-per-row',
  items: [
    { ...mockNavigationItem() },
    { ...mockNavigationItem() },
    { ...mockNavigationItem() },
    { ...mockNavigationItem() }
  ],
  itemsVariant: 'standard-round',
  sidekickLookup: 'sidekick-lookup'
});

export default (): NavigationBarProps => ({
  variant: 'collection-three-per-row',
  items: [{ ...mockLink() }, { ...mockLink() }, { ...mockLink() }, { ...mockLink() }],
  itemsVariant: 'standard-round',
  sidekickLookup: 'sidekick-lookup'
});
