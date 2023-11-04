/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { styled } from '@mui/material/styles';
import Typography, { type TypographyProps } from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import type { TextProps, TextOwnerState } from './Text.types';
import Grid from '../Grid';

const Text = (props: TextProps) => {
  const ownerState = { ...props };

  const { body, overline, title, subtitle, variant, sidekickLookup, sx } = props;

  return (
    <ErrorBoundary>
      <Root data-testid="Text-root" {...sidekick(sidekickLookup)} ownerState={ownerState}>
        {!!overline && (
          <Overline
            data-testid="Text-overline"
            {...sidekick(sidekickLookup, 'overline')}
            variant="overline"
            ownerState={ownerState}>
            {overline}
          </Overline>
        )}

        {!!title && (
          <Title variant="h3" data-testid="Text-title" {...sidekick(sidekickLookup, 'title')} ownerState={ownerState}>
            {title}
          </Title>
        )}

        {!!subtitle && (
          <Subtitle
            data-testid="Text-subtitle"
            {...sidekick(sidekickLookup, 'subtitle')}
            ownerState={ownerState}
            variant="h4">
            {subtitle}
          </Subtitle>
        )}

        {!!body && (
          <ContentModule
            body={body}
            sidekickLookup={sidekickLookup}
            variant={variant}
            {...props}
            __typename="RichText"
            ownerState={ownerState}
          />
        )}
      </Root>
    </ErrorBoundary>
  );
};

// Support for \n in text
const Root = styled(Grid, {
  name: 'Text',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: TextOwnerState }>``;

const Overline = styled(Typography, {
  name: 'Text',
  slot: 'Overline',
  overridesResolver: (_, styles) => [styles.overline]
})<TypographyProps & { ownerState: TextOwnerState }>``;

const Title = styled(Typography, {
  name: 'Text',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})<TypographyProps & { ownerState: TextOwnerState }>``;

const Subtitle = styled(Typography, {
  name: 'Text',
  slot: 'Subtitle',
  overridesResolver: (_, styles) => [styles.subtitle]
})<TypographyProps & { ownerState: TextOwnerState }>``;

export default Text;
