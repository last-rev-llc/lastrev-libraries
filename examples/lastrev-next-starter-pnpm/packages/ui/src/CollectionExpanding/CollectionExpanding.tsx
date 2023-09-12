import React from 'react';

import styled from '@mui/system/styled';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import { CollectionExpandingProps } from './CollectionExpanding.types';

export const CollectionExpanding = ({
  items,
  itemsWidth,
  variant,
  itemsVariant,
  sidekickLookup,
  introText,
  ...props
}: CollectionExpandingProps) => {
  return (
    <ErrorBoundary>
      <Root
        variant={variant}
        itemsVariant={itemsVariant}
        data-testid={`CollectionExpanding-${variant}`}
        {...props}
        {...sidekick(sidekickLookup)}>
        {introText && (
          <Container>
            <IntroText
              {...introText}
              {...sidekick(sidekickLookup, 'introText')}
              data-testid="CollectionExpanding-introText"
            />
          </Container>
        )}
        <ContentContainer>
          {!!items?.length && (
            <ItemsContainer id="items">
              {items?.map((item, index) => (
                <Item
                  // @ts-ignore: TODO: ID not recognized
                  key={item?.id}
                  {...item}
                  // @ts-ignore: TODO: Variant does not exist on Section
                  variant={itemsVariant ?? item?.variant}
                  position={index + 1}
                />
              ))}
            </ItemsContainer>
          )}
        </ContentContainer>
      </Root>
    </ErrorBoundary>
  );
};

const shouldForwardProp = (prop: string) => prop !== 'variant' && prop !== 'itemsVariant';

const Root = styled(Box, {
  name: 'CollectionExpanding',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string; itemsVariant?: string }>``;

const ContentContainer = styled(Container, {
  name: 'CollectionExpanding',
  slot: 'ContentContainer',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>``;

const IntroText = styled(ContentModule, {
  name: 'CollectionExpanding',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ variant?: string }>``;

const ItemsContainer = styled(Box, {
  name: 'CollectionExpanding',
  slot: 'ItemsContainer',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.itemsContainer]
})<{ variant?: string }>``;

const Item = styled(ContentModule, {
  name: 'CollectionExpanding',
  slot: 'Item',
  overridesResolver: (_, styles) => [styles.item]
})<{ variant?: string }>``;

export default CollectionExpanding;
