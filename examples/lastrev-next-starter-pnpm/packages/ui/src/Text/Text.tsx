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
          <Title data-testid="Text-title" {...sidekick(sidekickLookup, 'title')} ownerState={ownerState}>
            {title}
          </Title>
        )}

        {!!subtitle && (
          <Subtitle
            data-testid="Text-subtitle"
            {...sidekick(sidekickLookup, 'subtitle')}
            ownerState={ownerState}
            variant="h2">
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
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: TextOwnerState }>``;

const Overline = styled(Typography, {
  name: 'Text',
  slot: 'Overline',
  shouldForwardProp: (prop: string) => prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.overline]
})<TypographyProps & { ownerState: TextOwnerState }>``;

const Title = styled(Typography, {
  name: 'Text',
  slot: 'Title',
  shouldForwardProp: (prop: string) => prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.title]
})<TypographyProps & { ownerState: TextOwnerState }>``;

const Subtitle = styled(Typography, {
  name: 'Text',
  slot: 'Subtitle',
  shouldForwardProp: (prop: string) => prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.subtitle]
})<TypographyProps & { ownerState: TextOwnerState }>``;

export default Text;
