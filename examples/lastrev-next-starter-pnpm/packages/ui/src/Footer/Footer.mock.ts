import { lorem } from 'faker';

import { linkTextMock } from '../Link/Link.mock';
import { navigationItemBaseMock } from '../NavigationItem/NavigationItem.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { richTextMock } from '../RichText/RichText.mock';

import { FooterProps } from './Footer.types';

// TODO: Update
const footerDefaultMock: FooterProps = {
  id: lorem.word(),
  __typename: 'Footer',
  logo: mediaBaseImageMock(), // TODO;
  logoUrl: linkTextMock(),
  disclaimer: richTextMock({ text: 'This is the disclaimer' }),
  socialLinks: [linkTextMock(), linkTextMock(), linkTextMock()],
  navigationItems: [
    navigationItemBaseMock(),
    navigationItemBaseMock(),
    navigationItemBaseMock(),
    navigationItemBaseMock()
  ],
  introContents: richTextMock({ text: 'This is the intro content' }),
  copyrightDisclaimer: richTextMock({ text: 'This is the copyright disclaimer' }),
  legalLinks: [linkTextMock(), linkTextMock(), linkTextMock()]
};

export const footerBaseMock = ({ ...override } = {}) => ({
  ...footerDefaultMock,
  ...override
});

export default footerBaseMock;
