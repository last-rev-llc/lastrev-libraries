'use client';
import React from 'react';

import Chip from '@mui/material/Chip';

import { useCurrentRefinements } from 'react-instantsearch-core';

const CurrentRefinements = ({ ownerState, ...other }: { ownerState: any }) => {
  const { items, canRefine, refine } = useCurrentRefinements(other);

  return (
    <div>
      {items.map((item, index) => (
        <div key={`refinement-group-${index}`}>
          {item.refinements.map((refinement, subIndex) => (
            <Chip
              key={`refinement-chip-${index}-${subIndex}`}
              label={`${item.label}: ${refinement.value}`}
              variant="outlined"
              onClick={() => {
                refine(refinement);
              }}
              onDelete={() => {
                refine(refinement);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CurrentRefinements;
