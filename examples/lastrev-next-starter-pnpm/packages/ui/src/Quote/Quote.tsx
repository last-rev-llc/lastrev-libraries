import React from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';
import Link from '../Link';

import type { QuoteProps } from './Quote.types';
import type { MediaProps } from '../Media/Media.types';

export const Quote = ({
  sidekickLookup,
  logo,
  quote,
  authorName,
  authorTitle,
  authorImage,
  actions,
  variant,
  ...props
}: QuoteProps) => {
  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)} {...props} data-testid="Quote">
        {logo && <MediaItem {...logo} {...sidekick(sidekickLookup?.logo)} />}

        {quote && (
          <QuoteText {...sidekick(sidekickLookup?.quote)}>
            <QuoteSymbol>&ldquoe;</QuoteSymbol>
            {quote}
            <QuoteSymbol>&rdquoe;</QuoteSymbol>
          </QuoteText>
        )}
        {actions && (
          <ActionsRoot>
            {actions.map((action) => (
              <Link {...action} key={action.id} />
            ))}
          </ActionsRoot>
        )}
        {authorImage || authorName || authorTitle ? (
          <AuthorRoot>
            {authorImage && <AuthorImage {...authorImage} {...sidekick(sidekickLookup?.authorImage)} />}

            {authorName && <AuthorName {...sidekick(sidekickLookup?.authorName)}>{authorName}</AuthorName>}

            {authorTitle && <AuthorTitle {...sidekick(sidekickLookup?.authorTitle)}>{authorTitle}</AuthorTitle>}
          </AuthorRoot>
        ) : null}
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Quote',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})``;

const AuthorRoot = styled(Box, {
  name: 'Quote',
  slot: 'AuthorRoot',
  overridesResolver: (_, styles) => [styles.authorRoot]
})``;

const MediaItem = styled(ContentModule, {
  name: 'Quote',
  slot: 'MediaItem',
  overridesResolver: (_, styles) => [styles.mediaItem]
})<MediaProps>(() => ({}));

const AuthorImage = styled(ContentModule, {
  name: 'Quote',
  slot: 'AuthorImage',
  overridesResolver: (_, styles) => [styles.authorImage]
})<MediaProps>(() => ({}));

const QuoteText = styled(Typography, {
  name: 'Quote',
  slot: 'QuoteText',
  overridesResolver: (_, styles) => [styles.quoteText]
})``;

const AuthorName = styled(Typography, {
  name: 'Quote',
  slot: 'AuthorName',
  overridesResolver: (_, styles) => [styles.authorName]
})``;

const QuoteSymbol = styled('span', {
  name: 'Quote',
  slot: 'QuoteSymbol',
  overridesResolver: (_, styles) => [styles.quoteSymbol]
})``;

const AuthorTitle = styled(Typography, {
  name: 'Quote',
  slot: 'AuthorTitle',
  overridesResolver: (_, styles) => [styles.authorTitle]
})``;

const ActionsRoot = styled(Typography, {
  name: 'Quote',
  slot: 'ActionsRoot',
  overridesResolver: (_, styles) => [styles.actionsRoot]
})``;

export default Quote;
