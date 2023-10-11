import React from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import Grid from '../Grid';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import { type QuoteProps, QuoteOwnerState } from './Quote.types';

const Quote = (props: QuoteProps) => {
  const ownerState = { ...props };

  const { sidekickLookup, logo, quote, authorName, authorTitle, image, variant } = props;

  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)} ownerState={ownerState} data-testid={`Quote-${variant}`}>
        <ContentGrid ownerState={ownerState}>
          {logo && <Logo {...logo} {...sidekick(sidekickLookup?.logo)} ownerState={ownerState} />}

          {quote && (
            <QuoteText {...sidekick(sidekickLookup?.quote)} ownerState={ownerState}>
              <QuoteSymbol ownerState={ownerState}>&quot;</QuoteSymbol>
              {quote}
              <QuoteSymbol ownerState={ownerState}>&quot;</QuoteSymbol>
            </QuoteText>
          )}

          {image || authorName || authorTitle ? (
            <AuthorRoot ownerState={ownerState}>
              {image && <ImageItem {...image} {...sidekick(sidekickLookup?.image)} ownerState={ownerState} />}

              {authorName && (
                <AuthorName {...sidekick(sidekickLookup?.authorName)} ownerState={ownerState}>
                  {authorName}
                </AuthorName>
              )}

              {authorTitle && (
                <AuthorTitle {...sidekick(sidekickLookup?.authorTitle)} ownerState={ownerState}>
                  {authorTitle}
                </AuthorTitle>
              )}
            </AuthorRoot>
          ) : null}
        </ContentGrid>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Quote',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: QuoteOwnerState }>``;

const ContentGrid = styled(Grid, {
  name: 'Quote',
  slot: 'ContentGrid',
  overridesResolver: (_, styles) => [styles.contentGrid]
})<{ ownerState: QuoteOwnerState }>``;

const AuthorRoot = styled(Box, {
  name: 'Quote',
  slot: 'AuthorRoot',
  overridesResolver: (_, styles) => [styles.authorRoot]
})<{ ownerState: QuoteOwnerState }>``;

const Logo = styled(ContentModule, {
  name: 'Quote',
  slot: 'Logo',
  overridesResolver: (_, styles) => [styles.logo]
})<{ ownerState: QuoteOwnerState }>``;

const ImageItem = styled(ContentModule, {
  name: 'Quote',
  slot: 'ImageItem',
  overridesResolver: (_, styles) => [styles.image]
})<{ ownerState: QuoteOwnerState }>``;

const QuoteText = styled(Typography, {
  name: 'Quote',
  slot: 'QuoteText',
  overridesResolver: (_, styles) => [styles.quoteText]
})<{ ownerState: QuoteOwnerState }>``;

const AuthorName = styled(Typography, {
  name: 'Quote',
  slot: 'AuthorName',
  overridesResolver: (_, styles) => [styles.authorName]
})<{ ownerState: QuoteOwnerState }>``;

const QuoteSymbol = styled('span', {
  name: 'Quote',
  slot: 'QuoteSymbol',
  overridesResolver: (_, styles) => [styles.quoteSymbol]
})<{ ownerState: QuoteOwnerState }>``;

const AuthorTitle = styled(Typography, {
  name: 'Quote',
  slot: 'AuthorTitle',
  overridesResolver: (_, styles) => [styles.authorTitle]
})<{ ownerState: QuoteOwnerState }>``;

export default Quote;
