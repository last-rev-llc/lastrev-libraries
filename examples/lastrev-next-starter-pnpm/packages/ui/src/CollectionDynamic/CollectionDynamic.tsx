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
import Card from '../Card';

import { layoutConfig } from '../Collection/Collection.theme';

import type { CollectionDynamicProps, CollectionDynamicOwnerState } from './CollectionDynamic.types';

const CollectionDynamic = (props: CollectionDynamicProps) => {
  const ownerState = { ...props };

  const { backgroundImage, backgroundColor, variant, sidekickLookup, introText, algoliaSettings } = props;

  return (
    <ErrorBoundary>
      <Root ownerState={ownerState} {...sidekick(sidekickLookup)} data-testid={`CollectionDynamic-${variant}`}>
        <CollectionDynamicBackground
          background={backgroundImage}
          backgroundColor={backgroundColor}
          testId="CollectionDynamic-background"
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
            <FiltersOuterWrap ownerState={ownerState}>
              {!!algoliaSettings?.indexName && !!algoliaSettings?.showCurrentRefinements ? (
                <CurrentRefinementsWrap ownerState={ownerState}>
                  <CurrentRefinements ownerState={ownerState} />
                </CurrentRefinementsWrap>
              ) : null}

              {!!algoliaSettings?.indexName && (!!algoliaSettings?.showFilters || !!algoliaSettings?.showSearchBox) ? (
                <FiltersWrap ownerState={ownerState}>
                  {!!algoliaSettings?.indexName && !!algoliaSettings?.showSearchBox ? (
                    <SearchBoxWrap ownerState={ownerState}>
                      <SearchBox ownerState={ownerState} searchAsYouType={!!algoliaSettings?.searchAsYouType} />
                    </SearchBoxWrap>
                  ) : null}

                  {!!algoliaSettings?.indexName && !!algoliaSettings?.showFilters ? (
                    <Filters
                      ownerState={ownerState}
                      filters={algoliaSettings.filters ?? algoliaSettings.facetFilters}
                    />
                  ) : null}
                </FiltersWrap>
              ) : null}
            </FiltersOuterWrap>

            <ResultsWrap ownerState={ownerState}>
              <ItemsGrid ownerState={ownerState}>
                {!!algoliaSettings?.indexName && !!algoliaSettings?.useInfiniteHits ? (
                  <InfiniteHits ownerState={ownerState} />
                ) : null}

                {!!algoliaSettings?.indexName && !algoliaSettings?.useInfiniteHits ? (
                  <>
                    <Hits
                      ownerState={ownerState}
                      HitComponent={Card}
                      layoutConfig={layoutConfig}
                      gridLayout={variant}
                    />
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
  name: 'CollectionDynamic',
  slot: 'Root',
  overridesResolver: ({ ownerState }, styles) => [styles.root, styles[`${ownerState?.variant}`]]
})<{ ownerState: CollectionDynamicOwnerState }>``;

const CollectionDynamicBackground = styled(Background, {
  name: 'CollectionDynamic',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const ContentGrid = styled(Grid, {
  name: 'CollectionDynamic',
  slot: 'ContentGrid',
  overridesResolver: (_, styles) => [styles.contentGrid]
})<{ ownerState: CollectionDynamicOwnerState }>``;

const IntroTextGrid = styled(Grid, {
  name: 'CollectionDynamic',
  slot: 'IntroTextGrid',
  overridesResolver: (_, styles) => [styles.introTextGrid]
})<{ ownerState: CollectionDynamicOwnerState }>``;

const IntroText = styled(ContentModule, {
  name: 'CollectionDynamic',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState: CollectionDynamicOwnerState }>``;

const ItemsGrid = styled(Box, {
  name: 'CollectionDynamic',
  slot: 'ItemsGrid',
  overridesResolver: (_, styles) => [styles.itemsGrid, styles.itemsContainerOnePerRow]
})<{ ownerState: CollectionDynamicOwnerState }>``;

const FiltersOuterWrap = styled(Grid, {
  name: 'CollectionDynamic',
  slot: 'FiltersOuterWrap',
  overridesResolver: (_, styles) => [styles.filtersOuterWrap]
})<{ ownerState: CollectionDynamicOwnerState }>``;

const FiltersWrap = styled(Box, {
  name: 'CollectionDynamic',
  slot: 'FiltersWrap',
  overridesResolver: (_, styles) => [styles.filtersWrap]
})<{ ownerState: CollectionDynamicOwnerState }>``;

const PaginationWrap = styled(Box, {
  name: 'CollectionDynamic',
  slot: 'PaginationWrap',
  overridesResolver: (_, styles) => [styles.paginationWrap]
})<{ ownerState: CollectionDynamicOwnerState }>``;

const CurrentRefinementsWrap = styled(Box, {
  name: 'CollectionDynamic',
  slot: 'CurrentRefinementsWrap',
  overridesResolver: (_, styles) => [styles.currentRefinementsWrap]
})<{ ownerState: CollectionDynamicOwnerState }>``;

const ResultsWrap = styled(Box, {
  name: 'CollectionDynamic',
  slot: 'ResultsWrap',
  overridesResolver: (_, styles) => [styles.resultsWrap]
})<{ ownerState: CollectionDynamicOwnerState }>``;

const SearchBoxWrap = styled(Box, {
  name: 'CollectionDynamic',
  slot: 'SearchBoxWrap',
  overridesResolver: (_, styles) => [styles.searchBoxWrap]
})<{ ownerState: CollectionDynamicOwnerState }>``;

export default CollectionDynamic;
