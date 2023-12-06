import React from 'react';
import { styled } from '@mui/material/styles';

import ContentModule from '../ContentModule';
import Grid from '../Grid';

import type { BackgroundProps, BackgroundOwnerState } from './Background.types';

const Background = (props: BackgroundProps) => {
  const ownerState = { ...props };
  const { background, backgroundColor, testId, className } = props;

  if (!background && !backgroundColor) return null;

  return (
    <Root ownerState={ownerState} className={className}>
      {!!background ? (
        <BackgroundContent {...background} key={background?.id} ownerState={ownerState} fill testId={testId} />
      ) : null}
    </Root>
  );
};

const Root = styled(Grid, {
  name: 'Background',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ className?: string; ownerState: BackgroundOwnerState }>``;

const BackgroundContent = styled(ContentModule, {
  name: 'Background',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.backgroundContent]
})<{ ownerState: BackgroundOwnerState }>``;

export default Background;
