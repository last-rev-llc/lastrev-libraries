import React from 'react';
import { Skeleton, Grid, Container, Box, Button, Typography } from '@mui/material';
import styled from '@mui/system/styled';
import isEmpty from 'lodash/isEmpty';
import range from 'lodash/range';
import { useRouter } from 'next/router';
import useSWRInfinite from 'swr/infinite';

import ErrorBoundary from '../ErrorBoundary';
import Section from '../Section';
import { CardProps } from '../Card';
import CollectionFilters from '../CollectionFilters';
import sidekick from '@last-rev/contentful-sidekick-util';
import { CollectionFilteredProps, FilterFormData, Options } from './CollectionFiltered.types';

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
export const CollectionFiltered = ({
  id,
  items: defaultItems,
  options: defaultOptions,
  filter: defaultFilter,
  onClearFilter,
  fetchItems,
  settings,
  itemsWidth,
  variant,
  itemsVariant,
  itemsSpacing,
  sidekickLookup,
  loadMoreText
}: CollectionFilteredProps) => {
  const { filters, limit = 9 } = settings || {};
  const [filterQuery, setFilter] = useQueryState(defaultFilter);
  const filter = React.useMemo<FilterFormData>(() => {
    if (!filters) return {};
    // Filter the filterQuery to only include the keys that are in the options
    return filters?.reduce(
      (acc, { id }) => ({
        ...acc,
        [id]: filterQuery[id]
      }),
      {}
    );
  }, [filterQuery, filters]);

  // The key includes a stable version of the filter object for shallow comparison
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && previousPageData?.items && !previousPageData?.items?.length) return null; // reached the end
    if (pageIndex === 0) return [`collectionFiltered_${id}`, JSON.stringify(filter), 0]; // SWR key
    return [`collectionFiltered_${id}`, JSON.stringify(filter), pageIndex * limit]; // SWR key
  };

  const {
    data,
    error,
    size,
    setSize,
    isValidating: loading,
    mutate: refetch
  } = useSWRInfinite(
    getKey,
    (_key: string, _filterKey: string, offset: number) => (fetchItems ? fetchItems({ filter, limit, offset }) : null),
    {
      revalidateOnFocus: false
    }
  );

  const options = data?.length ? data[0]?.options : defaultOptions;
  const items = data?.reduce((accum: CardProps[], page: any) => [...accum, ...(page?.items || [])], []) ?? defaultItems;
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmptyData = data?.[0]?.items?.length === 0;
  const isReachingEnd = isEmptyData || (data && (data?.[data?.length - 1]?.items?.length ?? limit) < limit);

  const itemsWithVariant = items?.map((item) => ({ ...item, variant: itemsVariant ?? item?.variant }));
  const [allOptions, setAllOptions] = React.useState<Options>({});

  React.useEffect(() => {
    if (data && data?.length && data[0]?.allOptions) {
      const newAllOptions = data[0]?.allOptions;
      if (JSON.stringify(allOptions) !== JSON.stringify(newAllOptions)) {
        setAllOptions(newAllOptions);
      }
    }
  }, [data]);

  const parseValue = ({ filterId, value }: { filterId: string; value: string }) => {
    if (Array.isArray(value)) {
      return value.map((v) => allOptions[filterId]?.find((option) => option.value === v)?.label)?.join(', ');
    } else {
      const option = allOptions[filterId]?.find((option) => option.value === value);
      return allOptions && allOptions[filterId] ? option?.label : value;
    }
  };

  const parsedFilters = filters
    ?.map(({ id }) => (filter[id] ? parseValue({ filterId: id, value: filter[id] }) : null))
    .filter((x) => !!x)
    .join(', ');

  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)} variant={variant} data-testid="CollectionFiltered">
        <ContentContainer maxWidth={itemsWidth}>
          <Content container spacing={itemsSpacing ?? 0} sx={{ flexDirection: 'column', alignItems: 'center' }}>
            <CollectionFilteredRoot item container sx={{ justifyContent: 'flex-end' }}>
              <CollectionFilters
                id={id}
                filters={filters}
                allOptions={allOptions}
                options={options}
                setFilter={setFilter}
                filter={filter}
                onClearFilter={onClearFilter}
              />
            </CollectionFilteredRoot>
            {!itemsWithVariant?.length && !isEmpty(filter) && !loading ? (
              <NoResultsRoot item>
                <NoResultsText variant="h4" data-testid="CollectionFiltered-NoResultsDisplay">
                  No results for filter: {parsedFilters ? parsedFilters : <NoResultsSkeleton width={100} />}
                </NoResultsText>
              </NoResultsRoot>
            ) : null}
            {!itemsWithVariant?.length && error ? (
              <ErrorRoot item>
                <ErrorMessage variant="h4">Error searching for: {parsedFilters}, try again!</ErrorMessage>
                <ErrorButton variant="contained" onClick={() => refetch()} data-testid="CollectionFiltered-ErrorButton">
                  {'TRY AGAIN'}
                </ErrorButton>
              </ErrorRoot>
            ) : null}
            {itemsWithVariant?.length ? (
              <>
                <ResultsRoot item container>
                  <Results item xs={12}>
                    <ResultsText variant="h4" data-testid="CollectionFiltered-ResultsDisplay">
                      {parsedFilters ? `Showing results for: ${parsedFilters}` : 'Showing results for: All'}
                    </ResultsText>
                  </Results>
                  <Section
                    contents={itemsWithVariant}
                    // background={background}
                    variant={'three-per-row'}
                    contentSpacing={itemsSpacing ?? 0}
                    testId="CollectionFiltered-ItemsSection"
                  />
                </ResultsRoot>
              </>
            ) : null}
            {loading ? (
              <>
                <LoadingResultsRoot item container>
                  {isLoadingMore && (itemsWithVariant?.length ?? 0) < limit ? (
                    <LoadingResults item xs={12}>
                      <LoadingResultsText variant="h4" data-testid="CollectionFiltered-LoadingResultsDisplay">
                        Showing results for:{' '}
                        {parsedFilters ? parsedFilters : <LoadingResultsSkeleton width={100} data-testid="" />}
                      </LoadingResultsText>
                    </LoadingResults>
                  ) : null}
                  <Section
                    contents={range(limit).map((_: any, idx: number) => ({
                      __typename: 'Card',
                      id: `${idx}`,
                      variant: itemsVariant,
                      loading: true
                    }))}
                    variant={'three-per-row'}
                    contentSpacing={itemsSpacing ?? 0}
                    testId="CollectionFiltered-LoadingItemsSection"
                  />
                </LoadingResultsRoot>
              </>
            ) : null}
            {!isReachingEnd ? (
              <LoadMoreRoot item sx={{ padding: 2 }}>
                <LoadMoreButton
                  variant="contained"
                  onClick={() => setSize(size + 1)}
                  data-testid="CollectionFiltered-LoadMoreButton">
                  {loadMoreText ?? 'LOAD MORE'}
                </LoadMoreButton>
              </LoadMoreRoot>
            ) : null}
          </Content>
        </ContentContainer>
      </Root>
    </ErrorBoundary>
  );
};
const shouldForwardProp = (prop: string) => prop !== 'variant';

const Root = styled(Box, {
  name: 'CollectionFiltered',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>(() => ({
  display: 'flex',
  justifyContent: 'center'
}));

const ContentContainer = styled(Container, {
  name: 'CollectionFiltered',
  slot: 'ContentContainer',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>(() => ({
  display: 'flex'
}));

const Content = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'Content',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.content]
})``;

const CollectionFilteredRoot = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'FiltersRoot',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.filtersRoot]
})``;

const NoResultsRoot = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'NoResultsRoot',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.noResultsRoot]
})``;

const ErrorRoot = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'ErrorRoot',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.errorRoot]
})``;

const ResultsRoot = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'ResultsRoot',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.resultsRoot]
})``;

const Results = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'Results',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.results]
})``;

const NoResultsText = styled(Typography, {
  name: 'CollectionFiltered',
  slot: 'NoResultsText',
  overridesResolver: (_, styles) => [styles.noResultsText]
})``;

const ErrorMessage = styled(Typography, {
  name: 'CollectionFiltered',
  slot: 'ErrorMessage',
  overridesResolver: (_, styles) => [styles.errorMessage]
})``;

const ResultsText = styled(Typography, {
  name: 'CollectionFiltered',
  slot: 'ResultsText',
  overridesResolver: (_, styles) => [styles.resultsText]
})``;

const LoadingResultsText = styled(Typography, {
  name: 'CollectionFiltered',
  slot: 'LoadingResultsText',
  overridesResolver: (_, styles) => [styles.loadingResultsText]
})``;

const NoResultsSkeleton = styled(Skeleton, {
  name: 'CollectionFiltered',
  slot: 'NoResultsSkeleton',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.noResultsSkeleton]
})``;

const LoadingResultsSkeleton = styled(Skeleton, {
  name: 'CollectionFiltered',
  slot: 'LoadingResultsSkeleton',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.loadingResultsSkeleton]
})``;

const LoadMoreButton = styled(Button, {
  name: 'CollectionFiltered',
  slot: 'LoadMoreButton',
  overridesResolver: (_, styles) => [styles.loadMoreButton]
})``;

const ErrorButton = styled(Button, {
  name: 'CollectionFiltered',
  slot: 'ErrorButton',
  overridesResolver: (_, styles) => [styles.errorButton]
})``;

const LoadingResultsRoot = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'LoadingResultsRoot',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.loadingResultsRoot]
})``;

const LoadingResults = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'LoadingResults',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.loadingResults]
})``;

const LoadMoreRoot = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'LoadMoreRoot',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.loadMoreRoot]
})``;

export default CollectionFiltered;
