import React from 'react';
import { Configure, RefinementList, MenuSelect } from 'react-instantsearch-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import { CollectionProps } from '@last-rev/component-library/dist/components/Collection';
import sidekick from '@last-rev/contentful-sidekick-util';

interface FilterItem {
  label: string;
  count?: number;
}

export const CollectionSearchFilters = ({ introText, sidekickLookup }: CollectionProps) => {
  return (
    <ErrorBoundary>
      <Box
        data-testid="CollectionSearchFilters"
        sx={{
          'marginTop': { xs: 3, md: 0 },

          '& [class*="Text-root"] b': {
            fontWeight: 500
          }
        }}
        {...sidekick(sidekickLookup)}>
        <Box
          sx={{
            'display': 'flex',
            'alignItems': 'center',

            '& [class*="Text-root"] p': {
              'marginBottom': { xs: 0, md: 1 },

              '@media (max-width: 1024px)': {
                fontSize: 14,
                textTransform: 'uppercase'
              }
            }
          }}>
          {introText ? (
            <ContentModule
              {...introText}
              {...sidekick(sidekickLookup?.introText)}
              data-testid="CollectionSearchFilters-introText"
            />
          ) : null}
          <Box
            sx={{
              'display': { xs: 'flex', md: 'none' },
              'alignItems': 'center',
              'marginLeft': 3,

              '& svg': {
                zIndex: 1,
                width: 14,
                height: 14,
                marginRight: -3,
                color: 'midnight.A40'
              },

              '& select': {
                width: '100%',
                padding: 1,
                paddingLeft: 3,
                border: 0,
                borderRadius: 6,
                backgroundColor: 'midnight.A06',
                color: 'midnight.A90',
                fontSize: 14,
                appearance: 'none'
              }
            }}>
            <FilterAltIcon />
            <MenuSelect attribute="categories.level-1" />
          </Box>
        </Box>
        <Filters
          attribute="categories.level-1"
          transformItems={(items: Array<FilterItem>) =>
            items.map((item) => {
              return {
                ...item,
                label: item.label,
                count: `(${item.count})`
              };
            })
          }
        />
        <Configure hitsPerPage={8} facetingAfterDistinct={true} />
      </Box>
    </ErrorBoundary>
  );
};

const Filters = styled(RefinementList, {
  name: 'CollectionSearchFilters',
  slot: 'RefinementList'
})(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  },
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
