import React from 'react';
import { styled } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

// import Link from '../Link';

import { FooterNavigationItemProps } from './FooterNavigationItem.types';
import ContentModule from '../ContentModule';

const Chip = dynamic(() => import('@mui/material/Chip'));

const FooterNavigationItem = (props: FooterNavigationItemProps) => {
  const { text, href, variant, tag, sidekickLookup } = props;
  const ownerState = {
    variant
  };
  const RootCmp = href ? RootLink : Root;
  return (
    <RootCmp
      {...sidekick(sidekickLookup)}
      component={Typography}
      // @ts-ignore
      ownerState={ownerState}>
      {text}
      {!!tag && <Tag label={tag} ownerState={ownerState} />}
    </RootCmp>
  );
};

const Root = styled(Box, {
  name: 'FooterNavigationItem',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<BoxProps>(() => ({}));

const RootLink = styled(ContentModule, {
  name: 'FooterNavigationItem',
  slot: 'Root',
  overridesResolver: ({ variant }, styles) => [styles.root, styles.rootLink]
})<BoxProps>(() => ({}));

const Tag = styled(Chip, {
  name: 'FooterNavigationItem',
  slot: 'Tag',
  overridesResolver: (_, styles) => [styles.tag]
})<BoxProps>(() => ({}));

export default FooterNavigationItem;
