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
  // todo: ask if we really want this logs here
  console.log('data => ', data);
  const options = data?.length ? data[0]?.options : defaultOptions;
  console.log('options => ', options);
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

  //todo: figure out if we still need this log
  console.log('itemsWithVariant => ', { itemsWithVariant, error });
  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)} variant={variant} data-testid="CollectionFiltered">
        <ContentContainer maxWidth={itemsWidth}>
          <ContainerGrid container spacing={itemsSpacing ?? 0} sx={{ flexDirection: 'column', alignItems: 'center' }}>
            <CollectionFiltersGrid item container sx={{ justifyContent: 'flex-end' }}>
              <CollectionFilters
                id={id}
                filters={filters}
                allOptions={allOptions}
                options={options}
                setFilter={setFilter}
                filter={filter}
                onClearFilter={onClearFilter}
              />
            </CollectionFiltersGrid>
            {!itemsWithVariant?.length && !isEmpty(filter) && !loading ? (
              <NoResultsGrid item>
                <NoResultsText variant="h4" data-testid="CollectionFiltered-NoResultsDisplay">
                  No results for filter: {parsedFilters ? parsedFilters : <NoResultsSkeleton width={100} />}
                </NoResultsText>
              </NoResultsGrid>
            ) : null}
            {!itemsWithVariant?.length && error ? (
              <TryAgainGrid item>
                <TryAgainText variant="h4">Error searching for: {parsedFilters}, try again!</TryAgainText>
                <TryAgainButton
                  variant="contained"
                  onClick={() => refetch()}
                  data-testid="CollectionFiltered-TryAgainButton">
                  {'TRY AGAIN'}
                </TryAgainButton>
              </TryAgainGrid>
            ) : null}
            {itemsWithVariant?.length ? (
              <>
                <ResultsGridContainer item container>
                  <ResultsGrid item xs={12}>
                    <ResultsText variant="h4" data-testid="CollectionFiltered-ResultsDisplay">
                      {parsedFilters ? `Showing results for: ${parsedFilters}` : 'Showing results for: All'}
                    </ResultsText>
                  </ResultsGrid>
                  <Section
                    contents={itemsWithVariant}
                    // background={background}
                    variant={'three-per-row'}
                    contentSpacing={itemsSpacing ?? 0}
                    testId="CollectionFiltered-ItemsSection"
                  />
                </ResultsGridContainer>
              </>
            ) : null}
            {loading ? (
              <>
                <MoreResultsContainerGrid item container>
                  {isLoadingMore && (itemsWithVariant?.length ?? 0) < limit ? (
                    <MoreResultsGrid item xs={12}>
                      <MoreResultsText variant="h4" data-testid="CollectionFiltered-LoadingResultsDisplay">
                        Showing results for:{' '}
                        {parsedFilters ? parsedFilters : <MoreResultsSkeleton width={100} data-testid="" />}
                      </MoreResultsText>
                    </MoreResultsGrid>
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
                </MoreResultsContainerGrid>
              </>
            ) : null}
            {!isReachingEnd ? (
              <ReachingEndGrid item sx={{ padding: 2 }}>
                <ReachingEndButton
                  variant="contained"
                  onClick={() => setSize(size + 1)}
                  data-testid="CollectionFiltered-LoadMoreButton">
                  {loadMoreText ?? 'LOAD MORE'}
                </ReachingEndButton>
              </ReachingEndGrid>
            ) : null}
          </ContainerGrid>
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

const ContainerGrid = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'ContainerGrid',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.containerGrid]
})``;

const CollectionFiltersGrid = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'CollectionFiltersGrid',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.collectionFiltersGrid]
})``;

const NoResultsGrid = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'NoResultsGrid',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.noResultsGrid]
})``;

const TryAgainGrid = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'TryAgainGrid',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.tryAgainGrid]
})``;

const ResultsGridContainer = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'ResultsGridContainer',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.resultsGridContainer]
})``;

const ResultsGrid = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'ResultsGrid',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.resultsGrid]
})``;

//is it OK to add shouldForwardProp, if this means passing no variant(?)
// should this be removed from the styled component?
const NoResultsText = styled(Typography, {
  name: 'CollectionFiltered',
  slot: 'NoResultsText',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.noResultsText]
})``;

const TryAgainText = styled(Typography, {
  name: 'CollectionFiltered',
  slot: 'TryAgainText',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.tryAgainText]
})``;

const ResultsText = styled(Typography, {
  name: 'CollectionFiltered',
  slot: 'ResultsText',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.resultsText]
})``;

const MoreResultsText = styled(Typography, {
  name: 'CollectionFiltered',
  slot: 'MoreResultsText',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.moreResultsText]
})``;

const NoResultsSkeleton = styled(Skeleton, {
  name: 'CollectionFiltered',
  slot: 'NoResultsSkeleton',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.noResultsSkeleton]
})``;

const MoreResultsSkeleton = styled(Skeleton, {
  name: 'CollectionFiltered',
  slot: 'MoreResultsSkeleton',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.moreResultsSkeleton]
})``;

// same question as above
const ReachingEndButton = styled(Button, {
  name: 'CollectionFiltered',
  slot: 'ReachingEndButton',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.reachingEndButton]
})``;

const TryAgainButton = styled(Button, {
  name: 'CollectionFiltered',
  slot: 'TryAgainButton',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.tryAgainButton]
})``;

const MoreResultsContainerGrid = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'MoreResultsContainerGrid',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.moreResultsContainerGrid]
})``;

const MoreResultsGrid = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'MoreResultsGrid',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.moreResultsGrid]
})``;

const ReachingEndGrid = styled(Grid, {
  name: 'CollectionFiltered',
  slot: 'ReachingEndGrid',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.reachingEndGrid]
})``;

export default CollectionFiltered;
