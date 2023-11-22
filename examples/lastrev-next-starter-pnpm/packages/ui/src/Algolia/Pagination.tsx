'use client';
import React from 'react';

import { usePagination } from 'react-instantsearch-core';

import { default as MuiPagination } from '@mui/material/Pagination';

//https://www.algolia.com/doc/api-reference/widgets/pagination/react/#hook
const Pagination = (props: any) => {
  const { currentRefinement, nbPages, refine } = usePagination(props);
  return (
    <MuiPagination
      count={nbPages ?? 1}
      page={!!currentRefinement ? currentRefinement : 1}
      defaultPage={1}
      boundaryCount={1}
      onChange={(event: React.ChangeEvent<unknown>, value: number) => {
        refine(value);
      }}
    />
  );
};

export default Pagination;
