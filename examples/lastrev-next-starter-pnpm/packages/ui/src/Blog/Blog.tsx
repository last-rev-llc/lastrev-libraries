// TODO: Fix TS Errors
// @ts-nocheck
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAvatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography, { type TypographyProps } from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import ContentModule from '../ContentModule';
// import TwitterIcon from '../Icons/TwitterIcon';
// import FacebookIcon from '../Icons/FacebookIcon';
// import LinkedinIcon from '../Icons/LinkedinIcon';
// import EmailIcon from '../Icons/EmailIcon';
// import CopyLinkIcon from '../Icons/CopyLinkIcon';

import type { BlogProps } from './Blog.types';
import { type MediaProps } from '../Media';
import { type LinkProps } from '../Link';

const Blog = ({
  header,
  footer,
  featuredMedia,
  pubDate,
  title,
  body,
  author,
  relatedItems,
  // breadcrumbs,
  sidekickLookup,
  // summary,
  contents
}: BlogProps) => {
  const pathname = usePathname();
  // const [shareUrl, setShareUrl] = React.useState('');
  // const encodedShareUrl = encodeURIComponent(shareUrl);

  // React.useEffect(() => {
  //   const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  //   setShareUrl(`${origin}${pathname}`);
  // }, [pathname]);

  return (
    <>
      {header ? <ContentModule {...(header as any)} /> : null}

      <Root component="main" {...sidekick(sidekickLookup)}>
        <HeaderContainer>
          {/* TODO: Move Breadcrumb to its own component */}
          {/* {!!breadcrumbs?.length && (
            <Breadcrumb>
              {breadcrumbs.map((breadcrumb) => (
                <BreadcrumbItem key={breadcrumb?.id} {...breadcrumb} />
              ))}
            </Breadcrumb>
          )} */}

          {!!title && <Title component="h1">{title}</Title>}
          {!!pubDate && <PubDate variant="body1">Published: {pubDate}</PubDate>}

          {/* {!!summary && <Summary variant="body1">{summary}</Summary>} */}
        </HeaderContainer>

        <ContentContainer>
          <ContentWrap>
            {!!featuredMedia && (
              <FeaturedMediaWrap {...sidekick(sidekickLookup, 'featuredMedia')}>
                <FeaturedMedia {...(featuredMedia as MediaProps)} />
              </FeaturedMediaWrap>
            )}
            {!!body && (
              <BodyWrap>
                {!!body && (
                  <Body {...sidekick(sidekickLookup, 'body')} __typename="Text" body={body} variant="detailPageBody" />
                )}
              </BodyWrap>
            )}

            <ShareLinksWrapper>
              <ShareLinksLabel variant="body1">Share</ShareLinksLabel>

              {/* <ShareLinks>
                <ShareLink href={`http://www.twitter.com/share?url=${encodedShareUrl}`} target="_blank">
                  <TwitterIcon />
                  <Typography>Twitter</Typography>
                </ShareLink>
                <ShareLink href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`} target="_blank">
                  <FacebookIcon />
                  <Typography>Facebook</Typography>
                </ShareLink>
                <ShareLink
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`}
                  target="_blank">
                  <LinkedinIcon />
                  <Typography>Linkedin</Typography>
                </ShareLink>
                <ShareLink href={`mailto:?to=&body=${encodedShareUrl}`}>
                  <EmailIcon />
                  <Typography>Email</Typography>
                </ShareLink>
                <ShareLink
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                  }}>
                  <CopyLinkIcon />
                  <Typography>Copy Link</Typography>
                </ShareLink>
              </ShareLinks> */}
            </ShareLinksWrapper>
          </ContentWrap>

          {!!relatedItems?.length && (
            <RelatedItemsWrapper>
              <ResourcesLabel variant="body2">Related Items</ResourcesLabel>
              <RelatedItems>
                {relatedItems.map((item) => (
                  <RelatedItem key={item?.id} {...item} />
                ))}
              </RelatedItems>
            </RelatedItemsWrapper>
          )}

          {!!author && (
            <AuthorContainer>
              {(!!author.image || !!author.name) && (
                <Author>
                  {!!author.image && (
                    <Avatar size="large">
                      <AvatarImage {...author.image} />
                    </Avatar>
                  )}
                  {/* TODO: The variant for this text does not exist on Figma */}
                  {!!author.name && <AuthorName>{author.name}</AuthorName>}
                </Author>
              )}

              {!!author.body && (
                <AuthorSummary
                  {...sidekick(sidekickLookup, 'body')}
                  __typename="Text"
                  body={author.body}
                  variant="detailPageBody"
                />
              )}

              {!!author.socialLinks?.length && (
                <AuthorSocialLinks>
                  {author.socialLinks.map((link, index) => (
                    <AuthorSocialLink key={`author-social-link-${index}=${link?.href}`} {...(link as LinkProps)} />
                  ))}
                </AuthorSocialLinks>
              )}
            </AuthorContainer>
          )}
        </ContentContainer>
        {!!contents?.length && (
          <ContentContainer>
            <Content>
              {contents?.map((content: any) => (
                <ContentModule key={content?.id} {...content} />
              ))}
            </Content>
          </ContentContainer>
        )}
      </Root>
      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};

const Root = styled(Box, {
  name: 'Blog',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})(({ theme }) => ({
  'header[class*=elevation0] + & ': {
    padding: theme.spacing(25, 0, 0)
  }
}));

const HeaderContainer = styled(Container, {
  name: 'Blog',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(8)
}));

const ContentContainer = styled(Container, {
  name: 'Blog',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: theme.spacing(4, 2)
}));

const Breadcrumb = styled(Box, {
  name: 'Blog',
  slot: 'Breadcrumb',
  overridesResolver: (_, styles) => [styles.breadcrumb]
})(({}) => ({
  'gridColumn': '1 / -1',
  'gridRow': '1',
  'alignItems': 'center',
  'maxWidth': '100%',
  'overflow': 'hidden',
  'overflowWrap': 'break-word',
  'textOverflow': 'ellipsis',
  'display': '-webkit-box',
  'hyphens': 'auto',
  '-webkit-line-clamp': '1',
  '-webkit-box-orient': 'vertical'
}));

const BreadcrumbItem = styled(ContentModule, {
  name: 'Blog',
  slot: 'BreadcrumbItem',
  overridesResolver: (_, styles) => [styles.breadcrumbItem]
})(({ theme }) => ({
  borderLeft: `1px solid ${theme.palette.secondary.main}`,
  paddingLeft: theme.spacing(0.5),
  ...theme.typography.bodySmall,
  color: theme.palette.primary.main,
  marginRight: theme.spacing(1)
}));

const BodyWrap = styled(Box, {
  name: 'Blog',
  slot: 'BodyWrap',
  overridesResolver: (_, styles) => [styles.bodyWrap]
})(() => ({}));

const Title = styled(Typography, {
  name: 'Blog',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})<TypographyProps<React.ElementType>>(() => ({}));

const Summary = styled(Typography, {
  name: 'Blog',
  slot: 'Summary',
  overridesResolver: (_, styles) => [styles.summary]
})<TypographyProps<React.ElementType>>(({ theme }) => ({
  marginBottom: theme.spacing(4),
  display: 'inline-block'
}));

const PubDate = styled(Typography, {
  name: 'Blog',
  slot: 'PubDate',
  overridesResolver: (_, styles) => [styles.pubDate]
})<TypographyProps<React.ElementType>>(({ theme }) => ({
  gridColumn: '1 / -1',
  gridRow: '3',
  ...theme.typography.bodySmall
}));

const Author = styled(Box, {
  name: 'Blog',
  slot: 'Author',
  overridesResolver: (_, styles) => [styles.author]
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: theme.spacing(1.5)
}));

const Avatar = styled(MuiAvatar, {
  name: 'Blog',
  slot: 'Avatar',
  overridesResolver: (_, styles) => [styles.avatar]
})<{ size?: string }>(({ theme, size }) => ({
  width: theme.spacing(8),
  height: theme.spacing(8),
  aspectRatio: '1/1',

  ...(size === 'large' && {
    width: theme.spacing(12),
    height: theme.spacing(12)
  })
}));

const AvatarImage = styled(ContentModule, {
  name: 'Blog',
  slot: 'AvatarImage',
  overridesResolver: (_, styles) => [styles.avatarImage]
})(() => ({
  objectFit: 'cover',
  aspectRatio: 'inherit'
}));

const AuthorName = styled(Typography, {
  name: 'Blog',
  slot: 'AuthorName',
  overridesResolver: (_, styles) => [styles.authorName]
})<TypographyProps<React.ElementType>>(({ theme }) => ({
  'paddingBottom': theme.spacing(1.5),

  '& span': {
    ...theme.typography.body1,
    fontWeight: 700
  }
}));

const FeaturedMediaWrap = styled(Box, {
  name: 'Blog',
  slot: 'FeaturedMediaWrap',
  overridesResolver: (_, styles) => [styles.featuredMediaWrap]
})(() => ({}));

const FeaturedMedia = styled(ContentModule, {
  name: 'Blog',
  slot: 'FeaturedMedia',
  overridesResolver: (_, styles) => [styles.featuredMedia]
})(() => ({}));

const ShareLinksWrapper = styled(Box, {
  name: 'Blog',
  slot: 'ShareLinksWrapper',
  overridesResolver: (_, styles) => [styles.shareLinksWrapper]
})(() => ({}));

const ShareLinksLabel = styled(Typography, {
  name: 'Blog',
  slot: 'ShareLinksLabel',
  overridesResolver: (_, styles) => [styles.shareLinksLabel]
})<TypographyProps<React.ElementType>>(() => ({
  fontWeight: 700
}));

const ShareLinks = styled(Box, {
  name: 'Blog',
  slot: 'ShareLinks',
  overridesResolver: (_, styles) => [styles.shareLinks]
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1)
}));

const ShareLink = styled((props) => <ButtonBase {...props} disableRipple disableTouchRipple />, {
  name: 'Blog',
  slot: 'ShareLink',
  overridesResolver: (_, styles) => [styles.shareLink]
})<{ href?: string; target?: string; onClick?: any }>(({ theme }) => ({
  'gap': theme.spacing(1),

  '& svg': {
    width: theme.spacing(2),
    height: theme.spacing(2)
  },

  '& .MuiTypography-root': {
    display: 'none'
  },

  [theme.breakpoints.up('md')]: {
    'gap': theme.spacing(1),
    '& .MuiTypography-root': {
      ...theme.typography.bodySmall,
      display: 'block'
    }
  }
}));

const ContentWrap = styled(Box, {
  name: 'Blog',
  slot: 'ContentWrap',
  overridesResolver: (_, styles) => [styles.contentWrap]
})(({ theme }) => ({
  gridColumn: '1 / -1',
  gridRow: '1',

  [theme.breakpoints.up('md')]: {
    gridColumn: '2 / 9'
  }
}));

const Body = styled(ContentModule, {
  name: 'Blog',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})(() => ({}));

const RelatedItemsWrapper = styled(Box, {
  name: 'Blog',
  slot: 'RelatedItemsWrapper',
  overridesResolver: (_, styles) => [styles.relatedItemsWrapper]
})(({ theme }) => ({
  gridColumn: '1 / -1',
  gridRow: '2',

  [theme.breakpoints.up('md')]: {
    gridColumn: '9 / 11',
    gridRow: '1'
  }
}));

const ResourcesLabel = styled(Typography, {
  name: 'Blog',
  slot: 'ResourcesLabel',
  overridesResolver: (_, styles) => [styles.resourcesLabel]
})<TypographyProps<React.ElementType>>(() => ({
  fontWeight: 700
}));

const RelatedItems = styled(Box, {
  name: 'Blog',
  slot: 'RelatedItems',
  overridesResolver: (_, styles) => [styles.relatedItems]
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3)
}));

const RelatedItem = styled(ContentModule, {
  name: 'Blog',
  slot: 'RelatedItem',
  overridesResolver: (_, styles) => [styles.relatedItem]
})(() => ({}));

const AuthorContainer = styled(Box, {
  name: 'Blog',
  slot: 'AuthorContainer',
  overridesResolver: (_, styles) => [styles.authorContainer]
})(({ theme }) => ({
  gridColumn: '1 / -1',
  gridRow: '2',
  borderTop: `1px solid ${theme.palette.secondary.main}`,
  padding: theme.spacing(4, 0),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),

  [theme.breakpoints.up('md')]: {
    gridColumn: '2 / 9'
  },

  [theme.breakpoints.down('md')]: {
    '[class*=Blog-author]': {
      alignItems: 'flex-start',
      flexDirection: 'column'
    }
  }
}));

const AuthorSummary = styled(ContentModule, {
  name: 'Blog',
  slot: 'AuthorSummary',
  overridesResolver: (_, styles) => [styles.authorSummary]
})(() => ({}));

const AuthorSocialLinks = styled(Box, {
  name: 'Blog',
  slot: 'AuthorSocialLinks',
  overridesResolver: (_, styles) => [styles.authorSocialLinks]
})(({ theme }) => ({
  'display': 'flex',
  'gap': theme.spacing(3),

  '.MuiButtonBase-root': {
    padding: 0
  },

  'svg': {
    width: theme.spacing(5),
    height: theme.spacing(5)
  }
}));

const AuthorSocialLink = styled(ContentModule, {
  name: 'Blog',
  slot: 'AuthorSocialLink',
  overridesResolver: (_, styles) => [styles.AuthorSocialLink]
})(() => ({}));

const Content = styled(Box, {
  name: 'Blog',
  slot: 'Content',
  overridesResolver: (_, styles) => [styles.content]
})(({ theme }) => ({
  gridColumn: '1 / -1',
  marginTop: theme.spacing(4)
}));

export default Blog;
