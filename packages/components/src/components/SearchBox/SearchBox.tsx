import React from 'react';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Autocomplete from '../Autocomplete';
import SearchResultItem from '../SearchResultItem';

const algoliaOptions = {
  appId: (process.env.ALGOLIA_APP_ID as string),
  searchApiKey: (process.env.ALGOLIA_SEARCH_API_KEY as string),
  sourceId: 'articles',
  indexName: 'articles',
};

const searchClient = algoliasearch(algoliaOptions.appId, algoliaOptions.searchApiKey);
export interface SearchBoxProps {
  settings?: SettingsProps;
}
export interface SettingsProps {
  variant?: string;
  placeholder?: string;
}

export interface templatesItemsProps {
  item: any;
  components: any;
}

export const SearchBox = ({ settings }: SearchBoxProps) => {
  const theme = useTheme();
  
  const { variant, placeholder } = settings as SettingsProps;
  const matchesDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  
  {/* TODO: Use localization lookup for "searchPlaceholder" (IAS-117) */}
  const mobileText = 'Search';

  return (
    <Root variant={variant} data-testid="SearchBox">
      <Autocomplete
        placeholder={matchesDesktop ? placeholder : mobileText}
        components={{ SearchResultItem }}
        getSources={({ query }: any) => [
          {
            sourceId: algoliaOptions.sourceId,
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: algoliaOptions.indexName,
                    query
                  }
                ]
              });
            },
            templates: {
              item({ item, components }: templatesItemsProps) {
                return (
                  <components.SearchResultItem hit={item} data-testid="SearchResultItem" components={components} />
                );
              },
              noResults() {
                return 'No Results'; {/* TODO: Use localization lookup for "searchNoResultsText" (IAS-117) */}
              }
            }
          }
        ]}
      />
    </Root>
  );
};

const Root = styled(Box, {
  name: 'SearchBox',
  slot: 'Root',
  shouldForwardProp: (prop: any) => prop !== 'variant',
  overridesResolver: (_: any, styles: any) => [styles.root]
})<{ variant?: string }>``;

export default SearchBox;
