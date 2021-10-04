import React from 'react';
import { Grid } from '@mui/material';
import ErrorBoundary from '../ErrorBoundary';
import styled from '@mui/system/styled';
import sidekick from '../../utils/sidekick';
import Accordion, { AccordionProps } from '../Accordion';

export interface CollectionAccordionProps {
  items?: AccordionProps[];
  variant?: string;
  itemsVariant?: string;
  theme: any;
  sidekickLookup: string;
  itemSpacing: number;
}

export const CollectionAccordion = ({
  items,
  variant,
  itemsVariant,
  sidekickLookup,
  itemSpacing
}: CollectionAccordionProps) => {
  if (!items?.length) return null;
  const itemsWithVariant = items.map((item) => ({ ...item, variant: itemsVariant ?? item?.variant }));
  return (
    <ErrorBoundary>
      <Root
        container
        spacing={itemSpacing}
        {...sidekick(sidekickLookup)}
        variant={variant}
        data-testid="CollectionAccordion"
      >
        {itemsWithVariant.map((item, idx) => (
          <AccordionItem item key={idx}>
            <Accordion {...item} />
          </AccordionItem>
        ))}
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Grid, {
  name: 'CollectionAccordion',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>(() => ({}));

const AccordionItem = styled(Grid, {
  name: 'CollectionAccordion',
  slot: 'AccordionItem',
  overridesResolver: (_, styles) => [styles.accordionItem]
})<{ variant?: string }>`
  width: 100%;
`;

export default CollectionAccordion;
