import React from 'react';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

import Grid from '../Grid';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';
import Background from '../Background';

import { layoutConfig } from './Collection.theme';

import { type CollectionProps, type CollectionOwnerState } from './Collection.types';

const Collection = (props: CollectionProps) => {
  const ownerState = { ...props };

  const {
    backgroundImage,
    backgroundColor,
    items,
    variant = 'threePerRow',
    itemsAspectRatio,
    itemsVariant,
    sidekickLookup,
    introText
  } = props;

  return (
    <ErrorBoundary>
      <Root ownerState={ownerState} {...sidekick(sidekickLookup)} data-testid={`Collection-${variant}`}>
        <CollectionBackground
          background={backgroundImage}
          backgroundColor={backgroundColor}
          testId="Collection-background"
        />

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
                  backgroundColor={backgroundColor}
                  key={item?.id}
                  {...item}
                  layoutConfig={layoutConfig}
                  gridLayout={variant}
                  variant={itemsVariant ?? item?.variant}
                  aspectRatio={itemsAspectRatio ?? item?.aspectRatio}
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

const CollectionBackground = styled(Background, {
  name: 'Collection',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

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
