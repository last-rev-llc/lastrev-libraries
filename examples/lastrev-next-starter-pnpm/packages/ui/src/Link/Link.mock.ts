import { lorem } from 'faker';

export const linkMock = ({ ...override } = {}) => ({
  id: lorem.word(),
  __typename: 'Link',
  variant: 'button-contained',
  href: `#${lorem.word()}`,
  text: lorem.words(2),
  icon: 'chevron-right',
  iconPosition: 'Right',
  ...override
});

export const basicLink = () => ({
  id: lorem.word(),
  __typename: 'Link',
  variant: 'link',
  href: `#${lorem.word()}`,
  text: lorem.words(2)
});
