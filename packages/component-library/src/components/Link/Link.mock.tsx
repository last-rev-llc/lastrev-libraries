import { lorem } from 'faker';

export default {
  __typename: 'Link',
  variant: 'button-contained',
  href: lorem.word(),
  text: lorem.words(2),
  icon: 'instagram',
  iconPosition: 'Right'
};
