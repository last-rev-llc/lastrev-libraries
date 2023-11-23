'use client';
import React from 'react';

import { useHits } from 'react-instantsearch-core';
import { CardProps } from '../Card/Card.types';

// https://www.algolia.com/doc/api-reference/widgets/hits/react/#hook
const Hits = ({ ownerState, HitComponent, ...other }: { ownerState: any; HitComponent: any }) => {
  const { hits } = useHits(other);

  return (
    <>
      {hits.map((hit, index) => {
        const cardData: CardProps = { ...(hit.card ?? hit), __typename: 'Card' };

        return (
          <HitComponent
            key={`hit-${index}-${hit.id}`}
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
