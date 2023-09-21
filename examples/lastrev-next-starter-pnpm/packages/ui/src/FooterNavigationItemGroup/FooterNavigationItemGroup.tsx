import React from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import sidekick from '@last-rev/contentful-sidekick-util';

import { FooterNavigationItemGroupProps } from './FooterNavigationItemGroup.types';
import { LinkProps } from '../Link';
import ContentModule from '../ContentModule';
import { NavigationItemProps } from '../NavigationItem/NavigationItem.types';

const FooterNavigationItemGroup = ({ text, href, subNavigation, sidekickLookup }: FooterNavigationItemGroupProps) => {
  const labelProps = !!href && { href, component: ContentModule };
  return (
    <Root {...sidekick(sidekickLookup)}>
      <Label component={Typography} {...labelProps} __typename="Link">
        {text}
      </Label>
      {!!subNavigation?.length && (
        <NavigationItems>
          {subNavigation?.map((item) => (
            <NavigationItem
              key={item?.id}
              {...(item as NavigationItemProps | LinkProps)}
              variant={!!item?.variant ? `${item?.variant}Footer` : null}
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
})<BoxProps>(() => ({}));

const Label = styled(Box, {
  name: 'FooterNavigationItemGroup',
  slot: 'Label',
  overridesResolver: (_, styles) => [styles.label]
})<BoxProps>(() => ({}));

const NavigationItems = styled(Box, {
  name: 'FooterNavigationItemGroup',
  slot: 'NavigationItems',
  overridesResolver: (_, styles) => [styles.navigationItems]
})(() => ({}));

const NavigationItem = styled(ContentModule, {
  name: 'FooterNavigationItemGroup',
  slot: 'NavigationItem',
  overridesResolver: (_, styles) => [styles.navigationItem]
})(() => ({}));

export default FooterNavigationItemGroup;
