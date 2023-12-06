'use client';
import React from 'react';

import TextField from '@mui/material/TextField';

import { useSearchBox } from 'react-instantsearch-core';

const SearchBox = ({ ownerState, searchAsYouType, ...other }: { ownerState: any; searchAsYouType: Boolean }) => {
  const { query, refine } = useSearchBox(other);
  return (
    <TextField
      id="keywords"
      fullWidth
      label="Keywords"
      value={query}
      variant="standard"
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        refine(event.target.value);
      }}
    />
  );
};

export default SearchBox;
