import React from 'react';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import { RichText } from '@last-rev/component-library/dist/components/Text/Text';
import Text from '@ias/components/src/components/Text/Text';

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
        />
      ) : null}
    </ErrorBoundary>
  );
};

export default Table;
