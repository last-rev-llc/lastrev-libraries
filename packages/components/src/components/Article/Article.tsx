import React from 'react';
import Head from 'next/head';
import xss from 'xss';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary';
import BackToTop from '@last-rev/component-library/dist/components/BackToTop';
import { MediaProps } from '@last-rev/component-library/dist/components/Media';
import { LinkProps } from '@last-rev/component-library/dist/components/Link';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import { RichText } from '@last-rev/component-library/dist/components/Text';

import ArticleNav from '../ArticleNav';
import ArticleHead from '../ArticleHead';
import ArticleBody from '../ArticleBody';
import Breadcrumbs from '../Breadcrumbs';
import CategoryLinks from '../CategoryLinks';
import RelatedLinks from '../RelatedLinks';
import sidekick from '@last-rev/contentful-sidekick-util';
import TopicNavHorizontal from '../TopicNavHorizontal';

import { useLocalizationContext } from '../LocalizationContext';

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

export const Article = ({
  title,
  slug,
  header,
  footer,
  featuredMedia,
  pubDate,
  summary,
  body,
  categories,
  relatedLinks,
  sideNav,
  disableBackToTop,
  breadcrumbs,
  footerItems,
  topicNavItems,
  sidekickLookup
}: ArticleProps) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': `${title}`,
    'datePublished': `${pubDate}`,
    'image': featuredMedia ? `${featuredMedia?.file?.url}` : '',
    'keywords': `${categories?.map((category) => category?.text).join(', ')}`,
    'url': `${process.env.DOMAIN || 'https://www.integralads.com/'}${slug}`
  };
  const localization = useLocalizationContext();

  return (
    <ErrorBoundary>
      <Head>
        <meta name="content_type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `${xss(JSON.stringify(schemaData))}` }} />
      </Head>

      {header && <ContentModule {...(header as any)} />}

      {topicNavItems && <TopicNavHorizontal navItems={topicNavItems} />}

      {breadcrumbs &&  <Breadcrumbs breadcrumbs={breadcrumbs} sidekickLookup={sidekickLookup} data-testid="Article-breadcrumbs" />}

      <Container>
        <Grid container spacing={{ xs: 2, lg: 4 }}>
          <Grid item xs={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {sideNav && (
              <Box>
                <ArticleNav sideNav={sideNav} data-testid="Article-sideNav" />
              </Box>
            )}
          </Grid>
          <Grid item sm={12} md={10} lg={7}>
            <ArticleWrap
              {...sidekick(sidekickLookup)}
              itemScope
              itemType="https://schema.org/Article"
              data-testid="Article">
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
          </Grid>
          <Grid item lg={3} sx={{ margin: { md: '0 auto' } }}>
            {relatedLinks && (
                <Box data-testid="Article-relatedLinks" {...sidekick(sidekickLookup?.relatedLinks)}>
                  <RelatedLinks
                    title={
                      localization['article.relatedLinks.label']?.shortTextValue ??
                      'For more information, see the related articles:'
                    }
                    links={relatedLinks}
                  />
                </Box>
              )}
          </Grid>
        </Grid>
      </Container>

      {footerItems?.map((item) => (
        <ContentModule
          key={item?.id}
          {...item}
          data-testid={`Article-footerItems-${item.__typename}`}
          component="section"
        />
      ))}

      {!disableBackToTop && <BackToTop />}

      {footer && <ContentModule {...(footer as any)} />}
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

export default Article;