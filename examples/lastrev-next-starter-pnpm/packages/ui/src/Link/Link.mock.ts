import { lorem } from 'faker';
import { LinkProps } from './Link.types';

const linkDefaultMock = {
  id: lorem.word(),
  __typename: 'Link',
  variant: 'default',
  href: `#${lorem.word()}`,
  text: lorem.words(2),
  icon: 'chevron-right',
  iconPosition: 'Right'
};

export const linkButtonMock = ({ ...override } = {}) => ({
  ...linkDefaultMock,
  variant: 'button-contained',
  ...override
});

export const linkTextMock = ({ ...override } = {}) => ({
  ...linkDefaultMock,
  variant: 'link',
  ...override
});

export const linkBaseMock = ({ ...override } = {}) => ({
  ...linkDefaultMock,
  ...override
});

export default linkBaseMock;
