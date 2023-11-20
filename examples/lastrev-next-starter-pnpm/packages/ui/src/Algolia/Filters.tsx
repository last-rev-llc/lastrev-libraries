'use client';
import React from 'react';
import HierarchicalMenu from '../Algolia/HierarchicalMenu';

const MenuSelect = ({ ownerState, filters }) => {
  return (
    <>
      {filters.map((filter: any) => (
        <HierarchicalMenu key={filter.attributes} {...filter} ownerState={ownerState} />
      ))}
    </>
  );
};

export default MenuSelect;
