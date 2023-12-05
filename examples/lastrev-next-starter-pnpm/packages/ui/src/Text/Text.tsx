/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { styled } from '@mui/material/styles';
import Typography, { type TypographyProps } from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import type { TextProps, TextOwnerState } from './Text.types';
import Grid from '../Grid';
import Box from '@mui/material/Box';
import Background from '../Background';

const Text = (props: TextProps) => {
  const ownerState = { ...props };

  const { backgroundColor, body, overline, titleIcon, title, subtitle, variant, sidekickLookup, sx } = props;

  return (
    <ErrorBoundary>
      <Root data-testid="Text-root" {...sidekick(sidekickLookup)} ownerState={ownerState}>
        <TextBackground backgroundColor={backgroundColor} testId="Text-background" />

        {!!overline && (
          <Overline
            data-testid="Text-overline"
            {...sidekick(sidekickLookup, 'overline')}
            variant="overline"
            ownerState={ownerState}>
            {overline}
          </Overline>
        )}

        {!!titleIcon || title ? (
          <TitleWrap>
            {!!titleIcon ? (
              <TitleIcon ownerState={ownerState} {...sidekick(sidekickLookup, 'titleIcon')}>
                <ContentModule {...titleIcon} data-testid="Text-titleIcon" />
              </TitleIcon>
            ) : null}
            <Title data-testid="Text-title" {...sidekick(sidekickLookup, 'title')} ownerState={ownerState}>
              {!!title ? title : null}
            </Title>
          </TitleWrap>
        ) : null}

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
          <BodyWrap ownerState={ownerState}>
            <ContentModule
              body={body}
              sidekickLookup={sidekickLookup}
              variant={variant}
              __typename="RichText"
              ownerState={{ ...ownerState, variant: variant === 'thin' ? 'inline' : variant }}
            />
          </BodyWrap>
        )}
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Grid, {
  name: 'Text',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: TextOwnerState }>``;

const TextBackground = styled(Background, {
  name: 'Block',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const Overline = styled(Typography, {
  name: 'Text',
  slot: 'Overline',
  overridesResolver: (_, styles) => [styles.overline]
})<TypographyProps & { ownerState: TextOwnerState }>``;

const TitleWrap = styled(Box, {
  name: 'Text',
  slot: 'TitleWrap',
  overridesResolver: (_, styles) => [styles.titleWrap]
})<{ ownerState: TextOwnerState }>``;

const Title = styled(Typography, {
  name: 'Text',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})<TypographyProps & { ownerState: TextOwnerState }>``;

const TitleIcon = styled(Box, {
  name: 'Text',
  slot: 'TitleIcon',
  overridesResolver: (_, styles) => [styles.titleIcon]
})<{ ownerState: TextOwnerState }>``;

const Subtitle = styled(Typography, {
  name: 'Text',
  slot: 'Subtitle',
  overridesResolver: (_, styles) => [styles.subtitle]
})<TypographyProps & { ownerState: TextOwnerState }>``;

const BodyWrap = styled(Box, {
  name: 'Text',
  slot: 'BodyWrap',
  overridesResolver: (_, styles) => [styles.bodyWrap]
})<TypographyProps & { ownerState: TextOwnerState }>``;

export default Text;
