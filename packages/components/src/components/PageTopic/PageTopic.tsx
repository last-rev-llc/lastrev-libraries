import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import BackToTop from '@last-rev/component-library/dist/components/BackToTop/BackToTop';
import { LinkProps } from '@last-rev/component-library/dist/components/Link/Link';
import { CardProps } from '@last-rev/component-library/dist/components/Card/Card';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import { NavigationItemProps } from '@last-rev/component-library/dist/components/NavigationItem/NavigationItem';
import TopicNavHorizontal from '../TopicNavHorizontal';
import TopicNav from '../TopicNav';
import ArticleCategory from '../ArticleCategory/ArticleCategory';
import FeaturedArticles from '../FeaturedArticles/FeaturedArticles';
import { sidekick } from '../../utils/sidekick';

export interface PageTopicProps {
  __typename?: string;
  id: string;
  title?: string;
  hero?: any;
  subCategories?: Array<LinkProps>;
  articles?: Array<any>;
  featuredArticles?: Array<CardProps>;
  categoryHierarchyLinks?: Array<NavigationItemProps>;
  header?: any;
  footer?: any;
  disableBackToTop: boolean;
  sidekickLookup?: any;
  link: LinkProps;
  topicNavItems: Array<LinkProps>;
}

export const PageTopic = ({
  id,
  hero,
  title,
  header,
  footer,
  articles,
  subCategories,
  categoryHierarchyLinks,
  featuredArticles,
  disableBackToTop,
  sidekickLookup,
  topicNavItems
}: PageTopicProps) => {
  return (
    <ErrorBoundary>
      {header ? <ContentModule {...(header as any)} /> : null}

      {topicNavItems && <TopicNavHorizontal navItems={topicNavItems} />}

      {hero ? <ContentModule {...(hero as any)} /> : null}

      <Container maxWidth="xl" {...sidekick(sidekickLookup)} sx={{ my: 3 }}>
        <Grid container spacing={{ xs: 2, lg: 4 }}>
          <Grid item xs={12} md={4} xl={3} sx={{ display: { sm: 'none', md: 'flex' } }}>
            <Box>
              {categoryHierarchyLinks ? (
                <TopicNav currentCategoryId={id} navItems={categoryHierarchyLinks} data-testid="Topic-sideNav" />
              ) : null}
            </Box>
          </Grid>

          <Grid item xs {...sidekick(sidekickLookup)} data-testid="Topic-Articles-Wrap">
            <ArticleCategory id={id} title={title} subCategories={subCategories} articles={articles} />
          </Grid>

          {featuredArticles && featuredArticles.length && (
            <Grid item xs={12} md={12} xl={3} {...sidekick(sidekickLookup)} data-testid="Topic-Featured-Articles-Wrap">
              <FeaturedArticles articles={featuredArticles} />
            </Grid>
          )}
        </Grid>
      </Container>

      {!disableBackToTop ? <BackToTop /> : null}

      {footer ? <ContentModule {...(footer as any)} /> : null}
    </ErrorBoundary>
  );
};

export default PageTopic;