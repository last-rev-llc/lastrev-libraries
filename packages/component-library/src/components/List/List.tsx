import React from 'react';
import {
  List as MuiList,
  ListProps as MuiListProps
} from '@material-ui/core';
import ErrorBoundary from '../ErrorBoundary';

interface ListProps extends MuiListProps {
  // test: string;
}

export const List = ({
  // test,
  children,
  ...restProps
}: ListProps) => {
  return (
    <ErrorBoundary>
      <MuiList
        {...restProps}
      >
        {children}
        List
      </MuiList>
    </ErrorBoundary>
  );
};

export default List;
