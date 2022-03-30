import { HeaderProps } from './Header.types';
import { mediaMock } from '../Media/Media.mock';
import collectionMock from '../Collection/Collection.mock';
import navigationItemMock from '../NavigationItem/NavigationItem.mock';

const collection = collectionMock();
collection.items = [navigationItemMock(), navigationItemMock(), navigationItemMock()];

export default (): HeaderProps => ({
  variant: 'elevation',
  logo: mediaMock(),
  logoUrl: 'http://www.example.com',
  navigationItems: [collection],
  sidekickLookup: {}
});
