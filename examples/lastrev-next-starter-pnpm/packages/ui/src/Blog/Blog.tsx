import React from 'react';
import Script from 'next/script';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography, { type TypographyProps } from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import ContentModule from '../ContentModule';
import Grid from '../Grid';

import type { BlogProps, BlogOwnerState } from './Blog.types';

const Blog = (props: BlogProps) => {
  const ownerState = { ...props, backgroundColor: 'lightGray' };
  const { id, relatedItems, header, footer, title, body, breadcrumbs, jsonLd, sidekickLookup, hero } = props;

  return (
    <>
      {!!jsonLd && (
        <Script type="application/ld+json" id={`blog-${id}-jsonld`}>
          {jsonLd}
        </Script>
      )}

      {hero ? <ContentModule {...(hero as any)} header={header} breadcrumbs={breadcrumbs} /> : null}

      <Root component="main" {...sidekick(sidekickLookup)} ownerState={ownerState}>
        <ContentOuterGrid ownerState={ownerState}>
          <SideContentWrap ownerState={ownerState}>
            <SideContentInnerWrap ownerState={ownerState}>
              <DetailsLabel variant="overline" ownerState={ownerState}>
                Media Contact
              </DetailsLabel>

              {!!title && (
                <Title variant="h5" {...sidekick(sidekickLookup, 'name')} ownerState={ownerState}>
                  {title}
                </Title>
              )}
            </SideContentInnerWrap>
          </SideContentWrap>
          <ContentWrap ownerState={ownerState}>
            <BodyHeader variant="h5" ownerState={ownerState}>
              {title}
            </BodyHeader>

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

          {!!relatedItems && <ContentModule {...relatedItems} />}
        </ContentOuterGrid>
      </Root>

      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};

const Root = styled(Box, {
  name: 'Blog',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: BlogOwnerState }>``;

const ContentOuterGrid = styled(Grid, {
  name: 'Blog',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: BlogOwnerState }>``;

const DetailsLabel = styled(Typography, {
  name: 'Blog',
  slot: 'DetailsLabel',
  overridesResolver: (_, styles) => [styles.detailsLabel]
})<TypographyProps & { ownerState: BlogOwnerState }>``;

const Title = styled(Typography, {
  name: 'Blog',
  slot: 'Name',
  overridesResolver: (_, styles) => [styles.title]
})<TypographyProps & { ownerState: BlogOwnerState }>``;

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

const SideContentWrap = styled(Box, {
  name: 'Blog',
  slot: 'SideContentWrap',
  overridesResolver: (_, styles) => [styles.sideContentWrap]
})<{ ownerState: BlogOwnerState }>``;

const SideContentInnerWrap = styled(Box, {
  name: 'Blog',
  slot: 'SideContentInnerWrap',
  overridesResolver: (_, styles) => [styles.sideContentInnerWrap]
})<{ ownerState: BlogOwnerState }>``;

const BodyHeader = styled(Typography, {
  name: 'Blog',
  slot: 'BodyHeader',
  overridesResolver: (_, styles) => [styles.bodyHeader]
})<TypographyProps & { ownerState: BlogOwnerState }>``;

export default Blog;
