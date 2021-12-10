import React from 'react';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import Media, { MediaProps } from '@last-rev/component-library/dist/components/Media/Media';
import Link, { LinkProps } from '@last-rev/component-library/dist/components/Link/Link';
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

export const Quote = ({
  sidekickLookup,
  quoteImage,
  quote,
  authorName,
  authorTitle,
  actions,
  variant = 'one-column'
}: QuoteProps) => {
  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)}>
        <InnerWrap quoteVariant={variant}>
          <ContentWrap quoteVariant={variant}>
            {quoteImage && (
              <MediaWrap quoteVariant={variant}>
                <MediaItem {...quoteImage} {...sidekick(sidekickLookup?.quoteImage)} />
              </MediaWrap>
            )}

            {quote && (
              <QuoteText {...sidekick(sidekickLookup?.quote)} quoteVariant={variant}>
                {quote}
              </QuoteText>
            )}

            {authorName && (
              <AuthorName {...sidekick(sidekickLookup?.authorName)} quoteVariant={variant}>
                {authorName}
              </AuthorName>
            )}
            {authorTitle && (
              <AuthorTitle {...sidekick(sidekickLookup?.authorTitle)} quoteVariant={variant}>
                {authorTitle}
              </AuthorTitle>
            )}

            {actions && (
              <ActionsWrap quoteVariant={variant}>
                {actions.map((action) => (
                  <Link {...action} key={action.id} />
                ))}
              </ActionsWrap>
            )}
          </ContentWrap>
        </InnerWrap>
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
  ...(theme.mixins.section(theme, { inverse: theme.scheme }) as any),

  color: theme.palette.text.primary
}));

const InnerWrap = styled(Box, {
  name: 'Quote',
  slot: 'InnerWrap',
  shouldForwardProp: (prop) => prop !== 'quoteVariant'
})<{ quoteVariant: string }>(({ theme, quoteVariant }) => ({
  ...(quoteVariant !== 'two-column' && {
    ...(theme.mixins.container(theme, { maxWidth: 'md' }) as any)
  }),

  ...(quoteVariant === 'two-column' && {
    ...(theme.mixins.container(theme, { maxWidth: 'xl' }) as any)
  })
}));

const ContentWrap = styled(Box, {
  name: 'Quote',
  slot: 'ContentWrap',
  shouldForwardProp: (prop) => prop !== 'quoteVariant'
})<{ quoteVariant: string }>(({ theme, quoteVariant }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  
  ...(quoteVariant !== 'two-column' && {
    gridTemplateColumns: 'repeat(4, 1fr)'
  }),
  
  ...(quoteVariant === 'two-column' && {
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, 50%)'
    }
  })
}));

const MediaWrap = styled(Box, {
  name: 'Quote',
  slot: 'MediaWrap',
  shouldForwardProp: (prop) => prop !== 'quoteVariant'
})<{ quoteVariant: string }>(({ theme, quoteVariant }) => ({
  ...(quoteVariant !== 'two-column' && {
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
  }),

  ...(quoteVariant === 'two-column' && {
    gridColumn: 1,
    gridRow: 1,

    [theme.breakpoints.up('sm')]: {
      gridColumn: 2,
    gridRow: '1/5',
    }
  })
}));


const MediaItem = styled(Media, {
  name: 'Quote',
  slot: 'MediaItem'
})<MediaProps>(() => ({}));


const QuoteText = styled(Typography, {
  name: 'Quote',
  slot: 'QuoteText',
  shouldForwardProp: (prop) => prop !== 'quoteVariant'
})<{ quoteVariant: string }>(({ theme, quoteVariant }) => ({
  ...(theme.typography.h4 as any),
  fontStyle: 'italic',

  ...(quoteVariant !== 'two-column' && {
    gridColumn: '1 / 5',
    gridRow: 2,
    width: '100%',
    textAlign: 'center'
  }),

  ...(quoteVariant === 'two-column' && {
    gridColumn: 1,
    gridRow: 2,
    textAlign: 'left',

    [theme.breakpoints.up('sm')]: {
      gridColumn: 1,
      gridRow: 1,
    }
  }),

  '&': {
    [theme.breakpoints.up('sm')]: {
      ...(theme.typography.h3 as any),
    }
  }
}));

const AuthorName = styled(Typography, {
  name: 'Quote',
  slot: 'AuthorName',
  shouldForwardProp: (prop) => prop !== 'quoteVariant'
})<{ quoteVariant: string }>(({ theme, quoteVariant }) => ({
  ...(theme.typography.body1 as any),
  fontSize: '1.125rem',
  fontWeight: 700,
  whiteSpace: 'nowrap',
  width: '100%',
  display: 'flex',

  ...(quoteVariant !== 'two-column' && {
    gridColumn: '1 / 5',
    gridRow: 3,
    alignSelf: 'center',
    justifyContent: 'center',

    [theme.breakpoints.up('sm')]: {
      gridColumn: 2,
      gridRow: 3,
      alignSelf: 'flex-end',
      justifyContent: 'flex-start',
    }
  }),

  ...(quoteVariant === 'two-column' && {
    gridColumn: 1,
    gridRow: 3,
    
    [theme.breakpoints.up('sm')]: {
      gridColumn: 1,
      gridRow: 2
    },
  })
}));

const AuthorTitle = styled(Typography, {
  name: 'Quote',
  slot: 'AuthorTitle',
  shouldForwardProp: (prop) => prop !== 'quoteVariant'
})<{ quoteVariant: string }>(({ theme, quoteVariant }) => ({
  ...theme.typography.body1,
  fontSize: '0.925rem',
  whiteSpace: 'nowrap',

  ...(quoteVariant !== 'two-column' && {
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
  }),

  ...(quoteVariant === 'two-column' && {
    gridColumn: 1,
    gridRow: 4,

    [theme.breakpoints.up('sm')]: {
      gridColumn: 1,
      gridRow: 3
    },
  })
}));

const ActionsWrap = styled(Typography, {
  name: 'Quote',
  slot: 'ActionsWrap',
  shouldForwardProp: (prop) => prop !== 'quoteVariant'
})<{ quoteVariant: string }>(({ theme, quoteVariant }) => ({
  ...(quoteVariant !== 'two-column' && {
    gridColumn: '1 / 5',
    gridRow: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',

    [theme.breakpoints.up('sm')]: {
      gridColumn: '2 / 4',
    }
  }),

  ...(quoteVariant === 'two-column' && {
    gridColumn: 1,
    gridRow: 5,

    [theme.breakpoints.up('sm')]: {
      gridColumn: 1,
      gridRow: 4
    },
  })
}));

export default Quote;
