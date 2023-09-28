import { lorem } from 'faker';
import { type LinkProps, LinkVariants } from './Link.types';

const linkDefaultMock = (override?: Partial<LinkProps>) => ({
  id: lorem.word(),
  __typename: 'Link',
  variant: LinkVariants.default,
  href: `#${lorem.word()}`,
  text: lorem.words(2),
  ...override
});

export const linkButtonMock = (override?: Partial<LinkProps>) => ({
  ...linkDefaultMock(override),
  variant: LinkVariants.buttonContained
});

export const iconButtonMock = (override?: Partial<LinkProps>) => ({
  ...linkDefaultMock(override),
  variant: LinkVariants.buttonContained,
  icon: 'chevron-right',
  iconPosition: 'Right'
});

export const socialLinkMock = (override?: Partial<LinkProps>) => ({
  icon: 'facebook',
  ...linkDefaultMock(override),
  variant: LinkVariants.buttonContained,
  text: undefined
});

export const linkTextMock = (override?: Partial<LinkProps>) => ({
  ...linkDefaultMock(override),
  variant: LinkVariants.text
});

export const linkBaseMock = (override?: Partial<LinkProps>) => ({
  ...linkDefaultMock(override)
});

export const linkSocialMock = (override?: Partial<LinkProps>) => ({
  ...socialLinkMock(override)
});

export default linkBaseMock;
