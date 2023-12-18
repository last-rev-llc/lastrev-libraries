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

export const linkBaseMock = (override?: Partial<LinkProps>): LinkProps => linkDefaultMock(override);

export const linkButtonMock = (override?: Partial<LinkProps>): LinkProps =>
  linkDefaultMock({ text: 'Button Text', variant: LinkVariants.buttonContained, ...override });

export const iconButtonMock = (override?: Partial<LinkProps>): LinkProps =>
  linkDefaultMock({
    text: undefined,
    variant: LinkVariants.buttonContained,
    icon: 'chevron-right',
    iconPosition: 'Right',
    ...override
  });

export const socialLinkMock = (override?: Partial<LinkProps>): LinkProps =>
  linkDefaultMock({
    icon: 'facebook',
    variant: LinkVariants.buttonContained,
    text: undefined,
    ...override
  });

export const linkTextMock = (override?: Partial<LinkProps>): LinkProps =>
  linkDefaultMock({ icon: undefined, variant: LinkVariants.text, ...override });

export const linkSocialMock = (override?: Partial<LinkProps>): LinkProps => socialLinkMock(override);

export default linkBaseMock;
