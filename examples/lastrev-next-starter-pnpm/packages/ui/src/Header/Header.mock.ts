import { linkBaseMock, linkButtonMock } from '../Link/Link.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import {
  navigationItemBaseMock,
  navigationItemWithChildrenMock,
  navigationItemWithChildrenNestedMock
} from '../NavigationItem/NavigationItem.mock';

import { type HeaderProps, HeaderVariants } from './Header.types';

import { randomId } from '../utils/randomId';

const headerDefaultMock = (): HeaderProps => {
  return {
    id: randomId(),
    __typename: 'Header',
    variant: HeaderVariants.elevation,
    logo: mediaBaseImageMock(),
    logoUrl: linkBaseMock(),
    backgroundColor: 'white',
    ctaItems: [linkButtonMock({ text: 'Header CTA 1' }), linkButtonMock({ text: 'Header CTA 1' })],
    navigationItems: [navigationItemBaseMock(), navigationItemBaseMock(), navigationItemBaseMock()],
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
