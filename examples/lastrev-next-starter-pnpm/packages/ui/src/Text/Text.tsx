/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { styled } from '@mui/material/styles';
import Typography, { type TypographyProps } from '@mui/material/Typography';
import Box from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import type { TextProps } from './Text.types';

const Text = ({ body, align, overline, title, subtitle, variant, sidekickLookup, sx, ...props }: TextProps) => {
  return (
    <ErrorBoundary>
      <Root data-testid="Text-root" variant={variant} {...sidekick(sidekickLookup)} {...props}>
        {!!overline && (
          <Overline data-testid="Text-overline" {...sidekick(sidekickLookup, 'overline')} variant="overline">
            {overline}
          </Overline>
        )}

        {!!title && (
          <Title data-testid="Text-title" variant="display1" {...sidekick(sidekickLookup, 'title')}>
            {title}
          </Title>
        )}

        {!!subtitle && (
          <Subtitle data-testid="Text-subtitle" {...sidekick(sidekickLookup, 'subtitle')} variant="display2">
            {subtitle}
          </Subtitle>
        )}

        {!!body && (
          <ContentModule
            body={body}
            sidekickLookup={sidekickLookup}
            variant={variant}
            align={align}
            {...props}
            __typename="RichText"
          />
        )}
      </Root>
    </ErrorBoundary>
  );
};

// Support for \n in text
const Root = styled(Box, {
  name: 'Text',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

const Overline = styled(Typography, {
  name: 'Text',
  slot: 'Overline',
  overridesResolver: (_, styles) => [styles.overline]
})<TypographyProps<React.ElementType>>(() => ({}));

const Title = styled(Typography, {
  name: 'Text',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})<TypographyProps<React.ElementType>>(() => ({}));

const Subtitle = styled(Typography, {
  name: 'Text',
  slot: 'Subtitle',
  overridesResolver: (_, styles) => [styles.subtitle]
})<TypographyProps<React.ElementType>>(() => ({}));

export default Text;
