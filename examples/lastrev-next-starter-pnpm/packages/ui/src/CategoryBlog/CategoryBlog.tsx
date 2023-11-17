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

import type { CategoryBlogProps, CategoryBlogOwnerState } from './CategoryCategoryBlog.types';
import { type MediaProps } from '../Media';
import { type LinkProps } from '../Link';

const CategoryBlog = (props: CategoryBlogProps) => {
  const ownerState = { ...props };

  const {
    id,
    header,
    footer,
    subNavigation,
    contents,
    sidebarContents,
    featuredMedia,
    title,
    subtitle,
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
      {!!jsonLd && (
        <Script type="application/ld+json" id={`categoryblog-${id}-jsonld`}>
          {jsonLd}
        </Script>
      )}

      {header ? <ContentModule {...(header as any)} /> : null}
      {hero ? <ContentModule {...(hero as any)} /> : null}
      <Root component="main" {...sidekick(sidekickLookup)} ownerState={ownerState}>
        {subNavigation ? <ContentModule {...(subNavigation as any)} /> : null}

        {contents?.map((content: any) => (
          <ContentModule key={content?.id} {...content} component="section" />
        ))}

        {!!relatedItems && <RelatedItems {...relatedItems} ownerState={ownerState} backgroundColor="white" />}
      </Root>

      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};

const Root = styled(Box, {
  name: 'CategoryBlog',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: CategoryBlogOwnerState }>``;

const ContentOuterGrid = styled(Grid, {
  name: 'CategoryBlog',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: CategoryBlogOwnerState }>``;

const ContentsOuterGrid = styled(Grid, {
  name: 'CategoryBlog',
  slot: 'ContentsOuterGrid',
  overridesResolver: (_, styles) => [styles.contentsOuterGrid]
})<{ ownerState: CategoryBlogOwnerState }>``;

const HeaderWrap = styled(Box, {
  name: 'CategoryBlog',
  slot: 'HeaderWrap',
  overridesResolver: (_, styles) => [styles.headerWrap]
})<{ ownerState: CategoryBlogOwnerState }>``;

const BreadcrumbsWrap = styled(Box, {
  name: 'CategoryBlog',
  slot: 'BreadcrumbsWrap',
  overridesResolver: (_, styles) => [styles.breadcrumbsWrap]
})<{ ownerState: CategoryBlogOwnerState }>``;

const Title = styled(Typography, {
  name: 'CategoryBlog',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})<TypographyProps & { ownerState: CategoryBlogOwnerState }>``;

const Subtitle = styled(Typography, {
  name: 'CategoryBlog',
  slot: 'Subtitle',
  overridesResolver: (_, styles) => [styles.subtitle]
})<TypographyProps & { ownerState: CategoryBlogOwnerState }>``;

const Author = styled(Box, {
  name: 'CategoryBlog',
  slot: 'Author',
  overridesResolver: (_, styles) => [styles.author]
})<{ ownerState: CategoryBlogOwnerState }>``;

const AuthorImageWrap = styled(Box, {
  name: 'CategoryBlog',
  slot: 'AuthorImageWrap',
  overridesResolver: (_, styles) => [styles.authorImageWrap]
})<{ ownerState: CategoryBlogOwnerState }>``;

const AuthorImage = styled(ContentModule, {
  name: 'CategoryBlog',
  slot: 'AuthorImage',
  overridesResolver: (_, styles) => [styles.authorImage]
})<{ ownerState: CategoryBlogOwnerState }>``;

const AuthorName = styled(Typography, {
  name: 'CategoryBlog',
  slot: 'AuthorName',
  overridesResolver: (_, styles) => [styles.authorName]
})<{ ownerState: CategoryBlogOwnerState }>``;

const FeaturedMediaWrap = styled(Box, {
  name: 'CategoryBlog',
  slot: 'FeaturedMediaWrap',
  overridesResolver: (_, styles) => [styles.featuredMediaWrap]
})<{ ownerState: CategoryBlogOwnerState }>``;

const FeaturedMedia = styled(ContentModule, {
  name: 'CategoryBlog',
  slot: 'FeaturedMedia',
  overridesResolver: (_, styles) => [styles.featuredMedia]
})<{ ownerState: CategoryBlogOwnerState }>``;

const ShareLinksWrap = styled(Box, {
  name: 'CategoryBlog',
  slot: 'ShareLinksWrap',
  overridesResolver: (_, styles) => [styles.shareLinksWrap]
})<{ ownerState: CategoryBlogOwnerState }>``;

const ShareLinksLabel = styled(Typography, {
  name: 'CategoryBlog',
  slot: 'ShareLinksLabel',
  overridesResolver: (_, styles) => [styles.shareLinksLabel]
})<{ ownerState: CategoryBlogOwnerState }>``;

const ShareLinks = styled(List, {
  name: 'CategoryBlog',
  slot: 'ShareLinks',
  overridesResolver: (_, styles) => [styles.shareLinks]
})<{ ownerState: CategoryBlogOwnerState }>``;

const ShareLink = styled(ListItem, {
  name: 'CategoryBlog',
  slot: 'ShareLShareLinkinks',
  overridesResolver: (_, styles) => [styles.shareLink]
})<{ ownerState: CategoryBlogOwnerState }>``;

const ShareLinkItem = styled(ContentModule, {
  name: 'CategoryBlog',
  slot: 'ShareLinkItem',
  overridesResolver: (_, styles) => [styles.shareLinkItem]
})<{ href?: string; target?: string; onClick?: any; ownerState: CategoryBlogOwnerState }>``;

const ContentWrap = styled(Box, {
  name: 'CategoryBlog',
  slot: 'ContentWrap',
  overridesResolver: (_, styles) => [styles.contentWrap]
})<{ ownerState: CategoryBlogOwnerState }>``;

const SideWrap = styled(Box, {
  name: 'CategoryBlog',
  slot: 'SideWrap',
  overridesResolver: (_, styles) => [styles.sideWrap]
})<{ ownerState: CategoryBlogOwnerState }>``;

const Body = styled(ContentModule, {
  name: 'CategoryBlog',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})<{ ownerState: CategoryBlogOwnerState }>``;

const RelatedItemsWrap = styled(Box, {
  name: 'CategoryBlog',
  slot: 'RelatedItemsWrap',
  overridesResolver: (_, styles) => [styles.relatedItemsWrap]
})<{ ownerState: CategoryBlogOwnerState }>``;

const RelatedItems = styled(ContentModule, {
  name: 'CategoryBlog',
  slot: 'RelatedItems',
  overridesResolver: (_, styles) => [styles.relatedItems]
})<{ ownerState: CategoryBlogOwnerState }>``;

const AuthorWrap = styled(Box, {
  name: 'CategoryBlog',
  slot: 'AuthorWrap',
  overridesResolver: (_, styles) => [styles.authorWrap]
})<{ ownerState: CategoryBlogOwnerState }>``;

const AuthorSummaryWrap = styled(Box, {
  name: 'CategoryBlog',
  slot: 'AuthorSummaryWrap',
  overridesResolver: (_, styles) => [styles.authorSummaryWrap]
})<{ ownerState: CategoryBlogOwnerState }>``;

const AuthorSummary = styled(ContentModule, {
  name: 'CategoryBlog',
  slot: 'AuthorSummary',
  overridesResolver: (_, styles) => [styles.authorSummary]
})<{ ownerState: CategoryBlogOwnerState }>``;

const AuthorSocialLinks = styled(Box, {
  name: 'CategoryBlog',
  slot: 'AuthorSocialLinks',
  overridesResolver: (_, styles) => [styles.authorSocialLinks]
})<{ ownerState: CategoryBlogOwnerState }>``;

const AuthorSocialLink = styled(ContentModule, {
  name: 'CategoryBlog',
  slot: 'AuthorSocialLink',
  overridesResolver: (_, styles) => [styles.AuthorSocialLink]
})<{ ownerState: CategoryBlogOwnerState }>``;

export default CategoryBlog;
