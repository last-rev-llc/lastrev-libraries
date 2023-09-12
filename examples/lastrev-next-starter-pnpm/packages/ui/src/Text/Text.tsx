/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { styled } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip, { ChipProps } from '@mui/material/Chip';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import RichText from '../RichText';

import { TextProps } from './Text.types';

const Text = ({ body, align, eyebrow, title, subtitle, variant, sidekickLookup, sx, ...props }: TextProps) => {
  return (
    <ErrorBoundary>
      <Root
        data-testid="Text-root"
        variant={variant}
        // sx={{ textAlign: align, ...sx, ...styles?.root }} // TODO

        {...sidekick(sidekickLookup)}
        {...props}>
        {!!eyebrow && <Eyebrow data-testid="Text-eyebrow" label={eyebrow} {...sidekick(sidekickLookup, 'eyebrow')} />}

        {!!title && (
          <Title data-testid="Text-title" component="h2" {...sidekick(sidekickLookup, 'title')}>
            {title}
          </Title>
        )}

        {!!subtitle && (
          <Subtitle data-testid="Text-subtitle" {...sidekick(sidekickLookup, 'subtitle')}>
            {subtitle}
          </Subtitle>
        )}

        {!!body && <RichText body={body} sidekickLookup={sidekickLookup} variant={variant} align={align} {...props} />}
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
})<{ variant?: string }>(() => ({}));

const Eyebrow = styled(Chip, {
  name: 'Text',
  slot: 'Eyebrow',
  overridesResolver: (_, styles) => [styles.eyebrow]
})<ChipProps<React.ElementType>>(() => ({}));

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
