import React from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

import Grid from '../Grid';
import Background from '../Background';
import ContentModule from '../ContentModule';
import ErrorBoundary from '../ErrorBoundary';

import Filters from '../Algolia/Filters';
import Pagination from '../Algolia/Pagination';
import Hits from '../Algolia/Hits';
import InfiniteHits from '../Algolia/InfiniteHits';
import SearchBox from '../Algolia/SearchBox';
import CurrentRefinements from '../Algolia/CurrentRefinements';
import AlgoliaSearch from '../Algolia/AlgoliaSearch';

import type { CollectionProps, CollectionOwnerState } from './Collection.types';

const Collection = (props: CollectionProps) => {
  const ownerState = { ...props };

  const { backgroundImage, backgroundColor, variant, sidekickLookup, introText, algoliaSettings } = props;

  return (
    <ErrorBoundary>
      <Root ownerState={ownerState} {...sidekick(sidekickLookup)} data-testid={`Collection-${variant}`}>
        <CollectionBackground
          background={backgroundImage}
          backgroundColor={backgroundColor}
          testId="Collection-background"
        />

        {introText && (
          <IntroTextGrid ownerState={ownerState}>
            <IntroText
              ownerState={ownerState}
              {...sidekick(sidekickLookup, 'introText')}
              {...introText}
              variant="introText"
            />
          </IntroTextGrid>
        )}

        {/* Use the AlgoliaSearch component here */}
        <AlgoliaSearch algoliaSettings={algoliaSettings}>
          <ContentGrid ownerState={ownerState}>
            {!!algoliaSettings?.indexName && !!algoliaSettings?.showCurrentRefinements ? (
              <CurrentRefinements ownerState={ownerState} />
            ) : null}

            {!!algoliaSettings?.indexName && (!!algoliaSettings?.showFilters || !!algoliaSettings?.showSearchBox) ? (
              <FiltersWrap ownerState={ownerState}>
                {!!algoliaSettings?.indexName && !!algoliaSettings?.showSearchBox ? (
                  <SearchBoxWrap ownerState={ownerState}>
                    <SearchBox ownerState={ownerState} searchAsYouType={!!algoliaSettings?.searchAsYouType} />
                  </SearchBoxWrap>
                ) : null}

                {!!algoliaSettings?.indexName && !!algoliaSettings?.showFilters ? (
                  <Filters ownerState={ownerState} filters={algoliaSettings.filters} />
                ) : null}
              </FiltersWrap>
            ) : null}

            <ResultsWrap ownerState={ownerState}>
              <ItemsGrid ownerState={ownerState}>
                {!!algoliaSettings?.indexName && !!algoliaSettings?.useInfiniteHits ? (
                  <InfiniteHits ownerState={ownerState} />
                ) : null}

                {!!algoliaSettings?.indexName && !algoliaSettings?.useInfiniteHits ? (
                  <>
                    <Hits ownerState={ownerState} />
                    {!!algoliaSettings?.showPagination ? (
                      <PaginationWrap ownerState={ownerState}>
                        <Pagination ownerState={ownerState} />
                      </PaginationWrap>
                    ) : null}
                  </>
                ) : null}
              </ItemsGrid>
            </ResultsWrap>
          </ContentGrid>
        </AlgoliaSearch>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Collection',
  slot: 'Root',
  overridesResolver: ({ ownerState }, styles) => [styles.root, styles[`${ownerState?.variant}`]]
})<{ ownerState: CollectionOwnerState }>``;

const CollectionBackground = styled(Background, {
  name: 'Collection',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const ContentGrid = styled(Grid, {
  name: 'Collection',
  slot: 'ContentGrid',
  overridesResolver: (_, styles) => [styles.contentGrid]
})<{ ownerState: CollectionOwnerState }>``;

const IntroTextGrid = styled(Grid, {
  name: 'Collection',
  slot: 'IntroTextGrid',
  overridesResolver: (_, styles) => [styles.introTextGrid]
})<{ ownerState: CollectionOwnerState }>``;

const IntroText = styled(ContentModule, {
  name: 'Collection',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState: CollectionOwnerState }>``;

const ItemsGrid = styled(Box, {
  name: 'Collection',
  slot: 'ItemsGrid',
  overridesResolver: (_, styles) => [styles.itemsGrid, styles.itemsContainerOnePerRow]
})<{ ownerState: CollectionOwnerState }>``;

const FiltersWrap = styled(Box, {
  name: 'Collection',
  slot: 'FiltersWrap',
  overridesResolver: (_, styles) => [styles.filtersWrap]
})<{ ownerState: CollectionOwnerState }>``;

const PaginationWrap = styled(Box, {
  name: 'Collection',
  slot: 'PaginationWrap',
  overridesResolver: (_, styles) => [styles.paginationWrap]
})<{ ownerState: CollectionOwnerState }>``;

const ResultsWrap = styled(Box, {
  name: 'Collection',
  slot: 'ResultsWrap',
  overridesResolver: (_, styles) => [styles.resultsWrap]
})<{ ownerState: CollectionOwnerState }>``;

const SearchBoxWrap = styled(Box, {
  name: 'Collection',
  slot: 'SearchBoxWrap',
  overridesResolver: (_, styles) => [styles.searchBoxWrap]
})<{ ownerState: CollectionOwnerState }>``;

export default Collection;
