import React from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

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

import type { PageResourceProps, PageResourceOwnerState } from './PageResource.types';
import { type MediaProps } from '../Media';
import { type LinkProps } from '../Link';

const PageResource = (props: PageResourceProps) => {
  const ownerState = { ...props };

  const {
    id,
    header,
    footer,
    // featuredMedia,
    // pubDate,
    title,
    body,
    // author,
    // relatedItems,
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
      {!!jsonLd && (
        <Script type="application/ld+json" id={`pageresource-${id}-jsonld`}>
          {jsonLd}
        </Script>
      )}

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
              </>
            )}
          </HeaderWrap>

          <ContentWrap ownerState={ownerState}>
            {!!breadcrumbs?.length ? (
              <BreadcrumbsWrap ownerState={ownerState}>
                <Breadcrumbs links={breadcrumbs} />
              </BreadcrumbsWrap>
            ) : null}

            {!!body && (
              <Body
                body={body}
                sidekickLookup={sidekickLookup}
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
})<{ ownerState: PageResourceOwnerState }>``;

const ContentOuterGrid = styled(Grid, {
  name: 'PageResource',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: PageResourceOwnerState }>``;

const HeaderWrap = styled(Box, {
  name: 'PageResource',
  slot: 'HeaderWrap',
  overridesResolver: (_, styles) => [styles.headerWrap]
})<{ ownerState: PageResourceOwnerState }>``;

const BreadcrumbsWrap = styled(Box, {
  name: 'PageResource',
  slot: 'BreadcrumbsWrap',
  overridesResolver: (_, styles) => [styles.breadcrumbsWrap]
})<{ ownerState: PageResourceOwnerState }>``;

const Title = styled(Typography, {
  name: 'PageResource',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})<TypographyProps & { ownerState: PageResourceOwnerState }>``;

const PubDate = styled(Typography, {
  name: 'PageResource',
  slot: 'PubDate',
  overridesResolver: (_, styles) => [styles.pubDate]
})<TypographyProps & { ownerState: PageResourceOwnerState }>``;

const Author = styled(Box, {
  name: 'PageResource',
  slot: 'Author',
  overridesResolver: (_, styles) => [styles.author]
})<{ ownerState: PageResourceOwnerState }>``;

const AuthorImageWrap = styled(Box, {
  name: 'PageResource',
  slot: 'AuthorImageWrap',
  overridesResolver: (_, styles) => [styles.authorImageWrap]
})<{ ownerState: PageResourceOwnerState }>``;

const AuthorImage = styled(ContentModule, {
  name: 'PageResource',
  slot: 'AuthorImage',
  overridesResolver: (_, styles) => [styles.authorImage]
})<{ ownerState: PageResourceOwnerState }>``;

const AuthorName = styled(Typography, {
  name: 'PageResource',
  slot: 'AuthorName',
  overridesResolver: (_, styles) => [styles.authorName]
})<{ ownerState: PageResourceOwnerState }>``;

const FeaturedMediaWrap = styled(Box, {
  name: 'PageResource',
  slot: 'FeaturedMediaWrap',
  overridesResolver: (_, styles) => [styles.featuredMediaWrap]
})<{ ownerState: PageResourceOwnerState }>``;

const FeaturedMedia = styled(ContentModule, {
  name: 'PageResource',
  slot: 'FeaturedMedia',
  overridesResolver: (_, styles) => [styles.featuredMedia]
})<{ ownerState: PageResourceOwnerState }>``;

const ShareLinksWrap = styled(Box, {
  name: 'PageResource',
  slot: 'ShareLinksWrap',
  overridesResolver: (_, styles) => [styles.shareLinksWrap]
})<{ ownerState: PageResourceOwnerState }>``;

const ShareLinksLabel = styled(Typography, {
  name: 'PageResource',
  slot: 'ShareLinksLabel',
  overridesResolver: (_, styles) => [styles.shareLinksLabel]
})<{ ownerState: PageResourceOwnerState }>``;

const ShareLinks = styled(List, {
  name: 'PageResource',
  slot: 'ShareLinks',
  overridesResolver: (_, styles) => [styles.shareLinks]
})<{ ownerState: PageResourceOwnerState }>``;

const ShareLink = styled(ListItem, {
  name: 'PageResource',
  slot: 'ShareLShareLinkinks',
  overridesResolver: (_, styles) => [styles.shareLink]
})<{ ownerState: PageResourceOwnerState }>``;

const ShareLinkItem = styled(ContentModule, {
  name: 'PageResource',
  slot: 'ShareLinkItem',
  overridesResolver: (_, styles) => [styles.shareLinkItem]
})<{ href?: string; target?: string; onClick?: any; ownerState: PageResourceOwnerState }>``;

const ContentWrap = styled(Box, {
  name: 'PageResource',
  slot: 'ContentWrap',
  overridesResolver: (_, styles) => [styles.contentWrap]
})<{ ownerState: PageResourceOwnerState }>``;

const Body = styled(ContentModule, {
  name: 'PageResource',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})<{ ownerState: PageResourceOwnerState }>``;

const RelatedItemsWrap = styled(Box, {
  name: 'PageResource',
  slot: 'RelatedItemsWrap',
  overridesResolver: (_, styles) => [styles.relatedItemsWrap]
})<{ ownerState: PageResourceOwnerState }>``;

const RelatedItems = styled(ContentModule, {
  name: 'PageResource',
  slot: 'RelatedItems',
  overridesResolver: (_, styles) => [styles.relatedItems]
})<{ ownerState: PageResourceOwnerState }>``;

const AuthorWrap = styled(Grid, {
  name: 'PageResource',
  slot: 'AuthorWrap',
  overridesResolver: (_, styles) => [styles.authorWrap]
})<{ ownerState: PageResourceOwnerState }>``;

const AuthorSummaryWrap = styled(Box, {
  name: 'PageResource',
  slot: 'AuthorSummaryWrap',
  overridesResolver: (_, styles) => [styles.authorSummaryWrap]
})<{ ownerState: PageResourceOwnerState }>``;

const AuthorSummary = styled(ContentModule, {
  name: 'PageResource',
  slot: 'AuthorSummary',
  overridesResolver: (_, styles) => [styles.authorSummary]
})<{ ownerState: PageResourceOwnerState }>``;

const AuthorSocialLinks = styled(Box, {
  name: 'PageResource',
  slot: 'AuthorSocialLinks',
  overridesResolver: (_, styles) => [styles.authorSocialLinks]
})<{ ownerState: PageResourceOwnerState }>``;

const AuthorSocialLink = styled(ContentModule, {
  name: 'PageResource',
  slot: 'AuthorSocialLink',
  overridesResolver: (_, styles) => [styles.AuthorSocialLink]
})<{ ownerState: PageResourceOwnerState }>``;

export default PageResource;
