'use client';
import React from 'react';

import { useHits } from 'react-instantsearch-core';

// https://www.algolia.com/doc/api-reference/widgets/hits/react/#hook
const Hits = ({ ownerState, HitComponent, ...other }: { ownerState: any; HitComponent: any }) => {
  const { hits } = useHits(other);

  return (
    <>
      {hits.map((hit, index) => (
        <HitComponent key={`hit-${index}-${hit.id}`} hit={hit} ownerState={ownerState} />
      ))}
    </>
  );
};

export default Hits;
