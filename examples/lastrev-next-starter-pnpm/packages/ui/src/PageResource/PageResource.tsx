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
    subNavigation,
    contents,
    featuredMedia,
    title,
    body,
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
      {!!jsonLd && (
        <Script type="application/ld+json" id={`pageresource-${id}-jsonld`}>
          {jsonLd}
        </Script>
      )}

      {header ? <ContentModule {...(header as any)} /> : null}
      {hero ? <ContentModule {...(hero as any)} /> : null}
      <Root component="main" {...sidekick(sidekickLookup)} ownerState={ownerState}>
        {subNavigation ? <ContentModule {...(subNavigation as any)} /> : null}
        {featuredMedia || body ? (
          <ContentOuterGrid ownerState={ownerState}>
            <ContentWrap ownerState={ownerState}>
              {/* {title ? (
              <HeaderWrap ownerState={ownerState}>
                <Title component="h1" variant="display1" ownerState={ownerState}>
                  {title}
                </Title>
              </HeaderWrap>
            ) : null} */}
              {!!featuredMedia && (
                <FeaturedMediaWrap {...sidekick(sidekickLookup, 'featuredMedia')} ownerState={ownerState}>
                  <FeaturedMedia {...(featuredMedia as MediaProps)} ownerState={ownerState} />
                </FeaturedMediaWrap>
              )}

              {!!body && (
                <Body
                  body={body}
                  sidekickLookup={sidekickLookup}
                  variant="inline"
                  __typename="RichText"
                  ownerState={ownerState}
                />
              )}
            </ContentWrap>
          </ContentOuterGrid>
        ) : null}

        {contents?.length > 0 &&
          contents?.map((content: any) => <ContentModule key={content?.id} {...content} component="section" />)}

        {!!relatedItems && <RelatedItems {...relatedItems} ownerState={ownerState} backgroundColor="white" />}
      </Root>

      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};

const Root = styled(Box, {
  name: 'PageResource',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: PageResourceOwnerState }>``;

const ContentOuterGrid = styled(Grid, {
  name: 'PageResource',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: PageResourceOwnerState }>``;

const ContentsOuterGrid = styled(Grid, {
  name: 'PageResource',
  slot: 'ContentsOuterGrid',
  overridesResolver: (_, styles) => [styles.contentsOuterGrid]
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

const Subtitle = styled(Typography, {
  name: 'PageResource',
  slot: 'Subtitle',
  overridesResolver: (_, styles) => [styles.subtitle]
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

const SideWrap = styled(Box, {
  name: 'PageResource',
  slot: 'SideWrap',
  overridesResolver: (_, styles) => [styles.sideWrap]
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

const AuthorWrap = styled(Box, {
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
