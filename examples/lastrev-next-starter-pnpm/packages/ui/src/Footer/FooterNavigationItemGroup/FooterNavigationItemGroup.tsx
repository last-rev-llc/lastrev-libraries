import React from 'react';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../../ErrorBoundary';
import ContentModule from '../../ContentModule';

import type {
  FooterNavigationItemGroupProps,
  FooterNavigationItemGroupOwnerState
} from './FooterNavigationItemGroup.types';
import type { LinkProps } from '../../Link';
import type { NavigationItemProps } from '../../NavigationItem';

const FooterNavigationItemGroup = (props: FooterNavigationItemGroupProps) => {
  const ownerState = { ...props };

  const { text, href, subNavigation, sidekickLookup } = props;

  return (
    <ErrorBoundary>
      {!!subNavigation?.length ? (
        <Root ownerState={ownerState}>
          <NavGroupItem
            {...sidekick(sidekickLookup)}
            text={text}
            href={href}
            __typename="Link"
            ownerState={ownerState}
          />

          <NavigationItems ownerState={ownerState}>
            {subNavigation?.map((item) => (
              <NavigationItem
                key={item?.id}
                {...(item as NavigationItemProps | LinkProps)}
                variant={!!item?.variant ? `${item?.variant}Footer` : null}
                ownerState={ownerState}
              />
            ))}
          </NavigationItems>
        </Root>
      ) : (
        <NavGroupItem {...sidekick(sidekickLookup)} text={text} href={href} __typename="Link" ownerState={ownerState} />
      )}
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'FooterNavigationItemGroup',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: FooterNavigationItemGroupOwnerState }>``;

const NavGroupItem = styled(ContentModule, {
  name: 'FooterNavigationItemGroup',
  slot: 'NavGroupItem',
  overridesResolver: (_, styles) => [styles.navGroupItem]
})<{ ownerState: FooterNavigationItemGroupOwnerState }>``;

const NavigationItems = styled(Box, {
  name: 'FooterNavigationItemGroup',
  slot: 'NavigationItems',
  overridesResolver: (_, styles) => [styles.navigationItems]
})<{ ownerState: FooterNavigationItemGroupOwnerState }>``;

const NavigationItem = styled(ContentModule, {
  name: 'FooterNavigationItemGroup',
  slot: 'NavigationItem',
  overridesResolver: (_, styles) => [styles.navigationItem]
})<{ ownerState: FooterNavigationItemGroupOwnerState }>``;

export default FooterNavigationItemGroup;
