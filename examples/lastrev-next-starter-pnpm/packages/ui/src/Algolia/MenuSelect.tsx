'use client';
import React from 'react';
import { type UseMenuProps, type UseHitsProps, useMenu } from 'react-instantsearch-core';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type MenuSelectProps = {
  ownerState: any;
  attribute: string;
  others?: UseMenuProps;
};

const MenuSelect = ({ ownerState, attribute, others }: MenuSelectProps) => {
  const { items, refine } = useMenu({ attribute, ...others });
  const { value: selectedValue } = items.find((item) => item.isRefined) || {
    value: ''
  };

  return (
    <Select
      labelId={`menu-select-${attribute}-label`}
      id={`menu-select-${attribute}`}
      value={selectedValue}
      label={attribute}
      onChange={(event) => {
        refine(event.target.value);
      }}>
      {items.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label} ({item.count})
        </MenuItem>
      ))}
    </Select>
  );
};

export default MenuSelect;
