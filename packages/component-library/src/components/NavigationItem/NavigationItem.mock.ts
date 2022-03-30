import { lorem } from 'faker';
import { NavigationItemProps } from './NavigationItem.types';
import mockLink from '../Link/Link.mock';

export default (): NavigationItemProps => ({
  __typename: 'NavigationItem',
  href: lorem.word(),
  text: lorem.words(2),
  subNavigation: [{ ...mockLink() }, { ...mockLink() }, { ...mockLink() }]
});
