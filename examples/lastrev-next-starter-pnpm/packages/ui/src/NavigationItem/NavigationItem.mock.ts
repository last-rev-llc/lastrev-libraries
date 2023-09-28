import { lorem } from 'faker';
import { type NavigationItemProps, NavigationLinkVariants } from './NavigationItem.types';

const navigationItemDefaultMock = (): NavigationItemProps => ({
  id: lorem.word(),
  __typename: 'NavigationItem',
  variant: NavigationLinkVariants.link,
  href: `#${lorem.word()}`,
  text: lorem.words(2),
  icon: 'chevron-right',
  iconPosition: 'Right'
});

export const navigationItemTextMock = ({ ...override } = {}): NavigationItemProps => ({
  ...navigationItemDefaultMock(),
  variant: NavigationLinkVariants.link,
  ...override
});

export const navigationItemBaseMock = ({ ...override } = {}): NavigationItemProps => ({
  ...navigationItemDefaultMock(),
  ...override
});

export const navigationItemWithChildrenMock = ({ ...override } = {}): NavigationItemProps => ({
  ...navigationItemDefaultMock(),
  variant: NavigationLinkVariants.group,
  subNavigation: [navigationItemBaseMock(), navigationItemBaseMock(), navigationItemBaseMock()]
});

export const navigationItemWithChildrenNestedMock = ({ ...override } = {}): NavigationItemProps => ({
  ...navigationItemDefaultMock(),
  variant: NavigationLinkVariants.group,
  subNavigation: [
    navigationItemWithChildrenMock({ variant: NavigationLinkVariants.group }),
    navigationItemWithChildrenMock({ variant: NavigationLinkVariants.group }),
    navigationItemWithChildrenMock({ variant: NavigationLinkVariants.group })
  ]
});

export default navigationItemBaseMock;
