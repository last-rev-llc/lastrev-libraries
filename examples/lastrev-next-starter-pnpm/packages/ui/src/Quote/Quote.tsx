import React from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import Grid from '../Grid';
import Background from '../Background';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import { type QuoteProps, QuoteOwnerState } from './Quote.types';

const Quote = (props: QuoteProps) => {
  const ownerState = { ...props };

  const { backgroundColor, background, sidekickLookup, logo, quote, authorName, authorTitle, image, variant } = props;

  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)} ownerState={ownerState} data-testid={`Quote-${variant}`}>
        <QuoteBackground background={background} backgroundColor={backgroundColor} testId="Block-background" />

        <ContentOuterGrid ownerState={ownerState}>
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

              <AuthorDetails>
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
              </AuthorDetails>
            </AuthorRoot>
          ) : null}
        </ContentOuterGrid>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Quote',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: QuoteOwnerState }>``;

const QuoteBackground = styled(Background, {
  name: 'Block',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const ContentOuterGrid = styled(Grid, {
  name: 'Quote',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: QuoteOwnerState }>``;

const AuthorRoot = styled(Box, {
  name: 'Quote',
  slot: 'AuthorRoot',
  overridesResolver: (_, styles) => [styles.authorRoot]
})<{ ownerState: QuoteOwnerState }>``;

const AuthorDetails = styled(Box, {
  name: 'Quote',
  slot: 'AuthorDetails',
  overridesResolver: (_, styles) => [styles.authorDetails]
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
