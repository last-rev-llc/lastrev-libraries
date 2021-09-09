// import { lorem } from 'faker';

export default {
  __typename: 'NavigationItem',
  href: 'navigation-item',
  text: 'Navigation Item',
  subNavigation: [
    { __typename: 'Link', text: 'sub-1', href: 'sub-1' },
    { __typename: 'Link', text: 'sub-2', href: 'sub-2' },
    { __typename: 'Link', text: 'sub-3', href: 'sub-3' }
  ]
};
