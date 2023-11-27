'use client';
import React from 'react';

import { useHits } from 'react-instantsearch-core';
import { CardProps } from '../Card/Card.types';

import { LayoutConfig } from '../CollectionDynamic/CollectionDynamic.theme';

// https://www.algolia.com/doc/api-reference/widgets/hits/react/#hook
const Hits = ({
  ownerState,
  HitComponent,
  layoutConfig,
  gridLayout,
  ...other
}: {
  layoutConfig: LayoutConfig;
  gridLayout: string;
  ownerState: any;
  HitComponent: any;
}) => {
  const { hits } = useHits(other);

  return (
    <>
      {hits.map((hit, index) => {
        const cardData: CardProps = { ...(hit.card ?? hit), __typename: 'Card' };

        return (
          <HitComponent
            key={`hit-${index}-${hit.id}`}
            layoutConfig={layoutConfig}
            gridLayout={gridLayout}
            {...cardData}
            variant={ownerState.itemsVariant}
            aspectRatio={ownerState.itemsAspectRatio}
            backgroundColor={ownerState.backgroundColor}
            ownerState={ownerState}
          />
        );
      })}
    </>
  );
};

export default Hits;
