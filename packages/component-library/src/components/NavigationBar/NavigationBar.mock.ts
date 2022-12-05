import mockNavigationItem from '../NavigationItem/NavigationItem.mock';
import { NavigationBarProps } from './NavigationBar.types';
import mockLink from '../Link/Link.mock';

export const mockWithNavigationItems = (): NavigationBarProps => ({
  variant: 'NavigationBar-three-per-row',
  items: [
    { ...mockNavigationItem() },
    { ...mockNavigationItem() },
    { ...mockNavigationItem() },
    { ...mockNavigationItem() }
  ],
  itemsVariant: 'standard-round',
  sidekickLookup: 'sisdekick-lookup'
});

export default (): NavigationBarProps => ({
  variant: 'collection-three-per-row',
  items: [{ ...mockLink() }, { ...mockLink() }, { ...mockLink() }, { ...mockLink() }],
  itemsVariant: 'standard-round',
  sidekickLookup: 'sidekick-lookup'
});
