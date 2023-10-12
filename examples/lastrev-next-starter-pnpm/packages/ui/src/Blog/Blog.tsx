import React from 'react';
import { usePathname } from 'next/navigation';
import Head from 'next/head';
import { type BlogPosting } from 'schema-dts';
import { jsonLdScriptProps } from 'react-schemaorg';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAvatar from '@mui/material/Avatar';
import Typography, { type TypographyProps } from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import sidekick from '@last-rev/contentful-sidekick-util';

import Grid from '../Grid';
import Breadcrumbs from '../Breadcrumbs';
import ContentModule from '../ContentModule';
import TwitterIcon from '../Icons/TwitterIcon';
import FacebookIcon from '../Icons/FacebookIcon';
import LinkedinIcon from '../Icons/LinkedinIcon';
import EmailIcon from '../Icons/EmailIcon';
import CopyLinkIcon from '../Icons/CopyLinkIcon';

import type { BlogProps, BlogOwnerState } from './Blog.types';
import { type MediaProps } from '../Media';
import { type LinkProps } from '../Link';

const Blog = (props: BlogProps) => {
  const ownerState = { ...props };
  console.log({ props });
  const {
    header,
    footer,
    featuredMedia,
    pubDate,
    title,
    body,
    author,
    relatedItems,
    jsonLd,
    breadcrumbs,
    sidekickLookup,
    hero
  } = props;

  const pathname = usePathname();
  const [shareUrl, setShareUrl] = React.useState('');
  const encodedShareUrl = encodeURIComponent(shareUrl);

  React.useEffect(() => {
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    setShareUrl(`${origin}${pathname}`);
  }, [pathname]);

  return (
    <>
      {!!jsonLd ? (
        <Head>
          <script
            {...jsonLdScriptProps<BlogPosting>({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              'name': 'Grace Hopper',
              'alternateName': 'Grace Brewster Murray Hopper',
              'alumniOf': {
                '@type': 'CollegeOrUniversity',
                'name': ['Yale University', 'Vassar College']
              },
              'knowsAbout': ['Compilers', 'Computer Science']
            })}
          />
        </Head>
      ) : // <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      null}

      {header ? <ContentModule {...(header as any)} /> : null}

      <Root component="main" {...sidekick(sidekickLookup)} ownerState={ownerState}>
        <ContentOuterGrid ownerState={ownerState}>
          <HeaderWrap ownerState={ownerState}>
            {hero ? (
              <ContentModule {...(hero as any)} />
            ) : (
              <>
                {!!title && (
                  <Title component="h1" variant="display1" ownerState={ownerState}>
                    {title}
                  </Title>
                )}

                {!!pubDate && <PubDate ownerState={ownerState}>{pubDate}</PubDate>}
              </>
            )}
          </HeaderWrap>

          <ContentWrap ownerState={ownerState}>
            {!!breadcrumbs?.length ? (
              <BreadcrumbsWrap ownerState={ownerState}>
                <Breadcrumbs links={breadcrumbs} />
              </BreadcrumbsWrap>
            ) : null}

            {!!featuredMedia && (
              <FeaturedMediaWrap {...sidekick(sidekickLookup, 'featuredMedia')} ownerState={ownerState}>
                <FeaturedMedia {...(featuredMedia as MediaProps)} ownerState={ownerState} />
              </FeaturedMediaWrap>
            )}

            {!!body && (
              <Body
                body={body}
                sidekickLookup={sidekickLookup}
                {...props}
                variant="inline"
                __typename="RichText"
                ownerState={ownerState}
              />
            )}

            <ShareLinksWrap ownerState={ownerState}>
              <ShareLinksLabel ownerState={ownerState}>Share</ShareLinksLabel>

              <ShareLinks ownerState={ownerState}>
                <ShareLink ownerState={ownerState}>
                  <ShareLinkItem
                    __typename="Link"
                    href={`http://www.twitter.com/share?url=${encodedShareUrl}`}
                    target="_blank"
                    icon={TwitterIcon}
                    text="Twitter"
                    ownerState={ownerState}
                  />
                </ShareLink>

                <ShareLink ownerState={ownerState}>
                  <ShareLinkItem
                    __typename="Link"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
                    target="_blank"
                    icon={FacebookIcon}
                    text="Facebook"
                    ownerState={ownerState}
                  />
                </ShareLink>

                <ShareLink ownerState={ownerState}>
                  <ShareLinkItem
                    __typename="Link"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`}
                    target="_blank"
                    icon={LinkedinIcon}
                    text="Linkedin"
                    ownerState={ownerState}
                  />
                </ShareLink>

                <ShareLink ownerState={ownerState}>
                  <ShareLinkItem
                    __typename="Link"
                    href={`mailto:?to=&body=${encodedShareUrl}`}
                    target="_blank"
                    icon={EmailIcon}
                    text="Email"
                    ownerState={ownerState}
                  />
                </ShareLink>

                <ShareLink ownerState={ownerState}>
                  <ShareLinkItem
                    __typename="Link"
                    target="_blank"
                    icon={CopyLinkIcon}
                    text="Copy Link"
                    ownerState={ownerState}
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                    }}
                  />
                </ShareLink>
              </ShareLinks>
            </ShareLinksWrap>
          </ContentWrap>

          {/* TODO: Return a collection */}
          {!!relatedItems && (
            <RelatedItemsWrap ownerState={ownerState}>
              <RelatedItems {...relatedItems} ownerState={ownerState} />
            </RelatedItemsWrap>
          )}

          {!!author && (
            <AuthorWrap ownerState={ownerState}>
              {(!!author.mainImage || !!author.name) && (
                <Author ownerState={ownerState}>
                  {!!author.mainImage && (
                    <Avatar ownerState={ownerState}>
                      <AvatarImage {...author.mainImage} ownerState={ownerState} />
                    </Avatar>
                  )}

                  {!!author.name && <AuthorName ownerState={ownerState}>{author.name}</AuthorName>}
                </Author>
              )}

              {!!author.body && <AuthorSummary body={author.body} __typename="RichText" ownerState={ownerState} />}

              {!!author.socialLinks?.length && (
                <AuthorSocialLinks ownerState={ownerState}>
                  {author.socialLinks.map((link, index) => (
                    <AuthorSocialLink
                      key={`author-social-link-${index}=${link?.href}`}
                      {...(link as LinkProps)}
                      ownerState={ownerState}
                    />
                  ))}
                </AuthorSocialLinks>
              )}
            </AuthorWrap>
          )}
        </ContentOuterGrid>
      </Root>

      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};

const Root = styled(Box, {
  name: 'Page',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: BlogOwnerState }>``;

const ContentOuterGrid = styled(Grid, {
  name: 'Blog',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: BlogOwnerState }>``;

const HeaderWrap = styled(Box, {
  name: 'Blog',
  slot: 'HeaderWrap',
  overridesResolver: (_, styles) => [styles.headerWrap]
})<{ ownerState: BlogOwnerState }>``;

const BreadcrumbsWrap = styled(Box, {
  name: 'Blog',
  slot: 'BreadcrumbsWrap',
  overridesResolver: (_, styles) => [styles.breadcrumbsWrap]
})<{ ownerState: BlogOwnerState }>``;

const Title = styled(Typography, {
  name: 'Blog',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})<TypographyProps & { ownerState: BlogOwnerState }>``;

const PubDate = styled(Typography, {
  name: 'Blog',
  slot: 'PubDate',
  overridesResolver: (_, styles) => [styles.pubDate]
})<TypographyProps & { ownerState: BlogOwnerState }>``;

const Author = styled(Box, {
  name: 'Blog',
  slot: 'Author',
  overridesResolver: (_, styles) => [styles.author]
})<{ ownerState: BlogOwnerState }>``;

const Avatar = styled(MuiAvatar, {
  name: 'Blog',
  slot: 'Avatar',
  overridesResolver: (_, styles) => [styles.avatar]
})<{ ownerState: BlogOwnerState }>``;

const AvatarImage = styled(ContentModule, {
  name: 'Blog',
  slot: 'AvatarImage',
  overridesResolver: (_, styles) => [styles.avatarImage]
})<{ ownerState: BlogOwnerState }>``;

const AuthorName = styled(Typography, {
  name: 'Blog',
  slot: 'AuthorName',
  overridesResolver: (_, styles) => [styles.authorName]
})<{ ownerState: BlogOwnerState }>``;

const FeaturedMediaWrap = styled(Box, {
  name: 'Blog',
  slot: 'FeaturedMediaWrap',
  overridesResolver: (_, styles) => [styles.featuredMediaWrap]
})<{ ownerState: BlogOwnerState }>``;

const FeaturedMedia = styled(ContentModule, {
  name: 'Blog',
  slot: 'FeaturedMedia',
  overridesResolver: (_, styles) => [styles.featuredMedia]
})<{ ownerState: BlogOwnerState }>``;

const ShareLinksWrap = styled(Box, {
  name: 'Blog',
  slot: 'ShareLinksWrap',
  overridesResolver: (_, styles) => [styles.shareLinksWrap]
})<{ ownerState: BlogOwnerState }>``;

const ShareLinksLabel = styled(Typography, {
  name: 'Blog',
  slot: 'ShareLinksLabel',
  overridesResolver: (_, styles) => [styles.shareLinksLabel]
})<{ ownerState: BlogOwnerState }>``;

const ShareLinks = styled(List, {
  name: 'Blog',
  slot: 'ShareLinks',
  overridesResolver: (_, styles) => [styles.shareLinks]
})<{ ownerState: BlogOwnerState }>``;

const ShareLink = styled(ListItem, {
  name: 'Blog',
  slot: 'ShareLShareLinkinks',
  overridesResolver: (_, styles) => [styles.shareLink]
})<{ ownerState: BlogOwnerState }>``;

const ShareLinkItem = styled(ContentModule, {
  name: 'Blog',
  slot: 'ShareLinkItem',
  overridesResolver: (_, styles) => [styles.shareLinkItem]
})<{ href?: string; target?: string; onClick?: any; ownerState: BlogOwnerState }>``;

const ContentWrap = styled(Box, {
  name: 'Blog',
  slot: 'ContentWrap',
  overridesResolver: (_, styles) => [styles.contentWrap]
})<{ ownerState: BlogOwnerState }>``;

const Body = styled(ContentModule, {
  name: 'Blog',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})<{ ownerState: BlogOwnerState }>``;

const RelatedItemsWrap = styled(Box, {
  name: 'Blog',
  slot: 'RelatedItemsWrap',
  overridesResolver: (_, styles) => [styles.relatedItemsWrap]
})<{ ownerState: BlogOwnerState }>``;

const RelatedItems = styled(ContentModule, {
  name: 'Blog',
  slot: 'RelatedItems',
  overridesResolver: (_, styles) => [styles.relatedItems]
})<{ ownerState: BlogOwnerState }>``;

const AuthorWrap = styled(Box, {
  name: 'Blog',
  slot: 'AuthorWrap',
  overridesResolver: (_, styles) => [styles.authorWrap]
})<{ ownerState: BlogOwnerState }>``;

const AuthorSummary = styled(ContentModule, {
  name: 'Blog',
  slot: 'AuthorSummary',
  overridesResolver: (_, styles) => [styles.authorSummary]
})<{ ownerState: BlogOwnerState }>``;

const AuthorSocialLinks = styled(Box, {
  name: 'Blog',
  slot: 'AuthorSocialLinks',
  overridesResolver: (_, styles) => [styles.authorSocialLinks]
})<{ ownerState: BlogOwnerState }>``;

const AuthorSocialLink = styled(ContentModule, {
  name: 'Blog',
  slot: 'AuthorSocialLink',
  overridesResolver: (_, styles) => [styles.AuthorSocialLink]
})<{ ownerState: BlogOwnerState }>``;

export default Blog;
