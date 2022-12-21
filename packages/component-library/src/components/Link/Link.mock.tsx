import { lorem } from 'faker';
import { LinkProps } from './Link.types';

export default (): LinkProps => ({
  id: lorem.word(),
  __typename: 'Link',
  variant: 'button-contained',
  href: `#${lorem.word()}`,
  text: lorem.words(2),
  icon: 'chevron-right',
  iconPosition: 'Right'
});

export const basicLink = (): LinkProps => ({
  id: lorem.word(),
  __typename: 'Link',
  variant: 'link',
  href: `#${lorem.word()}`,
  text: lorem.words(2)
});
