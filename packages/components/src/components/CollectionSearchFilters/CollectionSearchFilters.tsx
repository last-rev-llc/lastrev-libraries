import React from 'react';
import {
  Configure,
  RefinementList
} from 'react-instantsearch-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import { CollectionProps } from '@last-rev/component-library/dist/components/Collection';
import { sidekick } from '../../utils/sidekick';

interface FilterItem {
  label: string;
  count: number;
}

export const CollectionSearchFilters = ({ introText, sidekickLookup }: CollectionProps) => {
  return (
    <ErrorBoundary>
      <Box data-testid="CollectionSearchFilters"
        sx={{
          '& [class*="Text-root"] b': {
            fontWeight: 500
          }
        }}
        {...sidekick(sidekickLookup)}>
        {introText ? (
          <ContentModule
            {...introText}
            {...sidekick(sidekickLookup?.introText)}
            data-testid="CollectionSearchFilters-introText"
          />
        ) : null}
        <Filters attribute="categories"
          transformItems={(items: Array<FilterItem>) =>
            items.map(item => {
              return ({
              ...item,
              label: item.label,
              count: `(${item.count})`
            })})
          }
        />
        <Configure hitsPerPage={8} />
      </Box>
    </ErrorBoundary>
  );
};

const Filters = styled(RefinementList, {
  name: 'CollectionSearchFilters',
  slot: 'RefinementList',
})(({ theme }) => ({
  '& .ais-RefinementList-list': {
    listStyle: 'none',
    margin: `0 0 ${theme.spacing(2)}`,
    padding: 0
  },
  '& .ais-RefinementList-item': {
    marginBottom: theme.spacing(1)
  },
  '& .ais-RefinementList-label': {
    ...theme.typography.body3,
    lineHeight: 1.1425
  },
  '& .ais-RefinementList-checkbox': {
    width: theme.spacing(2),
    height: theme.spacing(2),
    marginLeft: 0,
    marginRight: theme.spacing(1),
    accentColor: theme.palette.midnight.A20
  }
}));

export default CollectionSearchFilters;
