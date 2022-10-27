import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import { OnSubmitParams } from '@algolia/autocomplete-core';
import algoliasearch from 'algoliasearch';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { RouterContext } from 'next/dist/shared/lib/router-context';
import Autocomplete from '../Autocomplete';
import SearchResultItem from '../SearchResultItem';
import { useLocalizationContext } from '../LocalizationContext';

const algoliaOptions = {
  appId: process.env.ALGOLIA_APP_ID as string,
  searchApiKey: process.env.ALGOLIA_SEARCH_API_KEY as string,
  sourceId: 'articles',
  indexName: 'articles'
};

const searchClient = algoliasearch(algoliaOptions.appId, algoliaOptions.searchApiKey);

export interface AutocompleteBoxProps {
  settings?: SettingsProps;
}

export interface SettingsProps {
  variant?: string;
  placeholder?: string;
  searchResultsUrl?: string;
}

export interface templatesItemsProps {
  item: any;
  components: any;
}

export interface ResultItemProps {
  router: any;
  href: string;
  children: JSX.Element;
}

const ResultItem = ({ router, href, children }: ResultItemProps) => {
  return (
    <RouterContext.Provider value={router}>
      <Link href={href}>{children}</Link>
    </RouterContext.Provider>
  );
};

export const AutocompleteBox = ({ settings }: AutocompleteBoxProps) => {
  const theme = useTheme();
  const router = useRouter();
  const localization = useLocalizationContext();
  const { locale, defaultLocale } = router;

  const { variant, placeholder, searchResultsUrl } = settings as SettingsProps;
  const matchesDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const mobileText = localization['autocomplete.searchMobile.placeholder']?.shortTextValue ?? 'Search';

  const filters = locale !== defaultLocale ? `locale:${locale} AND translatedInLocale:true` : `locale:${locale}`;

  const handleSubmit = (formData: OnSubmitParams<any>) => {
    const searchQuery: string = formData.state.query.trim();

    if (searchQuery === '' || !searchResultsUrl) {
      formData.setQuery('');
      return;
    }

    router.push({
      pathname: searchResultsUrl,
      query: { query: searchQuery }
    });
  };

  return (
    <Root variant={variant} data-testid="AutocompleteBox">
      <Autocomplete
        key={locale}
        onSubmit={handleSubmit}
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
                    query,
                    params: {
                      filters
                    }
                  }
                ]
              });
            },
            templates: {
              item({ item, components }: templatesItemsProps) {
                if (
                  router?.locale !== defaultLocale &&
                  !item?.path.includes(item?.locale) &&
                  !router?.asPath.includes(item?.locale)
                ) {
                  item.path = `/${item.locale}${item.path}`;
                }
                return (
                  <ResultItem router={router} href={item.path}>
                    <components.SearchResultItem
                      hit={item}
                      router={router}
                      data-testid="SearchResultItem"
                      components={components}
                    />
                  </ResultItem>
                );
              },
              noResults() {
                return localization['autocomplete.searchNoResults.label']?.shortTextValue ?? 'No Results';
              }
            }
          }
        ]}
      />
    </Root>
  );
};

const Root = styled(Box, {
  name: 'AutocompleteBox',
  slot: 'Root',
  shouldForwardProp: (prop: any) => prop !== 'variant',
  overridesResolver: (_: any, styles: any) => [styles.root]
})<{ variant?: string }>``;

export default AutocompleteBox;
