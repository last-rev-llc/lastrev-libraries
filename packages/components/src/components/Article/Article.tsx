import React from 'react';
import Head from 'next/head';
import xss from 'xss';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import BackToTop from '@last-rev/component-library/dist/components/BackToTop/BackToTop';
import { MediaProps } from '@last-rev/component-library/dist/components/Media/Media';
import Link, { LinkProps } from '@last-rev/component-library/dist/components/Link/Link';
import Text from '@last-rev/component-library/dist/components/Text/Text';
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
                      fill: '#335B6E'
                    }}
                  />
                  <Typography variant="body2" component="time" dateTime={pubDate}
                  sx={{
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

              {/* TODO: Create ArticleRelatedLinks component https://lastrev.atlassian.net/browse/IAS-50 */}
              {relatedLinks ? (
                <Box
                  sx={{
                    marginBottom: 2,
                    padding: 3,
                    // TODO: Move all hex colors to theme
                    backgroundColor: '#F0F3F4',
                    border: '1px solid #CCD6DB'
                  }}>
                  <Typography variant="h6" component="h6">For more information, see the related articles:</Typography>
                  <List
                    sx={{
                      listStyle: 'disc',
                      paddingLeft: 3,
                      '& .MuiListItem-root': {
                        padding: 0,
                        '&:not(:last-child)': {
                          marginBottom: 1,
                        }
                      },
                      'a': {
                        color: '#1264A3',
                        fontSize: 16,
                        lineHeight: 1.5,
                        textDecoration: 'underline',
                        '&:hover': {
                          textDecoration: 'none'
                        }
                      }
                    }}
                    data-testid="Article-relatedLinks"
                    {...sidekick(sidekickLookup?.categories)}
                  >
                    {relatedLinks.map((link, i) => (
                      <ListItem key={i}
                        sx={{
                          display: 'list-item',
                          '&::marker': {
                            color: '#1264A3',
                            fontSize: '1rem'
                          }
                        }}
                      >
                        <Link href={link?.href}>{link?.text}</Link>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ) : null}

              {/* TODO: Create ArticleCategories component https://lastrev.atlassian.net/browse/IAS-64 */}
              {categories ? (
                <List
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& .MuiListItem-root': {
                      display: 'inline-block',
                      width: 'auto',
                      marginRight: { xs: 2, xl: 3 },
                      padding: 0
                    },
                    'a': {
                      padding: 1,
                      backgroundColor: '#D3EBED',
                      borderRadius: '3px',
                      color: 'text.primary',
                      fontSize: 12,
                      fontWeight: 600,
                      lineHeight: 1.3333,
                      textDecoration: 'none',
                      transition: 'background-color 0.15s ease',
                      '&:hover': {
                        backgroundColor: '#C3DCDE',
                        transition: 'background-color 0.18s ease'
                      }
                    }
                  }}
                  {...sidekick(sidekickLookup?.categories)}
                  data-testid="Article-categories"
                >
                  {categories.map((category, i) => (
                    <ListItem
                      key={i}
                      style={{
                        whiteSpace: 'nowrap',
                        marginLeft: i !== 0 ? 5 : undefined
                      }}
                    >
                      <Link href={category?.href}>{category?.text}</Link>
                    </ListItem>
                  ))}
                </List>
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
  name: 'ArticleWrap',
  slot: 'root',
  overridesResolver: (_, styles) => [styles.root]
})<{}>(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary
}));

const CaseSection = styled(Box, {
  name: 'Article',
  slot: 'CaseSection'
})<{}>(({ theme }) => ({
  backgroundColor: '#E3F1F2',
  padding: theme.spacing(10, 0),
  textAlign: 'center'
}));

export default Article;
