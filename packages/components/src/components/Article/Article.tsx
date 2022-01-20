import React from 'react';
import Head from 'next/head';
import xss from 'xss';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styled } from '@mui/material/styles';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import BackToTop from '@last-rev/component-library/dist/components/BackToTop/BackToTop';
import { MediaProps } from '@last-rev/component-library/dist/components/Media/Media';
import Link, { LinkProps } from '@last-rev/component-library/dist/components/Link/Link';
import Text from '@last-rev/component-library/dist/components/Text/Text';

import CategoryLinks from '../CategoryLinks';
import RelatedLinks from '../RelatedLinks';
import { sidekick } from '../../utils/sidekick';

export interface ArticleProps {
  __typename?: string;
  id?: string;
  title?: string;
  slug: string;
  pubDate?: string;
  summary?: string;
  body?: any;
  featuredMedia?: MediaProps;
  categories?: Array<LinkProps>;
  relatedLinks?: Array<LinkProps>;
  disableBackToTop?: boolean;
  sidekickLookup?: any;
}

export const Article = ({
  title,
  slug,
  featuredMedia,
  pubDate,
  summary,
  body,
  categories,
  relatedLinks,
  disableBackToTop,
  sidekickLookup
}: ArticleProps) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': `${title}`,
    'datePublished': `${pubDate}`,
    'image': featuredMedia ? `${featuredMedia?.file?.url}` : '',
    'keywords': `${categories?.map(category => category?.text).join(', ')}`,
    'url': `https://www.integralads.com/${slug}`,
  };

  return (
    <ErrorBoundary>
      <Head>
        <meta name="content_type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `${xss(JSON.stringify(schemaData))}` }} />
      </Head>

      {/* TODO: Create/add Header component */}
      {/* {header ? <ContentModule {...(header as any)} /> : null} */}
      <Box p={2} sx={{ backgroundColor: '#CCC', textAlign: 'center' }}>HEADER</Box>

      {/* TODO: Create Sidenav component https://lastrev.atlassian.net/browse/IAS-49 */}
      <Box p={2} sx={{ backgroundColor: '#DDD' }}>
        <Container maxWidth={'xl'}>
          <Grid container>
            <Grid item xs={12}>
              TOPIC NAV
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* TODO: Create Breadcrumbs component https://lastrev.atlassian.net/browse/IAS-63 */}
      <Box p={2} sx={{ backgroundColor: '#EEE' }}>
        <Container maxWidth={'xl'}>
          <Grid container>
            <Grid item xs={12}>
              BREADCRUMBS
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth={'xl'}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Box p={2} sx={{ backgroundColor: '#F5F5F5' }}>SIDE NAV</Box>
          </Grid>
          <Grid item xs={8}>
            <ArticleWrap {...sidekick(sidekickLookup)} itemScope itemType="https://schema.org/Article" data-testid="Article">

              {/* TODO: Create ArticleBody component https://lastrev.atlassian.net/browse/IAS-48 */}
              {title ? (
                <Typography variant="h2" component="h2" mb={1} {...sidekick(sidekickLookup?.title)} data-testid="Article-title">{title}</Typography>
              ) : null}

              {pubDate ? (
                <>
                  <AccessTimeIcon fontSize="small"
                    sx={{
                      width: 16,
                      height: 16,
                      margin: '7px 8px 0 0',
                      verticalAlign: 'top',
                      // TODO: Move all hex colors to theme
                      fill: '#335B6E'
                    }}
                  />
                  <Typography variant="body2" component="time" dateTime={pubDate}
                  sx={{
                    // TODO: Move all hex colors to theme
                    color: '#335B6E',
                    fontSize: 15,
                    lineHeight: 1.2
                  }}
                  {...sidekick(sidekickLookup?.pubDate)} data-testid="Article-pubDate">{pubDate}</Typography>
                </>
              ) : null}

              {summary ? (
                <Typography variant="body2" component="p" mt={4} {...sidekick(sidekickLookup?.summary)} data-testid="Article-summary">{summary}</Typography>
              ) : null}

              {body ? (
                <Box data-testid="Article-body">
                  <Text variant="article" sx={{ marginTop: 4 }} sidekickLookup={sidekickLookup?.body} body={body} />
                </Box>
              ) : null}

              {relatedLinks ? (
                <Box data-testid="Article-relatedLinks">
                  {/* TODO: Possibly use localization lookup for title */}
                  <RelatedLinks title="For more information, see the related articles:" links={relatedLinks} />
                </Box>
              ) : null}

              {categories ? (
                <Box data-testid="Article-categories">
                  <CategoryLinks links={categories} />
                </Box>
              ) : null}
            </ArticleWrap>
          </Grid>
        </Grid>
      </Container>

      {/* TODO: Use Section component https://lastrev.atlassian.net/browse/IAS-51 */}
      <CaseSection>
        <Container maxWidth={'xl'}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h2" component="h2" mb={3}>Headline for create case</Typography>
              <Typography variant="body1" component="p" mb={3}>Sed varius aliquet bibendum. Sed mi sapien, placerat vel molestie nec, dictum quis tortor.</Typography>
              <Link href="#" variant="button-contained">Create case</Link>
            </Grid>
          </Grid>
        </Container>
      </CaseSection>

      {/* TODO: Add test for disableBackToTop (missing in LRCL) */}
      {!disableBackToTop ? <BackToTop /> : null}

      {/* TODO: Create/add Footer component */}
      {/* {footer ? <ContentModule {...(footer as any)} /> : null} */}
      <Box p={2} sx={{ backgroundColor: '#CCC', textAlign: 'center' }}>FOOTER</Box>
    </ErrorBoundary>
  );
};

const ArticleWrap = styled(Box, {
  name: 'Article',
  slot: 'wrap',
})<{}>(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary
}));

const CaseSection = styled(Box, {
  name: 'Article',
  slot: 'CaseSection'
})<{}>(({ theme }) => ({
  // TODO: Move all hex colors to theme
  backgroundColor: '#E3F1F2',
  padding: theme.spacing(10, 0),
  textAlign: 'center'
}));

export default Article;
