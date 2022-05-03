import { HeaderProps } from './Header';
import { mediaMock } from '../Media/Media.mock';
import { mockNavigationItemBase, mockNavigationItemSubNavigation } from '../NavigationItem/NavigationItem.mock';
import { mockLinkBase } from '../Link/Link.mock';

export const mockHeaderBase = (): HeaderProps => {
  return {
    variant: 'elevation',
    logo: mediaMock(),
    logoUrl: 'http://www.example.com',
    leftNav: [mockNavigationItemBase()],
    rightNav: [
      { ...mockNavigationItemSubNavigation(), text: 'Link 1' },
      { ...mockNavigationItemSubNavigation(), text: 'Link 2' },
      { ...mockNavigationItemSubNavigation(), text: 'Link 3' }
    ],
    actions: [
      {
        ...mockLinkBase(),
        id: 'header-nav-cta',
        variant: null
      }
    ],
    sidekickLookup: {
      contentId: 'header-nav-cta',
      contentTypeId: 'Link'
    }
  };
};

export default (): HeaderProps => ({
  ...mockHeaderBase()
});
