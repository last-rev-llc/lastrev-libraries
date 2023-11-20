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
import { useRouter } from 'next/navigation';
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
  const { searchParams, variant, introText, items: defaultItems, settings, pageInfo: defaultPageInfo } = props;
  const { filter: defaultFilter } = settings ?? {};
  const [filterQuery, setFilter] = useQueryState(defaultFilter);
  const page = parseInt(searchParams?.page ?? '1');
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

  // const filter = Array.from(Object.keys(searchParams))
  //   ?.filter((key) => !['page', 'limit', 'offset']?.includes(key))
  //   ?.reduce((acc, cur) => ({ ...acc, [cur]: searchParams[cur] }), {});
  // const filter = {};
  const { data, error, isLoading } = useSWR([props.id, limit, offset, filter], ([...args]) =>
    getCollectionItems(...args)
  );
  console.log('FilterSearchParrams', { searchParams, filter, data });
  const collectionVariant = variant?.replace('Filtered', '');
  let items = defaultItems?.map((item: any) => ({ ...item, loading: page !== 1 }));
  if (data || Object.keys(filter).length > 0) {
    items = data?.items;
  }

  return (
    <ErrorBoundary>
      <ContentModule
        {...props}
        __typename="Collection"
        variant={collectionVariant}
        introText={introText}
        items={items}
        // items={items}
        pageInfo={{
          ...defaultPageInfo,
          ...data?.pageInfo,
          filter,
          limit,
          offset,
          page
        }}
        showFilters
        setFilter={setFilter}
      />
    </ErrorBoundary>
  );
};

export default CollectionFiltered;
