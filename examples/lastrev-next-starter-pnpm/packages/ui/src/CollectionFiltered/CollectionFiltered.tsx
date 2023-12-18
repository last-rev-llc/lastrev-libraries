'use client';
import React from 'react';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import type { CollectionFilteredProps, CollectionFilteredOwnerState } from './CollectionFiltered.types';
// import { headers } from 'next/headers';
import useSWR from 'swr';
// import parseBooleanEnvVar from '../utils/parseBooleanEnvVar';
// import { useSearchParams } from 'next/navigation';
import { getCollectionItems } from './getCollectionItems';
import { useRouter, useSearchParams } from 'next/navigation';
const useQueryState = (defaultValue: any): [any, any] => {
  const router = useRouter();
  const { slug, ...query } = router?.query ?? {};
  const [state, setState] = React.useState({ ...defaultValue, ...query });
  const handleSetState = (newState: any) => {
    setState(newState);
    // TODO: Re-enable pushing state to query when issues with Router.push are resolved
    // router.push({ pathname: router.pathname, query: { ...query, slug, ...newState } }, undefined, { shallow: true });
  };
  return [state, handleSetState];
};

const CollectionFiltered = (props: CollectionFilteredProps) => {
  const {
    //  searchParams,
    variant,
    introText,
    items: defaultItems,
    settings,
    pageInfo: defaultPageInfo
  } = props;
  const searchParams = useSearchParams();
  const { filter: defaultFilter } = settings ?? {};
  const [filterQuery, setFilter] = useQueryState(defaultFilter);
  const page = parseInt(searchParams?.get('page') ?? '1');
  const limit = settings?.limit ?? 6;
  const offset = (page - 1) * limit;

  const filter = React.useMemo<any>(() => {
    if (!settings?.filters) return {};
    // Filter the filterQuery to only include the keys that are in the options
    return settings?.filters?.reduce(
      (acc: any, { id }: any) => ({
        ...acc,

        [id]: filterQuery[id]
      }),
      {}
    );
  }, [filterQuery, settings?.filters]);

  let { data, error, isLoading } = useSWR(
    [props.id, limit, offset, filter, settings],
    ([id, limit, offset, filter, settings]) =>
      getCollectionItems({
        id,
        limit,
        offset,
        filter,
        settings
      })
  );
  // isLoading = true;
  // data = {};
  const collectionVariant = variant?.replace('Filtered', '');
  let items = [];
  let pageInfo = {
    ...defaultPageInfo,
    filter,
    limit,
    offset,
    page,
    isLoading,
    error
  };
  const isLoadingInitial = !data && !error;
  const isLoadingMore = isLoadingInitial && isLoading && (page > 1 || !Object.values(filter).every((x) => !x));
  if (data?.items) {
    // console.log('CollectionFiltered:WithItems');
    items = data?.items;
    pageInfo = { ...pageInfo, ...data?.pageInfo };
  }

  if (isLoadingInitial || !data) {
    // console.log('CollectionFiltered:isLoadingInitial');
    items = defaultItems?.map((item: any) => ({
      ...item,
      loading: isLoading && isLoadingMore
    }));
  } else if (isLoading && !data?.items && page != 1) {
    // console.log('CollectionFiltered:isLoadingMOre');
    items = new Array(limit).fill({ __typename: 'Card', variant: props.itemsVariant, loading: true });
  }
  // console.log('CollectionFiltered', { data, items, isLoading, isLoadingInitial, isLoadingMore, pageInfo });

  return (
    <ErrorBoundary>
      <ContentModule
        {...props}
        __typename="Collection"
        variant={collectionVariant}
        introText={introText}
        items={items}
        pageInfo={pageInfo}
        showFilters
        setFilter={setFilter}
        error={error}
      />
    </ErrorBoundary>
  );
};

export default CollectionFiltered;
