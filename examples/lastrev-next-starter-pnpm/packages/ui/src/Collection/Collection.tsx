import React from 'react';

import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import type { CollectionProps, CollectionOwnerState } from './Collection.types';
import Grid from '../Grid';

export const Collection = (props: CollectionProps) => {
  const { items, variant, itemsVariant, sidekickLookup, introText } = props;
  const ownerState = { ...props };
  return (
    <ErrorBoundary>
      <Root
        // sx={{ containerType: 'inline-size' }}
        data-testid={`Collection-${variant}`}
        ownerState={ownerState}
        {...sidekick(sidekickLookup)}>
        {introText && (
          <IntroTextGrid ownerState={ownerState}>
            <IntroText
              ownerState={ownerState}
              {...sidekick(sidekickLookup, 'introText')}
              {...introText}
              variant="introText"
            />
          </IntroTextGrid>
        )}
        <ContentGrid ownerState={ownerState}>
          {!!items?.length && (
            <ItemsGrid ownerState={ownerState} id="items">
              {items?.map((item, index) => (
                <Item
                  ownerState={ownerState}
                  // @ts-ignore: TODO: ID not recognized
                  key={item?.id}
                  {...item}
                  // @ts-ignore: TODO: Variant does not exist on Section
                  variant={itemsVariant ?? item?.variant}
                  position={index + 1}
                />
              ))}
            </ItemsGrid>
          )}
        </ContentGrid>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Collection',
  slot: 'Root',
  overridesResolver: ({ ownerState }, styles) => [styles.root, styles[`${ownerState?.variant}`]]
})<{ ownerState: CollectionOwnerState }>``;

const ContentGrid = styled(Grid, {
  name: 'Collection',
  slot: 'ContentGrid',
  overridesResolver: (_, styles) => [styles.contentGrid]
})<{ ownerState: CollectionOwnerState }>``;

const IntroTextGrid = styled(Grid, {
  name: 'Collection',
  slot: 'IntroTextGrid',
  overridesResolver: (_, styles) => [styles.introTextGrid]
})<{ ownerState: CollectionOwnerState }>``;

const IntroText = styled(ContentModule, {
  name: 'Collection',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState: CollectionOwnerState }>``;

const ItemsGrid = styled(Box, {
  name: 'Collection',
  slot: 'ItemsGrid',
  overridesResolver: (_, styles) => [styles.itemsGrid, styles.itemsContainerOnePerRow]
})<{ ownerState: CollectionOwnerState }>``;

const Item = styled(ContentModule, {
  name: 'Collection',
  slot: 'Item',
  overridesResolver: (_, styles) => [styles.item]
})<{ ownerState: CollectionOwnerState }>``;

export default Collection;
