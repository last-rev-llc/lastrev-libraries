import { lorem } from 'faker';

export default {
  __typename: 'Link',
  // variant: 'button-contained',
  variant: 'text',
  href: lorem.word(),
  text: lorem.words(2),
  // icon: 'instagram'
  icon: 'caret-right'
};
