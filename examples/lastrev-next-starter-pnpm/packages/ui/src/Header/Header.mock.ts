import { lorem } from 'faker';

import { linkBaseMock } from '../Link/Link.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import navigationItemMock from '../NavigationItem/NavigationItem.mock';

import { HeaderProps } from './Header.types';

const headerDefaultMock: HeaderProps = {
  id: lorem.word(),
  __typename: 'Header',
  variant: 'elevation',
  logo: mediaBaseImageMock(),
  logoUrl: linkBaseMock(),
  navigationItems: [navigationItemMock(), navigationItemMock(), navigationItemMock()],
  sidekickLookup: {} // TODO: Mock
};

export const headerBaseMock = ({ ...override } = {}) => ({
  ...headerDefaultMock,
  ...override
});

export default headerBaseMock;
