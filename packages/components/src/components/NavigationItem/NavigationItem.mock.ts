import { NavigationItemProps } from './NavigationItem';
import { mockLinkBase } from '../Link/Link.mock';
import { random } from 'faker';

export const mockNavigationItemBase = (): NavigationItemProps => {
  return {
    __typename: 'NavigationItem',
    id: random.alphaNumeric(10),
    href: 'http://www.example.com',
    text: 'Mocked Navigation Item'
  };
};

export const mockNavigationItemSubNavigation = (): NavigationItemProps => {
  return {
    ...mockNavigationItemBase(),
    subNavigation: [
      { ...mockLinkBase(), text: 'Subnav Link 1' },
      { ...mockLinkBase(), text: 'Subnav Link 2' },
      { ...mockLinkBase(), text: 'Subnav Link 3' }
    ]
  };
};

export default (): NavigationItemProps => ({
  ...mockNavigationItemBase()
});
