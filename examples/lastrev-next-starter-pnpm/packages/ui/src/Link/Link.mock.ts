import { lorem } from 'faker';
import { LinkProps, LinkVariants } from './Link.types';

const linkDefaultMock = (override?: Partial<LinkProps>): LinkProps => ({
  id: lorem.word(),
  __typename: 'Link',
  variant: LinkVariants.default,
  href: `#${lorem.word()}`,
  text: lorem.words(2),
  ...override
});

export const linkButtonMock = (override?: Partial<LinkProps>) => ({
  ...linkDefaultMock(override),
  variant: LinkVariants['button-contained']
});

export const iconButtonMock = (override?: Partial<LinkProps>) => ({
  ...linkDefaultMock(override),
  variant: LinkVariants['button-contained'],
  icon: 'chevron-right',
  iconPosition: 'Right'
});

export const linkTextMock = (override?: Partial<LinkProps>) => ({
  ...linkDefaultMock(override),
  variant: LinkVariants['text']
});

export const linkBaseMock = (override?: Partial<LinkProps>) => ({
  ...linkDefaultMock(override)
});

export default linkBaseMock;
