import React from 'react';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

import Grid from '../Grid';
import ContentModule from '../ContentModule';

import type { SiteMessageProps, SiteMessageOwnerState } from './SiteMessage.types';

export const SiteMessage = (props: SiteMessageProps) => {
  const ownerState = { ...props };

  const { icon, text, link, sidekickLookup } = props;

  return (
    <Root {...sidekick(sidekickLookup)} ownerState={ownerState} data-testid="SiteMessage-SiteMessage">
      <ContentOuterGrid ownerState={ownerState}>
        <ContentWrap ownerState={ownerState}>
          {icon && <Icon {...icon} ownerState={ownerState} />}

          <Text __typename="Text" {...text} ownerState={ownerState} />

          <Link text="Learn More" variant="button-cta3" icon="arrow-right" {...link} ownerState={ownerState} />
        </ContentWrap>
      </ContentOuterGrid>
    </Root>
  );
};

const Root = styled(Box, {
  name: 'SiteMessage',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: SiteMessageOwnerState }>(() => ({}));

const ContentOuterGrid = styled(Grid, {
  name: 'SiteMessage',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: SiteMessageOwnerState }>``;

const ContentWrap = styled(Box, {
  name: 'SiteMessage',
  slot: 'ContentWrap',
  overridesResolver: (_, styles) => [styles.contentWrap]
})<{ ownerState: SiteMessageOwnerState }>``;

const Icon = styled(ContentModule, {
  name: 'SiteMessage',
  slot: 'Icon',
  overridesResolver: (_, styles) => [styles.icon]
})<{ ownerState: SiteMessageOwnerState }>``;

const Link = styled(ContentModule, {
  name: 'SiteMessage',
  slot: 'Link',
  overridesResolver: (_, styles) => [styles.link]
})<{ ownerState: SiteMessageOwnerState }>``;

const Text = styled(ContentModule, {
  name: 'SiteMessage',
  slot: 'Text',
  overridesResolver: (_, styles) => [styles.text]
})<{ ownerState: SiteMessageOwnerState }>``;

export default SiteMessage;
