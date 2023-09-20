import React from 'react';
import { styled } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import Link from '../Link';

import { FooterNavigationItemProps } from './FooterNavigationItem.types';

const Chip = dynamic(() => import('@mui/material/Chip'));

const FooterNavigationItem = ({ text, href, variant, tag, sidekickLookup }: FooterNavigationItemProps) => {
  const rootProps = !!href && { href, component: Link };
  const ownerState = {
    variant
  };

  return (
    <Root
      {...sidekick(sidekickLookup)}
      component={Typography}
      {...rootProps}
      // @ts-ignore
      ownerState={ownerState}>
      {text}
      {!!tag && <Tag label={tag} />}
    </Root>
  );
};

const Root = styled(Box, {
  name: 'FooterNavigationItem',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<BoxProps>(() => ({}));

const Tag = styled(Chip, {
  name: 'FooterNavigationItem',
  slot: 'Tag',
  overridesResolver: (_, styles) => [styles.tag]
})<BoxProps>(() => ({}));

export default FooterNavigationItem;
