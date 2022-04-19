import { lorem } from 'faker';
import { LinkProps } from './Link';

export default (): LinkProps => ({
  id: lorem.word(),
  __typename: 'Link',
  variant: 'button-contained',
  href: lorem.word(),
  text: lorem.words(2),
  icon: 'chevron-right',
  iconPosition: 'Right'
});
