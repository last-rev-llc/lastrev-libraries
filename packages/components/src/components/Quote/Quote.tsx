import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary';
import Media, { MediaProps } from '@last-rev/component-library/dist/components/Media';
import { LinkProps } from '@last-rev/component-library/dist/components/Link';
import Link from '../Link';
import { sidekick } from '../../utils/sidekick';

export interface QuoteProps {
  __typename?: string;
  id?: string;
  variant?: 'one-column' | 'two-column';
  sidekickLookup?: any;
  quote: string;
  authorName?: string;
  authorTitle?: string;
  quoteImage?: MediaProps;
  actions?: Array<LinkProps>;
}

export const Quote = ({ sidekickLookup, quoteImage, quote, authorName, authorTitle, actions }: QuoteProps) => {
  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)}>
        <Box>
          <ContentWrap>
            {quoteImage && (
              <MediaWrap>
                <MediaItem {...quoteImage} {...sidekick(sidekickLookup?.quoteImage)} />
              </MediaWrap>
            )}

            {quote && <QuoteText {...sidekick(sidekickLookup?.quote)}>{quote}</QuoteText>}

            {authorName && <AuthorName {...sidekick(sidekickLookup?.authorName)}>{authorName}</AuthorName>}
            {authorTitle && <AuthorTitle {...sidekick(sidekickLookup?.authorTitle)}>{authorTitle}</AuthorTitle>}

            {actions && (
              <ActionsWrap>
                {actions.map((action) => (
                  <Link {...action} key={action.id} />
                ))}
              </ActionsWrap>
            )}
          </ContentWrap>
        </Box>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Quote',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{}>(({ theme }) => ({
  background: theme.palette.background.default,
  color: theme.palette.text.primary
}));

const ContentWrap = styled(Box, {
  name: 'Quote',
  slot: 'ContentWrap'
})<{}>(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: 'repeat(4, 1fr)'
}));

const MediaWrap = styled(Box, {
  name: 'Quote',
  slot: 'MediaWrap'
})<{}>(({ theme }) => ({
  gridColumn: '2/4',
  gridRow: 1,
  borderRadius: '50%',
  aspectRatio: '1 / 1',
  lineHeight: 0, // Removes potentially extra space below image due to whitespacing

  [theme.breakpoints.up('sm')]: {
    gridColumn: 3,
    gridRow: '3 / 5',
    padding: theme.spacing(2) // Can be used to shrink image and space a bit from left side
  },

  img: {
    borderRadius: '50%',
    objectFit: 'cover'
  }
}));

const MediaItem = styled(Media, {
  name: 'Quote',
  slot: 'MediaItem'
})<MediaProps>(() => ({}));

const QuoteText = styled(Typography, {
  name: 'Quote',
  slot: 'QuoteText'
})<{}>(({ theme }) => ({
  ...(theme.typography.h4 as any),
  'fontStyle': 'italic',

  'gridColumn': '1 / 5',
  'gridRow': 2,
  'width': '100%',
  'textAlign': 'center',

  '&': {
    [theme.breakpoints.up('sm')]: {
      ...(theme.typography.h3 as any)
    }
  }
}));

const AuthorName = styled(Typography, {
  name: 'Quote',
  slot: 'AuthorName'
})<{}>(({ theme }) => ({
  ...(theme.typography.body1 as any),
  fontSize: '1.125rem',
  fontWeight: 700,
  whiteSpace: 'nowrap',
  width: '100%',
  display: 'flex',
  gridColumn: '1 / 5',
  gridRow: 3,
  alignSelf: 'center',
  justifyContent: 'center',

  [theme.breakpoints.up('sm')]: {
    gridColumn: 2,
    gridRow: 3,
    alignSelf: 'flex-end',
    justifyContent: 'flex-start'
  }
}));

const AuthorTitle = styled(Typography, {
  name: 'Quote',
  slot: 'AuthorTitle'
})<{}>(({ theme }) => ({
  ...theme.typography.body1,
  fontSize: '0.925rem',
  whiteSpace: 'nowrap',
  gridColumn: '1 / 5',
  gridRow: 4,
  width: '100%',
  display: 'flex',
  alignSelf: 'flex-start',
  justifyContent: 'center',

  [theme.breakpoints.up('sm')]: {
    justifyContent: 'flex-start',
    gridColumn: 2,
    gridRow: 4
  }
}));

const ActionsWrap = styled(Typography, {
  name: 'Quote',
  slot: 'ActionsWrap'
})<{}>(({ theme }) => ({
  gridColumn: '1 / 5',
  gridRow: 5,
  alignSelf: 'center',
  justifyContent: 'center',
  textAlign: 'center',

  [theme.breakpoints.up('sm')]: {
    gridColumn: '2 / 4'
  }
}));

export default Quote;
