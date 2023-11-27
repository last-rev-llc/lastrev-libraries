import React from 'react';
import { type UseMenuProps, type UseHitsProps, useMenu } from 'react-instantsearch-core';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

type MenuSelectProps = {
  ownerState: any;
  attribute: string;
  others?: UseMenuProps;
};

const MenuSelect = ({ ownerState, attribute, others }: MenuSelectProps) => {
  const { items, refine } = useMenu({ attribute, ...others });

  const { value: selectedValue } = items.find((item) => item.isRefined) || {
    value: 'all' // Set the default value to 'all'
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={`menu-select-${attribute}-label`} sx={{ textTransform: 'capitalize' }}>
        {attribute}
      </InputLabel>
      <Select
        id={`menu-select-${attribute}`}
        value={selectedValue}
        defaultValue="all" // Set the default value to 'all'
        onChange={(event) => {
          refine(event.target.value === 'all' ? '' : event.target.value); // Refine to an empty string for 'all' value
        }}>
        <MenuItem key={`menu-select-option-${attribute}-view-all`} value="all">
          View All
        </MenuItem>
        {items.map((item) => (
          <MenuItem key={`menu-select-option-${attribute}-${item.value}`} value={item.value}>
            {item.label} ({item.count})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MenuSelect;
