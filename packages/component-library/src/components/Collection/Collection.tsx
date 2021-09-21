import React from 'react';
import { Container, Box } from '@mui/material';
import { Breakpoint } from '@mui/material';
import styled from '@mui/system/styled';
import omit from 'lodash/omit';
import ErrorBoundary from '../ErrorBoundary';
import Text from '../Text';
// import { LinkProps } from '../Link/Link';
import { MediaProps } from '../Media';
import { TextProps } from '../Text';
import { CardProps } from '../Card';
import Section from '../Section';
import sidekick from '../../utils/sidekick';

export interface CollectionProps {
  id: string;
  items?: CardProps[];
  background?: MediaProps;
  variant?: string;
  introText?: TextProps;
  itemsVariant?: string;
  itemsSpacing?: number;
  itemsWidth?: false | Breakpoint | undefined;
  styles?: any;
  theme?: any;
  sidekickLookup?: any;
}

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
  // const { sidekicker } = sidekickInit(props);
  const itemsWithVariant = items.map((item) => ({ ...item, variant: itemsVariant ?? item?.variant }));
  return (
    <ErrorBoundary>
      <Root variant={variant} data-testid="Collection" {...omit(props, 'theme')} {...sidekick(sidekickLookup)}>
        {introText && (
          <IntroText {...introText} {...sidekick(sidekickLookup?.introText)} data-testid="Collection-introText" />
        )}
        {!itemsWidth ? (
          <Section
            testId="Collection-itemsWithVariant-without-itemsWidth"
            contents={itemsWithVariant}
            background={background}
            variant={variant}
            contentWidth={itemsWidth}
            contentSpacing={itemsSpacing}
            styles={styles}
          />
        ) : (
          <ContentContainer maxWidth={itemsWidth}>
            <Section
              testId="Collection-itemsWithVariant-with-itemsWidth"
              contents={itemsWithVariant}
              background={background}
              variant={variant}
              contentWidth={itemsWidth}
              contentSpacing={itemsSpacing}
              styles={styles}
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
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

const ContentContainer = styled(Container, {
  name: 'Collection',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => [
    styles.contentContainer
  ]
})<{ variant?: string }>``;

const IntroText = styled(Text, {
  name: 'Collection',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [
    styles.introText
  ]
})<{ variant?: string }>``;

export default Collection;
