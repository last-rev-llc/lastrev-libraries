'use client';
import React from 'react';
import MenuSelect from './MenuSelect';

type FiltersProps = {
  ownerState: any;
  filters: [string];
};

const Filters = ({ ownerState, filters }: FiltersProps) => {
  return (
    <>
      {!!filters?.length &&
        filters.map((filter: any) => (
          <MenuSelect key={filter.attributes || filter.attribute} {...filter} ownerState={ownerState} />
        ))}
    </>
  );
};

export default Filters;
