import { lorem } from 'faker';
import { NavigationItemProps } from './NavigationItem.types';

const navigationItemDefaultMock: NavigationItemProps = {
  id: lorem.word(),
  __typename: 'NavigationItem',
  variant: 'default',
  href: `#${lorem.word()}`,
  text: lorem.words(2),
  icon: 'chevron-right',
  iconPosition: 'Right'
};

export const navigationItemTextMock = ({ ...override } = {}): NavigationItemProps => ({
  ...navigationItemDefaultMock,
  variant: 'navigationitem'
});

export const navigationItemBaseMock = ({ ...override } = {}): NavigationItemProps => ({
  ...navigationItemDefaultMock
});

export default navigationItemBaseMock;
