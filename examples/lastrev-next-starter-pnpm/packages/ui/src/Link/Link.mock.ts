import { lorem } from 'faker';
import { LinkProps } from './Link.types';

const linkDefaultMock = (override?: Partial<LinkProps>) => ({
  id: lorem.word(),
  __typename: 'Link',
  variant: 'default',
  href: `#${lorem.word()}`,
  text: lorem.words(2),
  ...override
});

export const linkButtonMock = (override?: Partial<LinkProps>) => ({
  ...linkDefaultMock(override),
  variant: 'button-contained'
});

export const iconButtonMock = (override?: Partial<LinkProps>) => ({
  ...linkDefaultMock(override),
  variant: 'button-contained',
  icon: 'chevron-right',
  iconPosition: 'Right'
});

export const linkTextMock = (override?: Partial<LinkProps>) => ({
  ...linkDefaultMock(override),
  variant: 'link'
});

export const linkBaseMock = (override?: Partial<LinkProps>) => ({
  ...linkDefaultMock(override)
});

export default linkBaseMock;
