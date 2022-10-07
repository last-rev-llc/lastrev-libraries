import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary';
import { MediaProps } from '@last-rev/component-library/dist/components/Media';
import { LinkProps } from '@last-rev/component-library/dist/components/Link';
import { RichText } from '@last-rev/component-library/dist/components/Text';

import ArticleHead from '../ArticleHead';
import ArticleBody from '../ArticleBody';
import CategoryLinks from '../CategoryLinks';
import sidekick from '@last-rev/contentful-sidekick-util';

export interface ArticleProps {
  __typename?: string;
  id?: string;
  title?: string;
  slug: string;
  pubDate?: string;
  summary?: string;
  body?: RichText;
  featuredMedia?: MediaProps;
  categories?: Array<LinkProps>;
  relatedLinks?: Array<LinkProps>;
  sideNav?: Array<LinkProps>;
  disableBackToTop?: boolean;
  requiredRoles?: Array<string>;
  breadcrumbs?: Array<LinkProps>;
  footerItems?: Array<any>;
  header?: any;
  footer?: any;
  sidekickLookup?: any;
  topicNavItems?: Array<LinkProps>;
}

export const ArticleEmbeded = ({
  title,
  pubDate,
  summary,
  body,
  categories,

  sidekickLookup
}: ArticleProps) => {
  return (
    <ErrorBoundary>
      <ArticleWrap {...sidekick(sidekickLookup)} itemScope itemType="https://schema.org/Article" data-testid="Article">
        {(title || pubDate || summary) && (
          <Box data-testid="Article-head" mt={{ xs: 0, md: 1 }}>
            <ArticleHead title={title} pubDate={pubDate} summary={summary} sidekickLookup={sidekickLookup} />
          </Box>
        )}

        {body && (
          <Box data-testid="Article-body" my={5}>
            <ArticleBody body={body} sidekickLookup={sidekickLookup} />
          </Box>
        )}

        {categories && (
          <Box data-testid="Article-categories" {...sidekick(sidekickLookup?.categories)}>
            <CategoryLinks links={categories} />
          </Box>
        )}
      </ArticleWrap>
    </ErrorBoundary>
  );
};

const ArticleWrap = styled(Box, {
  name: 'Article',
  slot: 'wrap'
})<{}>(({ theme }) => ({
  paddingBottom: theme.spacing(5),
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(5)
  }
}));

export default ArticleEmbeded;
