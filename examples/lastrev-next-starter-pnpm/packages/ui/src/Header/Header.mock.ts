import { lorem } from 'faker';

import { linkBaseMock, linkButtonMock } from '../Link/Link.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import {
  navigationItemBaseMock,
  navigationItemWithChildrenMock,
  navigationItemWithChildrenNestedMock
} from '../NavigationItem/NavigationItem.mock';

import { type HeaderProps, HeaderVariants } from './Header.types';
import siteMessageBaseMock from '../SiteMessage/SiteMessage.mock';

const headerDefaultMock = (): HeaderProps => {
  const siteMessageMock = siteMessageBaseMock();
  return {
    id: lorem.word(),
    __typename: 'Header',
    variant: HeaderVariants.elevation,
    logo: mediaBaseImageMock(),
    ctaItems: [linkButtonMock({ text: lorem.words(1) }), linkButtonMock({ text: lorem.words(1) })],
    logoUrl: linkBaseMock(),
    navigationItems: [navigationItemBaseMock(), navigationItemBaseMock(), navigationItemBaseMock()],
    siteMessageIcon: siteMessageMock.icon,
    siteMessageLink: siteMessageMock.link,
    siteMessageText: siteMessageMock.text,
    sidekickLookup: {} // TODO: Mock
  };
};

export const headerBaseMock = ({ ...override } = {}) => {
  const mock = {
    ...headerDefaultMock(),
    ...override
  };

  return { ...mock, hasCtaItems: !!mock?.ctaItems?.length };
};

export const headerChildrenMock = ({ ...override } = {}) => {
  const mock = {
    ...headerDefaultMock(),
    navigationItems: [
      navigationItemWithChildrenMock(),
      navigationItemWithChildrenMock(),
      navigationItemWithChildrenMock()
    ],
    ...override
  };

  return { ...mock, hasCtaItems: !!mock?.ctaItems?.length };
};

export const headerChildrenNestedMock = ({ ...override } = {}) => {
  const mock = {
    ...headerDefaultMock(),
    navigationItems: [
      navigationItemWithChildrenNestedMock(),
      navigationItemWithChildrenNestedMock(),
      navigationItemWithChildrenNestedMock()
    ],
    ...override
  };

  return { ...mock, hasCtaItems: !!mock?.ctaItems?.length };
};

export default headerBaseMock;
