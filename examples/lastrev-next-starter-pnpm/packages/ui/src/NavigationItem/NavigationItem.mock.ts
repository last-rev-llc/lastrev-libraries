import randomId from '../utils/randomId';

import { type NavigationItemProps, NavigationLinkVariants } from './NavigationItem.types';

const navigationItemDefaultMock = (): NavigationItemProps => ({
  id: randomId(),
  __typename: 'NavigationItem',
  variant: NavigationLinkVariants.link,
  href: `#nav-link-url-here}`,
  text: 'Nav Link'
  // icon: 'chevron-right',
  // iconPosition: 'Right'
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
  subNavigation: [navigationItemBaseMock(), navigationItemBaseMock(), navigationItemBaseMock()],
  text: 'Nav Group',
  ...override
});

export const navigationItemWithChildrenNestedMock = ({ ...override } = {}): NavigationItemProps => ({
  ...navigationItemDefaultMock(),
  variant: NavigationLinkVariants.group,
  subNavigation: [
    navigationItemWithChildrenMock({ variant: NavigationLinkVariants.group }),
    navigationItemWithChildrenMock({ variant: NavigationLinkVariants.group }),
    navigationItemWithChildrenMock({ variant: NavigationLinkVariants.group })
  ],
  text: 'Nav Group',
  ...override
});

export default navigationItemBaseMock;
