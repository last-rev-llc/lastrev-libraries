import React from 'react';
import algoliasearch from 'algoliasearch';
import {
  // TODO: Needed for Collection results and filters
  // Hits,
  SearchBox as AlgoliaSearchBox,
  InstantSearch
  // TODO: Needed for Collection results and filters
  // Pagination,
  // Highlight,
  // ClearRefinements,
  // RefinementList,
  // Configure,
} from 'react-instantsearch-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// TODO: Needed for Collection results and filters
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Typography, { TypographyProps } from '@mui/material/Typography';

// import CategoryLinks from '../CategoryLinks';

export interface SearchBoxProps {
  settings?: SettingsProps;
}

export interface SettingsProps {
  placeholder?: string;
}

const algoliaOptions = {
  appId: (process.env.ALGOLIA_APP_ID as string),
  searchApiKey: (process.env.ALGOLIA_SEARCH_API_KEY as string),
  sourceId: 'articles',
  indexName: 'articles',
};

const searchClient = algoliasearch(algoliaOptions.appId, algoliaOptions.searchApiKey);

// TODO: Move to CollectionResults cmp
// function Hit(props: any) {
//   const categories = [
//     {
//       text: "Tag Manager/Tagging Integrations",
//       href: "integral-signal-help-and-tagging-greater-than-tag-manager-tagging"
//     },
//     {
//       text: "Getting Started",
//       href: "getting-started"
//     }
//   ];
//   return (
//     <>
//       <HitTitle component={Highlight} variant="body2" attribute="title" hit={props.hit} />
//       <HitDescription component={Highlight} variant="body2" attribute="content" hit={props.hit} />
//       {categories ? (
//         <Box data-testid="Article-categories">
//           <CategoryLinks links={categories} />
//         </Box>
//       ) : null}
//     </>
//   );
// }

export const SearchBox = ({ settings }: SearchBoxProps) => {
  const { placeholder = 'Search' } = settings as SettingsProps;
  return (
    <Root data-testid="SearchBox" className="ais-InstantSearch">
      <InstantSearch
        searchClient={searchClient}
        indexName="IAS Search"
      >
        <AlgoliaSearchBox translations={{ placeholder }} />
      </InstantSearch>
      {/* TODO: Needed for Collection results and filters */}
      {/* <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={2}>
            <ClearRefinements />
            <Filters attribute="categories" />
            <Configure hitsPerPage={8} />
          </Grid>
          <Grid item sm={12} md={10} lg={8}>
            <AlgoliaSearchBox />
            <HitList hitComponent={Hit} />
            <Pagination />
          </Grid>
        </Grid>
      </Container> */}
    </Root>
  );
};

// TODO: Move to CollectionFilter cmp
// const Filters = styled(RefinementList, {
//   name: 'Filters',
//   slot: 'Wrap',
// })<{}>(({ theme }) => ({
//   '& .ais-RefinementList-label': {
//     ...theme.typography.body3,
//     lineHeight: '16px'
//   },
//   '& .ais-RefinementList-checkbox': {
//     width: 16,
//     height: 16,
//     marginRight: theme.spacing(1)
//   },
// }));

// TODO: Move to CollectionResults cmp
// const HitList = styled(Hits, {
//   name: 'HitList',
//   slot: 'Wrap',
// })<{}>(({ theme }) => ({
  // '& ul': {
  //   listStyle: 'none',
  //   padding: 0
  // },
//   '& li': {
//     '&:not(:first-of-type)': {
//       paddingTop: theme.spacing(4.5)
//     }
//   },
//   '& a:hover': {
//     textDecoration: 'none'
//   }
// }));

// TODO: Move to CollectionResults cmp
// const HitTitle = styled(Typography, {
//   name: 'Hit',
//   slot: 'Title',
// })<TypographyProps<React.ElementType>>(({ theme }) => ({
//   display: 'block',
//   paddingBottom: theme.spacing(1),
//   fontWeight: 600
// }));

// TODO: Move to CollectionResults cmp
// const HitDescription = styled(Typography, {
//   name: 'Hit',
//   slot: 'Description',
// })<TypographyProps<React.ElementType>>(({ theme }) => ({
//   display: 'block',
//   paddingBottom: theme.spacing(2)
// }));

const Root = styled(Box, {
  name: 'SearchBox',
  slot: 'Root',
})<{}>(({ theme }) => ({
  '& .ais-SearchBox-form': {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    minHeight: theme.spacing(7),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    border: 'transparent',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(3.75),

    '&:focus-within': {
      border: 'transparent',
      boxShadow: 'none'
    },

    '& .ais-SearchBox-input': {
      order: 2,
      width: '100%',
      height: 44,
      border: 0,
      borderRadius: theme.spacing(3.75),
      color: theme.palette.text.primary,
      fontSize: 16,

      '&:focus': {
        outline: 'none'
      }
    },

    '& .ais-InputWrapperPrefix': {
      maxHeight: theme.spacing(5),
      paddingRight: theme.spacing(1)
    },

    '& .ais-SearchBox-submit': {
      order: 4,
      display: 'flex',
      alignItems: 'center',
      maxWidth: theme.spacing(5),
      maxHeight: theme.spacing(5),
      marginRight: theme.spacing(1),
      backgroundColor: 'transparent',
      border: 0,
      borderRadius: 25
    },

    '& .ais-SearchBox-submitIcon': {
      height: theme.spacing(2),
      width: theme.spacing(2),
      color: theme.palette.text.primary,
    },

    '& .ais-SearchBox-reset': {
      order: 1,
      backgroundColor: 'transparent',
      border: 0,
      color: theme.palette.text.primary
    }
  }
}));

export default SearchBox;
