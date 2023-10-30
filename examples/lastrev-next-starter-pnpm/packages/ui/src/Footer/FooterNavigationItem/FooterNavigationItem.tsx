import React from 'react';
import dynamic from 'next/dynamic';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import ContentModule from '../../ContentModule';

import type { FooterNavigationItemProps, FooterNavigationItemOwnerState } from './FooterNavigationItem.types';

const FooterNavigationItem = (props: FooterNavigationItemProps) => {
  const ownerState = { ...props };

  const { text, href, variant, sidekickLookup } = props;

  const RootCmp = href ? RootLink : Root;

  return (
    <RootCmp {...sidekick(sidekickLookup)} component={Typography} ownerState={ownerState}>
      {text} - hello
    </RootCmp>
  );
};

const Root = styled(Box, {
  name: 'FooterNavigationItem',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: FooterNavigationItemOwnerState }>``;

const RootLink = styled(ContentModule, {
  name: 'FooterNavigationItem',
  slot: 'Root',
  overridesResolver: ({ variant }, styles) => [styles.root, styles.rootLink]
})<{ ownerState: FooterNavigationItemOwnerState }>``;

export default FooterNavigationItem;
