import React from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary';

import sidekick from '@last-rev/contentful-sidekick-util';

export interface ArticleHeadProps {
  title?: string;
  pubDate?: string;
  summary?: string;
  sidekickLookup?: any;
}

export const ArticleHead = ({ title, pubDate, summary, sidekickLookup }: ArticleHeadProps) => {
  return (
    <ErrorBoundary>
      {title ? (
        <Typography
          variant="h2"
          component="h1"
          mb={1}
          {...sidekick(sidekickLookup?.title)}
          data-testid="ArticleHead-title">
          {title}
        </Typography>
      ) : null}

      {pubDate ? (
        <Box displayPrint="none">
          <AccessTimeIcon
            fontSize="small"
            sx={{
              width: 16,
              height: 16,
              margin: '7px 8px 0 0',
              verticalAlign: 'top',
              fill: 'midnight.A80'
            }}
          />
          <Typography
            variant="time"
            component="time"
            dateTime={pubDate}
            {...sidekick(sidekickLookup?.pubDate)}
            data-testid="ArticleHead-pubDate">
            {dayjs(pubDate).format('MMM D, YYYY')}
          </Typography>
        </Box>
      ) : null}

      {summary ? (
        <Typography
          variant="body2"
          component="p"
          mt={4}
          {...sidekick(sidekickLookup?.summary)}
          data-testid="ArticleHead-summary">
          {summary}
        </Typography>
      ) : null}
    </ErrorBoundary>
  );
};

export default ArticleHead;
