import { linkBaseMock, linkSocialMock } from '../Link/Link.mock';
import {
  navigationItemWithChildrenMock,
  navigationItemWithChildrenNestedMock,
  navigationItemBaseMock
} from '../NavigationItem/NavigationItem.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { richTextShortMock } from '../RichText/RichText.mock';
import blockBaseMock from '../Block/Block.mock';

import { randomId } from '../utils/randomId';

import type { FooterProps } from './Footer.types';

// TODO: Update
const footerDefaultMock = (): FooterProps => {
  return {
    id: randomId(),
    __typename: 'Footer',
    logo: mediaBaseImageMock(), // TODO;
    logoUrl: linkBaseMock(),
    backgroundColor: 'white',
    disclaimerText: richTextShortMock({ text: 'This is the disclaimer' }),
    socialLinks: [linkSocialMock(), linkSocialMock(), linkSocialMock()],
    navigationItems: [
      navigationItemBaseMock(),
      navigationItemBaseMock(),
      navigationItemBaseMock(),
      navigationItemBaseMock()
    ],
    introContents: [
      blockBaseMock({
        introText: undefined,
        title: 'Intro Block title above footer',
        overline: undefined,
        subtitle: undefined
      })
    ],
    copyrightDisclaimer: richTextShortMock({ text: 'This is the copyright disclaimer' }),
    legalLinks: [linkBaseMock(), linkBaseMock(), linkBaseMock()]
  };
};

export const footerBaseMock = ({ ...override } = {}) => {
  const mock = { ...footerDefaultMock(), ...override };

  return { ...mock, hasSocialLinks: !!mock?.socialLinks?.length };
};

export const footerChildrenMock = ({ ...override } = {}) => {
  const mock = {
    ...footerDefaultMock(),
    navigationItems: [
      navigationItemWithChildrenMock(),
      navigationItemWithChildrenMock(),
      navigationItemWithChildrenMock()
    ],
    ...override
  };

  return { ...mock, hasSocialLinks: !!mock?.socialLinks?.length };
};

export const footerChildrenNestedMock = ({ ...override } = {}) => {
  const mock = {
    ...footerDefaultMock(),
    navigationItems: [
      navigationItemWithChildrenNestedMock(),
      navigationItemWithChildrenNestedMock(),
      navigationItemWithChildrenNestedMock()
    ],
    ...override
  };

  return { ...mock, hasSocialLinks: !!mock?.socialLinks?.length };
};

export default footerBaseMock;
