import React from 'react';
import {
  List as MuiList,
  ListProps as MuiListProps
} from '@material-ui/core';


interface ListProps extends MuiListProps {
  // test: string;
}

export const List = ({
  // test,
  children,
  ...restProps
}: ListProps) => {
  return (
    <MuiList
      {...restProps}
    >
      {children}
      List
    </MuiList>
  );
};

export default List;
