'use client';
import React from 'react';

import { useHits } from 'react-instantsearch-core';

import Hit from './Hit';

// https://www.algolia.com/doc/api-reference/widgets/hits/react/#hook
const Hits = ({ ownerState, ...other }: { ownerState: any }) => {
  const { hits } = useHits(other);
  return (
    <>
      {hits.map((hit, index) => (
        <Hit key={`hit-${index}-${hit.id}`} hit={hit} ownerState={ownerState} />
      ))}
    </>
  );
};

export default Hits;
