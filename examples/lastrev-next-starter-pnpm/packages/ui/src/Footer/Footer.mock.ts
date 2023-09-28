import { lorem } from 'faker';

import { linkBaseMock, linkSocialMock } from '../Link/Link.mock';
import {
  navigationItemWithChildrenMock,
  navigationItemWithChildrenNestedMock
} from '../NavigationItem/NavigationItem.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { richTextMock } from '../RichText/RichText.mock';

import type { FooterProps } from './Footer.types';
import blockBaseMock from '../Block/Block.mock';

// TODO: Update
const footerDefaultMock = (): FooterProps => {
  return {
    id: lorem.word(),
    __typename: 'Footer',
    logo: mediaBaseImageMock(), // TODO;
    logoUrl: linkBaseMock(),
    disclaimer: richTextMock({ text: 'This is the disclaimer' }),
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
    copyrightDisclaimer: richTextMock({ text: 'This is the copyright disclaimer' }),
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
