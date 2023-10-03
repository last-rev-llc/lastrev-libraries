import { linkBaseMock, linkSocialMock } from '../Link/Link.mock';
import {
  navigationItemWithChildrenMock,
  navigationItemWithChildrenNestedMock
} from '../NavigationItem/NavigationItem.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { complexMock } from '../RichText/RichText.mock';
import blockBaseMock from '../Block/Block.mock';

import randomId from '../utils/randomId';

import type { FooterProps } from './Footer.types';

// TODO: Update
const footerDefaultMock = (): FooterProps => {
  return {
    id: randomId(),
    __typename: 'Footer',
    logo: mediaBaseImageMock(), // TODO;
    logoUrl: linkBaseMock(),
    disclaimerText: complexMock({ text: 'This is the disclaimer' }),
    socialLinks: [linkSocialMock(), linkSocialMock(), linkSocialMock()],
    navigationItems: [
      navigationItemWithChildrenMock(),
      navigationItemWithChildrenMock(),
      navigationItemWithChildrenMock(),
      navigationItemWithChildrenMock()
    ],
    introContents: [
      blockBaseMock({
        introText: undefined,
        title: 'Intro Block title above footer',
        overline: undefined,
        subtitle: undefined
      })
    ],
    copyrightDisclaimer: complexMock({ text: 'This is the copyright disclaimer' }),
    legalLinks: [linkBaseMock(), linkBaseMock(), linkBaseMock()]
  };
};

export const footerBaseMock = ({ ...override } = {}) => {
  const mock = { ...footerDefaultMock(), ...override };

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
