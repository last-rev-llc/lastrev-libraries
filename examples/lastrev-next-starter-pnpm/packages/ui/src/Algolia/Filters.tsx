'use client';
import React from 'react';
import MenuSelect from './MenuSelect';
import Toggle from './Toggle';

type FiltersProps = {
  type: 'menuSelect' | 'toggle';
  ownerState: any;
  filters: [string];
};

const Filters = ({ ownerState, filters }: FiltersProps) => {
  return (
    <>
      {!!filters?.length &&
        filters.map((filter: any) => {
          return (
            <React.Fragment key={filter.attributes || filter.attribute}>
              {filter.type === 'menuSelect' ? <MenuSelect {...filter} ownerState={ownerState} /> : null}
              {filter.type === 'toggle' ? <Toggle {...filter} ownerState={ownerState} /> : null}
            </React.Fragment>
          );
        })}
    </>
  );
};

export default Filters;
