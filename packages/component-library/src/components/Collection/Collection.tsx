import React from 'react';
import { Container, Box } from '@mui/material';
import styled from '@mui/system/styled';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';
import Section from '../Section';
import sidekick from '@last-rev/contentful-sidekick-util';
import ConditionalWrapper from '../ConditionalWrapper';
import { CollectionProps } from './Collection.types';

export const Collection = ({
  items,
  itemsWidth,
  background,
  variant = 'three-per-row',
  itemsVariant,
  itemsSpacing,
  sidekickLookup,
  introText,
  styles,
  ...props
}: CollectionProps) => {
  if (!items?.length) return null;
  const itemsWithVariant = items.map((item) => ({ ...item, variant: itemsVariant ?? item?.variant }));
  return (
    <ErrorBoundary>
      <Root
        variant={variant}
        itemsVariant={itemsVariant}
        data-testid="Collection"
        {...props}
        {...sidekick(sidekickLookup)}
        sx={styles?.root}
      >
        <ConditionalWrapper
          condition={!!itemsWidth}
          wrapper={(children) => (
            <ContentContainer data-testid="Collection-contentContainer" maxWidth={itemsWidth}>
              {children}
            </ContentContainer>
          )}
        >
          {introText && (
            <IntroText {...introText} {...sidekick(sidekickLookup?.introText)} data-testid="Collection-introText" />
          )}
          <Section
            testId="Collection-section"
            contents={itemsWithVariant}
            background={background}
            variant={variant}
            contentSpacing={itemsSpacing ?? 0}
            styles={{ ...styles, root: undefined }}
          />
        </ConditionalWrapper>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Collection',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'itemsVariant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string; itemsVariant?: string }>``;

const ContentContainer = styled(Container, {
  name: 'Collection',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>``;

const IntroText = styled(ContentModule, {
  name: 'Collection',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ variant?: string }>``;

export default Collection;
