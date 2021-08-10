import React from 'react';
import { Container, Box } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core';
import styled from '@material-ui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
// import { LinkProps } from '../Link/Link';
import { MediaProps } from '../Media';
import { CardProps } from '../Card';
import Section from '../Section';
import sidekick from '../../utils/sidekick';

export interface CollectionProps {
  id: string;
  items?: CardProps[];
  background?: MediaProps;
  variant?: string;
  itemsVariant?: string;
  itemsSpacing?: number;
  itemsWidth?: false | Breakpoint | undefined;
  theme: any;
  sidekickLookup: any;
}

export const Collection = ({
  items,
  itemsWidth,
  background,
  variant = 'three-per-row',
  itemsVariant,
  itemsSpacing,
  sidekickLookup
}: CollectionProps) => {
  // console.log('Collection', { items, itemsWidth, background, variant });
  if (!items?.length) return null;
  // const { sidekicker } = sidekickInit(props);
  const itemsWithVariant = items.map((item) => ({ ...item, variant: itemsVariant ?? item?.variant }));
  return (
    <ErrorBoundary>
      <Root
        {...sidekick(sidekickLookup)}
        variant={variant}
        // {...sidekicker('Collection')}
      >
        {!itemsWidth ? (
          <Section
            contents={itemsWithVariant}
            background={background}
            variant={variant}
            contentWidth={itemsWidth}
            contentSpacing={itemsSpacing}
          />
        ) : (
          <ContentContainer maxWidth={itemsWidth}>
            <Section
              contents={itemsWithVariant}
              background={background}
              variant={variant}
              contentWidth={itemsWidth}
              contentSpacing={itemsSpacing}
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
  shouldForwardProp: (prop) => prop !== 'variant',
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
