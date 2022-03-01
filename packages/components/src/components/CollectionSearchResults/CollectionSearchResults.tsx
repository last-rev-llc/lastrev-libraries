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
import Skeleton from '@mui/material/Skeleton';
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

// TODO: Find proper TS type in Algolia API
const Hit = (props: any) => {
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
};

const LoadingResults = () => {
  return (
    <React.Fragment>
      <Typography variant="h5" mb={1}>
        <Skeleton animation="wave" width="80%" />
      </Typography>
      <Skeleton animation="wave" height={12} width="92%" />
      <Skeleton animation="wave" height={12} width="90%" />
      <Box display="flex" mt={1}>
        <Skeleton animation="wave" height={28} width={80} sx={{ marginRight: 2 }} />
        <Skeleton animation="wave" height={28} width={60} />
      </Box>
    </React.Fragment>
  );
};

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

interface PaginationProps {
  nbPages?: number;
}

const Pagination = connectPagination((props: PaginationProps) => {
  return (
    props.nbPages !== undefined && props.nbPages > 0 ? (
      <MuiPagination count={props.nbPages} variant="outlined" shape="rounded" />
    ) : null
  );
});

const StateResults = connectStateResults((props) => {
  const searchState = props.searchState as SearchState;
  const searchResults = props.searchResults as SearchResults;
  const isSearching = props.searching || props.isSearchStalled;
  return (
    <>
      {searchState?.query && !!searchResults?.nbHits && !isSearching && (
        <Typography variant="body2" component="p">
          {`${searchResults?.nbHits} results for ${searchState?.query}`}
        </Typography>
      )}
      {isSearching && <LoadingResults />}
      {!isSearching && searchResults.nbHits === 0 && (
        <Typography variant="body2" component="p">
          No results found
        </Typography>
      )}
      <Box display={!isSearching && searchResults.nbHits !== 0 ? 'block' : 'none'}>
        <HitList hitComponent={Hit} />
        <Pagination />
      </Box>
    </>
  );
});

export const CollectionSearchResults = ({
  introText,
  sidekickLookup
}: CollectionProps) => {
  return (
    <ErrorBoundary>
      <Box mb={6} data-testid="CollectionSearchResults" {...sidekick(sidekickLookup)}>
        {introText ? (
          <ContentModule
            {...introText}
            {...sidekick(sidekickLookup?.introText)}
            data-testid="CollectionSearchResults-introText"
          />
        ) : null}
        <QueryTitle />
        <StateResults />
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
