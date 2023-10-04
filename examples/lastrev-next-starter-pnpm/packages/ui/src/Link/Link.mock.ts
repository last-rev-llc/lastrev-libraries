import { randomId } from '../utils/randomId';

import { type LinkProps, LinkVariants } from './Link.types';

const linkDefaultMock = (override?: Partial<LinkProps>): LinkProps => ({
  id: randomId(),
  __typename: 'Link',
  variant: LinkVariants.default,
  href: `#link-url-here`,
  text: 'Link Text',
  ...override
});

export const linkBaseMock = (override?: Partial<LinkProps>): LinkProps => ({
  ...linkDefaultMock(override)
});

export const linkButtonMock = (override?: Partial<LinkProps>): LinkProps => ({
  ...linkDefaultMock({ text: 'Button Text', ...override }),
  variant: LinkVariants.buttonContained
});

export const iconButtonMock = (override?: Partial<LinkProps>): LinkProps => ({
  ...linkDefaultMock({ text: undefined, ...override }),
  variant: LinkVariants.buttonContained,
  icon: 'chevron-right',
  iconPosition: 'Right'
});

export const socialLinkMock = (override?: Partial<LinkProps>): LinkProps => ({
  icon: 'facebook',
  ...linkDefaultMock(override),
  variant: LinkVariants.buttonContained,
  text: undefined
});

export const linkTextMock = (override?: Partial<LinkProps>): LinkProps => ({
  ...linkDefaultMock({ icon: undefined, ...override }),
  variant: LinkVariants.text
});

export const linkSocialMock = (override?: Partial<LinkProps>): LinkProps => ({
  ...socialLinkMock(override)
});

export default linkBaseMock;
