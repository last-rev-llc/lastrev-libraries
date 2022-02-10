import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import { Table as MuiTable } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { BLOCKS } from '@contentful/rich-text-types';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import Text, { RichText } from '@last-rev/component-library/dist/components/Text/Text';

export interface TableProps {
  richText?: RichText;
  sidekickLookup?: any;
}

export const Table = ({
  richText,
  sidekickLookup
}: TableProps) => {
  return (
    <ErrorBoundary>
      {richText ? (
        <Text
          sidekickLookup={sidekickLookup?.table}
          body={richText}
          data-testid="Table"
          renderNode={{
            [BLOCKS.TABLE]: (node: any, children: any) => {
              let header;
              if (node.content[0].nodeType === 'table-header') {
                header = children[0];
                children = children.slice(1);
              }
              return (
                <TableContainer>
                  <MuiTable>
                    {header ? header : null}
                    <TableBody>
                      {children}
                    </TableBody>
                  </MuiTable>
                </TableContainer>
              );
            },
            'table-header': (_: any, children: any) => {
              return (
                <TableHead>
                  <TableRow>
                    {children}
                  </TableRow>
                </TableHead>
              );
            },
            [BLOCKS.TABLE_HEADER_CELL]: (_: any, children: any) => {
              return (
                <TableCell>
                  {children}
                </TableCell>
              );
            },
            [BLOCKS.TABLE_ROW]: (_: any, children: any) => {
              return (
                <TableRow>
                  {children}
                </TableRow>
              );
            },
            [BLOCKS.TABLE_CELL]: (_: any, children: any) => {
              return (
                <TableCell>
                  {children}
                </TableCell>
              );
            },
          }}
        />
      ) : null}
    </ErrorBoundary>
  );
};

export default Table;
