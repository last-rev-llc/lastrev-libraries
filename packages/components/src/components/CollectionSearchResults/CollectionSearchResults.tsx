import React from 'react';
import {
  Hits,
  Highlight,
  connectStateResults,
  connectPagination
} from 'react-instantsearch-dom';
import { SearchState, SearchResults } from 'react-instantsearch-core';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiPagination from '@mui/material/Pagination';
import Typography, { TypographyProps } from '@mui/material/Typography';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import { CollectionProps } from '@last-rev/component-library/dist/components/Collection';

import CategoryLinks from '../CategoryLinks';
import { sidekick } from '../../utils/sidekick';

interface HitProps {
  categories: Array<string>;
  categoriesLinks: Array<string>;
}

// TODO: Search for proper type in Algolia
function Hit(props: any) {
  const hit = props.hit as HitProps;
  const categories = hit.categories.map((category: string, idx: number) => ({
    text: category,
    href: hit.categoriesLinks[idx]
  }));
  return (
    <>
      <HitTitle component={Highlight} variant="body2" attribute="title" hit={hit} />
      <HitDescription component={Highlight} variant="body2" attribute="content" hit={hit} />
      {categories ? (
        <Box data-testid="CollectionSearchResults-categories">
          <CategoryLinks links={categories} />
        </Box>
      ) : null}
    </>
  );
}

interface PaginationProps {
  nbPages?: number;
}

const QueryTitle = connectStateResults((props) => {
  const searchState = props.searchState as SearchState;
  return (
    searchState?.query ? (
      <Typography variant="h3" component="h3" mb={2}>
       {`Showing results for ${searchState?.query}`}
      </Typography>
    ) : null
  );
});

const StateResults = connectStateResults((props) => {
  const searchState = props.searchState as SearchState;
  const searchResults = props.searchResults as SearchResults;
  return (
    searchState?.query && searchResults?.nbHits ? (
      <Typography variant="body2" component="p">
       {`${searchResults?.nbHits} results for ${searchState?.query}`}
      </Typography>
    ) : null
  );
});

const Pagination = connectPagination((props: PaginationProps) => {
  return (
    <MuiPagination count={props.nbPages} variant="outlined" shape="rounded" />
  );
});

export const CollectionSearchResults = ({
  introText,
  sidekickLookup
}: CollectionProps) => {
  return (
    <ErrorBoundary>
      <Box data-testid="CollectionSearchResults" {...sidekick(sidekickLookup)}>
        {introText ? (
          <ContentModule
            {...introText}
            {...sidekick(sidekickLookup?.introText)}
            data-testid="CollectionSearchResults-introText"
          />
        ) : null}
        <QueryTitle />
        <StateResults />
        <HitList hitComponent={Hit} />
        <Pagination />
      </Box>
    </ErrorBoundary>
  );
};

const HitList = styled(Hits, {
  name: 'CollectionSearchResults',
  slot: 'Hits',
})(({ theme }) => ({
  '& ul': {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    paddingTop: theme.spacing(0.5)
  },
  '& li': {
    paddingTop: theme.spacing(4.5)
  },
  '& a:hover': {
    textDecoration: 'none'
  }
}));

const HitTitle = styled(Typography, {
  name: 'CollectionSearchResult',
  slot: 'HitTitle',
})<TypographyProps<React.ElementType>>(({ theme }) => ({
  display: 'block',
  paddingBottom: theme.spacing(1),
  fontWeight: 600
}));

const HitDescription = styled(Typography, {
  name: 'CollectionSearchResult',
  slot: 'HitDescription',
})<TypographyProps<React.ElementType>>(({ theme }) => ({
  display: 'block',
  paddingBottom: theme.spacing(2)
}));

export default CollectionSearchResults;
