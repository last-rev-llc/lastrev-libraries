import React from 'react';
import dynamic from 'next/dynamic';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

import Grid from '../Grid';
import Background from '../Background';
import ContentModule from '../ContentModule';
import ErrorBoundary from '../ErrorBoundary';

// const HierarchicalMenu = dynamic(() => import('../Algolia/HierarchicalMenu'), { ssr: false });
// const Pagination = dynamic(() => import('../Algolia/Pagination'), { ssr: false });
// const Hits = dynamic(() => import('../Algolia/Hits'), { ssr: false });
// const InfiniteHits = dynamic(() => import('../Algolia/InfiniteHits'), { ssr: false });
// const SearchBox = dynamic(() => import('../Algolia/SearchBox'), { ssr: false });
// const CurrentRefinements = dynamic(() => import('../Algolia/CurrentRefinements'), { ssr: false });
// const AlgoliaSearch = dynamic(() => import('../Algolia/AlgoliaSearch'), { ssr: false });

import HierarchicalMenu from '../Algolia/HierarchicalMenu';
import Pagination from '../Algolia/Pagination';
import Hits from '../Algolia/Hits';
import InfiniteHits from '../Algolia/InfiniteHits';
import SearchBox from '../Algolia/SearchBox';
import CurrentRefinements from '../Algolia/CurrentRefinements';
import AlgoliaSearch from '../Algolia/AlgoliaSearch';

// Your code here

import type { CollectionProps, CollectionOwnerState } from './Collection.types';

const Collection = (props: CollectionProps) => {
  const ownerState = { ...props };

  const {
    backgroundImage,
    backgroundColor,
    items,
    variant,
    itemsAspectRatio,
    itemsVariant,
    sidekickLookup,
    introText,
    itemsConnection,
    indexName = 'articles',
    useInfinite
  } = props;

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
        <AlgoliaSearch indexName={indexName}>
          <ContentGrid ownerState={ownerState}>
            <CurrentRefinements ownerState={ownerState} />
            <FiltersWrap ownerState={ownerState}>
              <SearchBoxWrap ownerState={ownerState}>
                <SearchBox ownerState={ownerState} searchAsYouType />
              </SearchBoxWrap>

              <HierarchicalMenu
                limit={100}
                attributes={['categories.level-1', 'categories.level-2', 'categories.level-3']}
              />
            </FiltersWrap>

            <ResultsWrap ownerState={ownerState}>
              <ItemsGrid ownerState={ownerState}>
                {useInfinite ? <InfiniteHits ownerState={ownerState} /> : <Hits ownerState={ownerState} />}
              </ItemsGrid>

              {!useInfinite && (
                <PaginationWrap ownerState={ownerState}>
                  <Pagination ownerState={ownerState} />
                </PaginationWrap>
              )}
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

const Item = styled(ContentModule, {
  name: 'Collection',
  slot: 'Item',
  overridesResolver: (_, styles) => [styles.item]
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
