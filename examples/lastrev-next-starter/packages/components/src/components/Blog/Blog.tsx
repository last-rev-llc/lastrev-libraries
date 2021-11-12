import React from 'react';
import Head from 'next/head';
import xss from 'xss';
import { Box, Paper, Container, Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import styled from '@mui/system/styled';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import Media from '@last-rev/component-library/dist/components/Media/Media';
import Text from '@last-rev/component-library/dist/components/Text/Text';
import { MediaProps } from '@last-rev/component-library/dist/components/Media/Media.types';
import Link, { LinkProps } from '@last-rev/component-library/dist/components/Link/Link';
import { CategoryBlog } from '@lrns/graphql-sdk';
import { ContentModule } from '@last-rev/component-library';
import sidekick from '../../utils/sidekick';

export interface BlogProps {
  __typename?: string;
  sidekickLookup?: any;
  title?: string;
  slug?: string;
  featuredMedia?: Array<MediaProps>;
  author?: any;
  body?: any;
  categories?: any;
  tags?: any;
  relatedLinks?: LinkProps[];
  contents?: any;
}

export const Blog = ({
  title,
  slug,
  featuredMedia,
  author,
  body,
  categories,
  tags,
  relatedLinks,
  sidekickLookup,
  contents
}: BlogProps) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': `${title}`,
    'image': featuredMedia ? `${featuredMedia[0]?.file?.url}` : null,
    'keywords': `${tags}`,
    'url': `https://www.strong365.org/blogs${slug}`,
    'author': {
      '@type': 'Person',
      'name': `${author?.name}`
    }
  };

  return (
    <ErrorBoundary>
      <Head>
        <meta name="content_type" content="blog" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `${xss(JSON.stringify(schemaData))}` }} />
      </Head>
      <Root {...sidekick(sidekickLookup)} itemScope itemType="https://schema.org/Blog">
        <ContentContainer maxWidth={'xl'}>
          <Grid container spacing={5} sx={{ py: { lg: 4 } }}>
            <Grid component="article" item xs={12} sm={8}>
              {title ? (
                <Typography variant="h2" component="h2" {...sidekick(sidekickLookup?.title)}>
                  {title}
                </Typography>
              ) : null}
              <br />
              {author ? (
                <Typography variant="body1" component="p" {...sidekick(sidekickLookup?.author)}>
                  {author?.name} - {author?.jobTitle}
                </Typography>
              ) : null}
              <br />
              {featuredMedia ? (
                <MediaWrap>
                  <Media {...featuredMedia[0]} {...sidekick(sidekickLookup?.featuredMedia)} />
                </MediaWrap>
              ) : null}
              {body ? <Text variant="blog" sidekickLookup={sidekickLookup?.body} body={body} /> : null}
              <ContentsWrapper sx={{ py: 3 }}>
                {contents?.map((content: any) => (
                  <ContentModule key={content?.id} {...content} />
                ))}
              </ContentsWrapper>
            </Grid>
            <Grid component="aside" item xs={12} sm={4} sx={{}}>
              <Paper
                sx={{
                  padding: { xs: 2, md: 2, xl: 4 },
                  position: 'sticky',
                  top: 132 // Header height + 32px
                }}>
                <List
                  sx={{
                    '& .MuiListItem-root': {
                      'flexDirection': 'column',
                      'alignItems': 'flex-start',
                      'padding': '0 8px',
                      '&:not(:last-child)': {
                        paddingBottom: { xs: 3, xl: 5 },
                        borderBottom: '2px solid',
                        borderColor: 'primary.main'
                      },
                      '&:not(:first-of-type)': {
                        paddingTop: { xs: 4, sm: 3, xl: 4 }
                      },
                      // <ArrowForwardIosIcon/> hover
                      '& li:hover > svg': {
                        backgroundColor: 'primary.main'
                      }
                    },
                    '& .MuiListItemText-root': {
                      width: '100%',
                      paddingBottom: 0
                    },
                    'a': {
                      'textDecoration': 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }
                  }}>
                  <ListItem>
                    <ListItemText
                      primary="Share"
                      primaryTypographyProps={{
                        variant: 'h3'
                      }}
                    />
                    <ul
                      style={{
                        listStyle: 'none',
                        display: 'flex',
                        flexWrap: 'wrap',
                        padding: '0'
                      }}>
                      <li>
                        <Link
                          href={`https://www.facebook.com/sharer.php?u=${schemaData.url}`}
                          target="_blank"
                          rel="noopener noreferrer">
                          <FacebookIcon sx={{ marginRight: 2 }} />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`mailto:?subject=Check out this article&body=Check out this article:+${title}+${schemaData.url}`}
                          target="_blank"
                          rel="noopener noreferrer">
                          <EmailIcon sx={{ marginRight: 2 }} />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`https://twitter.com/share?url=${schemaData.url}&text=Check this article:+${title}`}
                          target="_blank"
                          rel="noopener noreferrer">
                          <TwitterIcon />
                        </Link>
                      </li>
                    </ul>
                  </ListItem>
                  {relatedLinks ? (
                    <ListItem>
                      <ListItemText
                        primary="Learn more"
                        primaryTypographyProps={{
                          variant: 'h3'
                        }}
                      />
                      <ul
                        style={{
                          listStyle: 'none',
                          padding: 0
                        }}
                        {...sidekick(sidekickLookup?.relatedLinks)}>
                        {relatedLinks?.map((link, i) => (
                          <li
                            key={link?.id}
                            style={{
                              display: 'flex',
                              marginBottom: i !== relatedLinks.length - 1 ? 16 : undefined
                            }}>
                            <ArrowForwardIosIcon
                              sx={{
                                width: '1.2rem',
                                height: '1.2rem',
                                marginRight: 1,
                                padding: 0.25,
                                verticalAlign: 'top',
                                backgroundColor: 'rgba(255, 255, 255, 0.65)',
                                borderRadius: '50%',
                                fill: '#0b0b0b'
                              }}
                            />
                            <Link {...(link as any)} />
                          </li>
                        ))}
                      </ul>
                    </ListItem>
                  ) : null}
                  {categories ? (
                    <ListItem>
                      <ListItemText
                        primary="Categories"
                        primaryTypographyProps={{
                          variant: 'h3'
                        }}
                      />
                      <ul
                        style={{
                          listStyle: 'none',
                          display: 'flex',
                          flexWrap: 'wrap',
                          padding: '0'
                        }}
                        {...sidekick(sidekickLookup?.categories)}>
                        {categories.map((categoryBlog: CategoryBlog, i: React.Key | null | undefined) => (
                          <li
                            key={i}
                            style={{
                              whiteSpace: 'nowrap',
                              marginRight: i !== categories.length - 1 ? 5 : undefined
                            }}>
                            <Link href={`/blogs/${categoryBlog?.slug}`}>{categoryBlog?.title}</Link>
                            {i !== categories.length - 1 ? ', ' : ''}
                          </li>
                        ))}
                      </ul>
                    </ListItem>
                  ) : null}
                  {tags ? (
                    <ListItem>
                      <ListItemText
                        primary="Tags"
                        primaryTypographyProps={{
                          variant: 'h3'
                        }}
                      />
                      <ul
                        style={{
                          listStyle: 'none',
                          display: 'flex',
                          flexWrap: 'wrap',
                          padding: '0'
                        }}
                        {...sidekick(sidekickLookup?.tags)}>
                        {tags.map((tag: string, i: React.Key | null | undefined) => (
                          <li
                            key={tag}
                            style={{ whiteSpace: 'nowrap', marginRight: i !== tags.length - 1 ? 5 : undefined }}>
                            <Link text={tag} href={`/blogs?tags=${tag}`} />
                            {i !== tags.length - 1 ? ', ' : ''}
                          </li>
                        ))}
                      </ul>
                    </ListItem>
                  ) : null}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </ContentContainer>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Blog',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>(() => ({
  display: 'block'
}));

const ContentContainer = styled(Container, {
  name: 'Section',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    padding: theme.spacing(0, 4)
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0, 2)
  }
}));

const MediaWrap = styled(Box, {
  name: 'Wrap',
  slot: 'MediaWrap'
})<{ variant?: string }>(({ theme }) => ({
  'paddingTop': theme.spacing(4),
  'paddingBottom': theme.spacing(4),
  '& img': {
    'width': '100%',
    'min-height': '50vh'
  },
  '& iframe': {
    'width': '100%',
    'min-height': '50vh'
  },
  [theme.breakpoints.down('md')]: {
    'paddingTop': theme.spacing(2),
    'paddingBottom': theme.spacing(2),
    '& img': {
      'min-height': 'auto'
    },
    '& iframe': {
      'width': '100%',
      'min-height': '50vh'
    }
  }
}));

const ContentsWrapper = styled(Box, {
  name: 'Blog',
  slot: 'ContentsWrapper',
  overridesResolver: (_, styles) => [styles.contentsWrapper]
})<{ variant?: string }>(() => ({}));

export default Blog;
