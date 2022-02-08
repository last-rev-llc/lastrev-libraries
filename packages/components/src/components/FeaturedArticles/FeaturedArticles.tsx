import React from 'react';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import LRCard from '@last-rev/component-library/dist/components/Card/Card';
import LRLink from '@last-rev/component-library/dist/components/Link/Link';

import { sidekick } from '../../utils/sidekick';

export interface FeaturedArticlesProps {
  articles?: Array<any>;
}

const Link = styled(LRLink)(({ theme }) => ({
  textDecoration: 'none',
  marginBottom: theme.spacing(3),
  borderBottom: `1px solid ${alpha('#99ADB7', 0.3)}`,

  '&:last-child': {
    borderBottom: 'none'
  },
}));

const Card = styled(LRCard)(({ theme }) => ({
  background: theme.palette.background.default,

  '& .MuiCardContent-root': {
    padding: theme.spacing(3, 0)
  },

  '& .MuiTypography-h3': {
    ...theme.typography.h5,
    marginBottom: theme.spacing(1),
  },

  '& .MuiTypography-body1': {
    ...theme.typography.body2,
    marginBottom: 0,
  },
}));

const FeaturedArticles = ({
  articles
}: FeaturedArticlesProps) => {
  return (
    <ErrorBoundary>
      {/* TODO: Use localization lookup for title (IAS-117) */}
      <Typography variant="h4" component="h4" mb={3} data-testid="FeaturedArticles-title">
        Featured Articles
      </Typography>

      {articles && articles.map((article) => (
        <Link
          display="block"
          href={article.link?.href}
          data-testid="FeaturedArticles-articleCard"
        >
          <Card
            elevation={0}
            variant="standard-blog"
            media={article.media}
            title={article.title}
            body={article.body}
            sidekickLookup=""
          />
        </Link>
      ))}
    </ErrorBoundary>
  );
};

export default FeaturedArticles;
