import React from 'react';
import { Grid } from '@mui/material';
import ErrorBoundary from '../ErrorBoundary';
import styled from '@mui/system/styled';
import sidekick from '@last-rev/contentful-sidekick-util';
import Accordion from '../Accordion';
import ContentModule from '../ContentModule';
import { CollectionAccordionMediaProps } from './CollectionAccordionMedia.types';
import { CardProps } from '../Card';
import getFirstOfArray from '../../utils/getFirstOfArray';

export const CollectionAccordionMedia = ({
  items,
  variant,
  sidekickLookup,
  itemsSpacing
}: CollectionAccordionMediaProps) => {
  const [selectedIdx, setSelectedIdx] = React.useState(0);
  if (!items?.length) return null;
  const selected = React.useMemo(() => items[selectedIdx] as CardProps, [items, selectedIdx]);
  return (
    <ErrorBoundary>
      <Root
        container
        spacing={itemsSpacing ?? 0}
        {...sidekick(sidekickLookup)}
        variant={variant}
        data-testid="CollectionAccordionMedia"
      >
        <SelectedMediaRoot>
          <SelectedMedia
            __typename="Media"
            {...getFirstOfArray(selected.media)}
            sidekickLookup={getFirstOfArray(selected.media)?.sidekickLookup?.media}
          />
        </SelectedMediaRoot>
        <AccordionRoot>
          {items.map((item, idx) => (
            <AccordionItem item key={idx}>
              <Accordion {...item} expanded={selectedIdx === idx} onClick={() => setSelectedIdx(idx)} />
            </AccordionItem>
          ))}
        </AccordionRoot>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Grid, {
  name: 'CollectionAccordionMedia',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

const AccordionRoot = styled(Grid, {
  name: 'CollectionAccordionMedia',
  slot: 'AccordionRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.accordionRoot]
})``;

const SelectedMediaRoot = styled(Grid, {
  name: 'CollectionAccordionMedia',
  slot: 'SelectedMediaRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.selectedMediaRoot]
})``;

const SelectedMedia = styled(ContentModule, {
  name: 'CollectionAccordionMedia',
  slot: 'SelectedMedia',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.selectedMedia]
})``;

const AccordionItem = styled(Grid, {
  name: 'CollectionAccordionMedia',
  slot: 'AccordionItem',
  overridesResolver: (_, styles) => [styles.accordionItem]
})``;

export default CollectionAccordionMedia;
