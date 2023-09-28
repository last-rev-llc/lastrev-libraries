import React from 'react';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import ContentModule from '../../ContentModule';

import type {
  FooterNavigationItemGroupProps,
  FooterNavigationItemGroupOwnerState
} from './FooterNavigationItemGroup.types';
import type { LinkProps } from '../../Link';
import type { NavigationItemProps } from '../../NavigationItem/NavigationItem.types';

const FooterNavigationItemGroup = (props: FooterNavigationItemGroupProps) => {
  const ownerState = { ...props };

  const { text, href, subNavigation, sidekickLookup } = props;

  const labelProps = !!href && { href, component: ContentModule };
  return (
    <Root {...sidekick(sidekickLookup)} ownerState={ownerState}>
      <Label component={Typography} {...labelProps} __typename="Link" ownerState={ownerState}>
        {text}
      </Label>

      {!!subNavigation?.length && (
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
      )}
    </Root>
  );
};

const Root = styled(Box, {
  name: 'FooterNavigationItemGroup',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: FooterNavigationItemGroupOwnerState }>``;

const Label = styled(Box, {
  name: 'FooterNavigationItemGroup',
  slot: 'Label',
  overridesResolver: (_, styles) => [styles.label]
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
