import React from 'react';
import { Container, Box } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core';
import styled from '@material-ui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
// import { LinkProps } from '../Link/Link';
import { MediaProps } from '../Media';
import { CardProps } from '../Card';
import Section from '../Section';
// import sidekickInit from "../../utils/sidekickUtility";

export interface CollectionProps {
  items?: CardProps[];
  background?: MediaProps;
  variant?: string;
  itemsVariant?: string;
  theme: any;
  contentWidth?: false | Breakpoint | undefined;
}

export const Collection = ({
  items,
  contentWidth,
  background,
  variant = 'three-per-row',
  itemsVariant
}: CollectionProps) => {
  console.log('Collection', { items, contentWidth, background, variant });
  if (!items?.length) return null;
  // const { sidekicker } = sidekickInit(props);
  const itemsWithVariant = items.map((item) => ({ ...item, variant: itemsVariant ?? item?.variant }));
  return (
    <ErrorBoundary>
      <Root
        variant={variant}
        // {...sidekicker('Collection')}
      >
        {!contentWidth ? (
          <Section contents={itemsWithVariant} background={background} variant={`collection-${variant}`} />
        ) : (
          <ContentContainer maxWidth={contentWidth}>
            <Section
              contents={itemsWithVariant}
              background={background}
              variant={`collection-${variant}`}
              styles={{ root: { py: 2 } }}
            />
          </ContentContainer>
        )}
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Collection',
  slot: 'Root',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(() => ({}));

const ContentContainer = styled(Container, {
  name: 'Collection',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => ({
    ...styles.contentContainer
  })
})<{ variant?: string }>(() => ({}));

export default Collection;
