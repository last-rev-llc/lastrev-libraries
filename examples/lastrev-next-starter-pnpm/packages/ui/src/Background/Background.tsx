import React from 'react';
import { styled } from '@mui/material/styles';

import ContentModule from '../ContentModule';
import Grid from '../Grid';

import type { BackgroundProps, BackgroundOwnerState } from './Background.types';

const Background = (props: BackgroundProps) => {
  const ownerState = { ...props };
  const { background, backgroundColor } = props;

  if (!background && !backgroundColor) return null;

  return (
    <Root ownerState={ownerState}>
      {background ? (
        <BackgroundContent {...background} key={background?.id} ownerState={ownerState} fill testId="Hero-background" />
      ) : null}
    </Root>
  );
};

const Root = styled(Grid, {
  name: 'Background',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: BackgroundOwnerState }>``;

const BackgroundContent = styled(ContentModule, {
  name: 'Hero',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.backgroundContent]
})<{ ownerState: BackgroundOwnerState }>``;

export default Background;
