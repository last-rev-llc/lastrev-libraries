import { lorem } from 'faker';
import { LinkProps } from './Link.types';

export const linkMock = ({ ...override } = {}): LinkProps => ({
  id: lorem.word(),
  variant: 'button-contained',
  href: `#${lorem.word()}`,
  text: lorem.words(2),
  icon: 'chevron-right',
  iconPosition: 'Right',
  ...override,
  __typename: 'Link'
});

export const basicLink = () => ({
  id: lorem.word(),
  __typename: 'Link',
  variant: 'link',
  href: `#${lorem.word()}`,
  text: lorem.words(2)
});
