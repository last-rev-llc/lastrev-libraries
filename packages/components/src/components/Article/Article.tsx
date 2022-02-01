import React from 'react';
import Head from 'next/head';
import xss from 'xss';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/material/styles';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import BackToTop from '@last-rev/component-library/dist/components/BackToTop/BackToTop';
import { MediaProps } from '@last-rev/component-library/dist/components/Media/Media';
import Link, { LinkProps } from '@last-rev/component-library/dist/components/Link/Link';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';

import ArticleNav from '../ArticleNav';
import ArticleHead from '../ArticleHead';
import ArticleBody from '../ArticleBody';
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
  sideNav?: Array<LinkProps>;
  disableBackToTop?: boolean;
  footerItems?: Array<any>;
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
  sideNav,
  disableBackToTop,
  footerItems,
  sidekickLookup
}: ArticleProps) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': `${title}`,
    'datePublished': `${pubDate}`,
    'image': featuredMedia ? `${featuredMedia?.file?.url}` : '',
    'keywords': `${categories?.map((category) => category?.text).join(', ')}`,
    'url': `https://www.integralads.com/${slug}`
  };
  return (
    <ErrorBoundary>
      <Head>
        <meta name="content_type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `${xss(JSON.stringify(schemaData))}` }} />
      </Head>

      {/* TODO: Create/add Header component
        * https://lastrev.atlassian.net/browse/IAS-74 */}
      {/* {header ? <ContentModule {...(header as any)} /> : null} */}
      <Box p={2} sx={{ backgroundColor: '#00324A', textAlign: 'center', color: '#FFF' }}>Header</Box>

      {/* TODO: Create/add Topic Nav component
        * https://lastrev.atlassian.net/browse/IAS-96 */}
      <Box p={2} sx={{ backgroundColor: '#E0E6E9' }}>
        <Container maxWidth={'xl'}>
          <Grid container>
            <Grid item xs={12}>
              <Stack direction="row" spacing={4} py={2}
                sx={{
                  '& a': {
                    paddingBottom: 0.5,
                    '&:first-of-type': {
                      cursor: 'default',
                      // TODO: Move all hex colors to theme (IAS-85)
                      borderBottom: '2px solid #FF574A'
                    }
                  },
                  '& a:hover': {
                    // TODO: Move all hex colors to theme (IAS-85)
                    color: '#FF574A',
                    textDecoration: 'none',
                    transition: 'color 0.18s ease'
                  }
                }}
              >
                {[
                  'Advertiser + Agency Solutions',
                  'Product Guidance',
                  'Publisher + Platforms Solutions',
                  'Programmatic Solutions',
                  'Billing Solutions',
                  'More'
                ].map((link, idx) => (
                  <Link
                    key={idx}
                    sx={{
                      fontSize: 15,
                      fontWeight: 500,
                      lineHeight: '18px',
                      '@media (max-width: 768px)': {
                        display: idx !== 0 ? 'none' : 'block'
                      }
                    }}
                  >
                    {link}
                    {idx === 5 && (
                      <ChevronLeftIcon
                        fontSize="small"
                        sx={{
                          // TODO: Move all hex colors to theme (IAS-85)
                          fill: '#ff574a',
                          margin: '-2px 0 0 4px',
                          verticalAlign: 'top',
                          transform: 'rotate(-90deg)'
                        }}
                      />
                    )}
                  </Link>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* TODO: Create Breadcrumbs component
        * https://lastrev.atlassian.net/browse/IAS-63 */}
      <Box p={2}
        sx={{ display: { sm: 'none', md: 'block' }}}
      >
        <Container maxWidth={'xl'}>
          <Grid container>
            <Grid item xs={12}>
              <Breadcrumbs aria-label="breadcrumb" separator="|"
                sx={{
                  py: 2,
                  fontSize: 15,
                  fontWeight: 500,
                  lineHeight: '18px',
                  '& [class*=separator]': {
                    mx: 3,
                    fontWeight: 600
                  },
                  '& li:not([class*=separator]) a': {
                    // TODO: Move all hex colors to theme (IAS-85)
                    color: '#4D7080',
                    '&:hover': {
                      color: 'text.primary',
                      textDecoration: 'none'
                    }
                  }
                }}
              >
                <Link href="/"
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <ChevronLeftIcon sx={{ fill: '#ff574a' }} fontSize="small" />
                  Help Center
                </Link>
                <Link href="/getting-started/">
                  Advertiser + Agency Solutions
                </Link>
                <Link href="/ias-ui/">
                  Using the IAS UI
                </Link>
              </Breadcrumbs>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth={'xl'}>
        <Grid container spacing={2}>
          <Grid item xs={2}
            sx={{ display: { sm: 'none', md: 'flex' }}}
          >
            <Box>
              {sideNav ? (
                <ArticleNav sideNav={sideNav} data-testid="Article-sideNav" />
              ) : null}
            </Box>
          </Grid>
          <Grid item sm={12} md={10} lg={8}>
            <ArticleWrap {...sidekick(sidekickLookup)} itemScope itemType="https://schema.org/Article" data-testid="Article">

              {title || pubDate || summary ? (
                <Box data-testid="Article-head" mt={1}>
                  <ArticleHead
                    title={title}
                    pubDate={pubDate}
                    summary={summary}
                  />
                </Box>
              ) : null}

              {body ? (
                <Box data-testid="Article-body" my={5}>
                  <ArticleBody body={body} />
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

      {footerItems?.map(item => (
        <ContentModule
          key={item?.id}
          {...item}
          data-testid={`Article-footerItems-${item.__typename}`}
          component="section"
        />
      ))}

      {!disableBackToTop ? <BackToTop /> : null}

      {/* TODO: Create/add Footer component
        * https://lastrev.atlassian.net/browse/IAS-59 */}
      {/* {footer ? <ContentModule {...(footer as any)} /> : null} */}
      <Box p={2} sx={{ backgroundColor: '#00324A', textAlign: 'center', color: '#FFF' }}>Footer</Box>
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
  },
}));

export default Article;
