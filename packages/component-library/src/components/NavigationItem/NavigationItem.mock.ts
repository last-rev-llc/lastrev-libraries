import { lorem } from 'faker';
import { NavigationItemProps } from './NavigationItem';

export default (): NavigationItemProps => ({
  __typename: 'NavigationItem',
  href: lorem.word(),
  text: lorem.words(2),
  subNavigation: [
    { __typename: 'Link', text: `sub-1-${lorem.word()}`, href: 'sub-1' },
    { __typename: 'Link', text: `sub-2-${lorem.word()}`, href: 'sub-2' },
    { __typename: 'Link', text: `sub-3-${lorem.word()}`, href: 'sub-3' }
  ]
});
