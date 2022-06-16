import React from 'react';
import { SearchBox as AlgoliaSearchBox } from 'react-instantsearch-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { useLocalizationContext } from '../LocalizationContext';

export interface SearchBoxProps {
  settings?: SettingsProps;
}

export interface SettingsProps {
  placeholder?: string;
}

export const SearchBox = ({ settings }: SearchBoxProps) => {
  const localization = useLocalizationContext();
  const { placeholder = localization['search.placeholder']?.shortTextValue ?? 'Search' } = settings as SettingsProps;

  return (
    <Root data-testid="SearchBox" className="ais-InstantSearch">
      <AlgoliaSearchBox translations={{ placeholder }} />
    </Root>
  );
};

const Root = styled(Box, {
  name: 'SearchBox',
  slot: 'Root'
})<{}>(({ theme }) => ({
  '& .ais-SearchBox-form': {
    'display': 'flex',
    'alignItems': 'center',
    'flexDirection': 'row-reverse',
    'justifyContent': 'flex-end',
    'minHeight': theme.spacing(7),
    'paddingLeft': theme.spacing(2),
    'paddingRight': theme.spacing(2),
    'border': 'transparent',
    'backgroundColor': theme.palette.common.white,
    'borderRadius': theme.spacing(3.75),

    '&:focus-within': {
      border: 'transparent',
      boxShadow: 'none'
    },

    '& .ais-SearchBox-input': {
      'order': 2,
      'width': '100%',
      'height': 44,
      'border': 0,
      'borderRadius': theme.spacing(3.75),
      'color': theme.palette.text.primary,
      'fontSize': 16,

      '&:focus': {
        outline: 'none'
      }
    },

    /* clears the ‘X’ from Chrome */
    '& input[type="search"]::-webkit-search-decoration': {
      display: 'none'
    },

    '& input[type="search"]::-webkit-search-cancel-button': {
      display: 'none'
    },

    '& input[type="search"]::-webkit-search-results-button': {
      display: 'none'
    },

    '& input[type="search"]::-webkit-search-results-decoration': {
      display: 'none'
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
      color: theme.palette.text.primary
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
