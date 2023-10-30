import React from 'react';
import Script from 'next/script';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography, { type TypographyProps } from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import ContentModule from '../ContentModule';
import Grid from '../Grid';

import { formatAddress } from '../utils/formatAddress';

import type { PropertyProps, PropertyOwnerState } from './Property.types';

const Property = (props: PropertyProps) => {
  const ownerState = { ...props, backgroundColor: 'lightGray' };
  const {
    id,
    assetType,
    address,
    squareFootage,
    imageCarousel,
    header,
    footer,
    name,
    body,
    breadcrumbs,
    jsonLd,
    sidekickLookup,
    dateAcquired,
    dateSold,
    market,
    ncreifRegion,
    strategy,
    sector,
    featuredAssets,
    hero
  } = props;

  return (
    <>
      {!!jsonLd && (
        <Script type="application/ld+json" id={`property-${id}-jsonld`}>
          {jsonLd}
        </Script>
      )}

      {hero ? <ContentModule {...(hero as any)} header={header} breadcrumbs={breadcrumbs} /> : null}

      <Root component="main" {...sidekick(sidekickLookup)} ownerState={ownerState}>
        <ContentOuterGrid ownerState={ownerState}>
          <SideContentWrap ownerState={ownerState}>
            <SideContentInnerWrap ownerState={ownerState}>
              {!!body && (
                <>
                  <BodyHeader variant="overline" ownerState={ownerState}>
                    Opportunity
                  </BodyHeader>
                  <Body
                    body={body}
                    sidekickLookup={sidekickLookup}
                    {...props}
                    variant="inline"
                    __typename="RichText"
                    ownerState={ownerState}
                  />
                </>
              )}
            </SideContentInnerWrap>
          </SideContentWrap>
          <ContentWrap ownerState={ownerState}>
            <BodyList ownerState={ownerState}>
              <BodyListItem ownerState={ownerState}>
                <ListLabel>Tags:</ListLabel>
                <ListValue>
                  {ncreifRegion} {strategy} {sector}
                </ListValue>
              </BodyListItem>

              <BodyListItem ownerState={ownerState}>
                <ListLabel>Property Name:</ListLabel>
                <ListValue>{!!name ? name : 'N/A'}</ListValue>
              </BodyListItem>

              <BodyListItem ownerState={ownerState}>
                <ListLabel>Location:</ListLabel>
                <ListValue>{!!address ? formatAddress(address) : 'N/A'}</ListValue>
              </BodyListItem>

              <BodyListItem ownerState={ownerState}>
                <ListLabel>Size:</ListLabel>
                <ListValue>{!!squareFootage ? `${squareFootage} SF` : 'N/A'}</ListValue>
              </BodyListItem>

              <BodyListItem ownerState={ownerState}>
                <ListLabel>Date Acquired:</ListLabel>
                <ListValue>{!!dateAcquired ? dateAcquired : 'N/A'}</ListValue>
              </BodyListItem>

              <BodyListItem ownerState={ownerState}>
                <ListLabel>Date Sold:</ListLabel>
                <ListValue>{!!dateSold ? dateSold : 'N/A'}</ListValue>
              </BodyListItem>

              <BodyListItem ownerState={ownerState}>
                <ListLabel>Market:</ListLabel>
                <ListValue>{!!market ? market : 'N/A'}</ListValue>
              </BodyListItem>

              <BodyListItem ownerState={ownerState}>
                <ListLabel>Fund Strategy:</ListLabel>
                <ListValue>{!!strategy ? strategy : 'N/A'}</ListValue>
              </BodyListItem>

              <BodyListItem ownerState={ownerState}>
                <ListLabel>Asset Type:</ListLabel>
                <ListValue>{!!assetType ? assetType : 'N/A'}</ListValue>
              </BodyListItem>
            </BodyList>
          </ContentWrap>
        </ContentOuterGrid>

        {!!imageCarousel && <ContentModule {...imageCarousel} />}

        {!!featuredAssets && <ContentModule {...featuredAssets} />}
      </Root>

      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};

const Root = styled(Box, {
  name: 'Property',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: PropertyOwnerState }>``;

const ContentOuterGrid = styled(Grid, {
  name: 'Property',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: PropertyOwnerState }>``;

const ContentWrap = styled(Box, {
  name: 'Property',
  slot: 'ContentWrap',
  overridesResolver: (_, styles) => [styles.contentWrap]
})<{ ownerState: PropertyOwnerState }>``;

const Body = styled(ContentModule, {
  name: 'Property',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})<{ ownerState: PropertyOwnerState }>``;

const SideContentWrap = styled(Box, {
  name: 'Property',
  slot: 'SideContentWrap',
  overridesResolver: (_, styles) => [styles.sideContentWrap]
})<{ ownerState: PropertyOwnerState }>``;

const SideContentInnerWrap = styled(Box, {
  name: 'Property',
  slot: 'SideContentInnerWrap',
  overridesResolver: (_, styles) => [styles.sideContentInnerWrap]
})<{ ownerState: PropertyOwnerState }>``;

const BodyHeader = styled(Typography, {
  name: 'Property',
  slot: 'BodyHeader',
  overridesResolver: (_, styles) => [styles.bodyHeader]
})<TypographyProps & { ownerState: PropertyOwnerState }>``;

const BodyList = styled(List, {
  name: 'Property',
  slot: 'BodyList',
  overridesResolver: (_, styles) => [styles.bodyList]
})<{ ownerState: PropertyOwnerState }>``;

const BodyListItem = styled(ListItem, {
  name: 'Property',
  slot: 'BodyListItem',
  overridesResolver: (_, styles) => [styles.bodyListItem]
})<{ ownerState: PropertyOwnerState }>``;

const ListLabel = styled(Box, {
  name: 'Property',
  slot: 'ListLabel',
  overridesResolver: (_, styles) => [styles.listLabel]
})<{ ownerState?: PropertyOwnerState }>``;

const ListValue = styled(Box, {
  name: 'Property',
  slot: 'ListValue',
  overridesResolver: (_, styles) => [styles.listLabel]
})<{ ownerState?: PropertyOwnerState }>``;

export default Property;
