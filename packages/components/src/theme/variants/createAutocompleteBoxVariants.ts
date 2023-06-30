import { Theme } from '@mui/material/styles';

export const homeVariant = (theme: Theme) => ({
  props: {
    variant: 'home'
  },
  style: {
    'marginTop': theme.spacing(1),
    'marginBottom': theme.spacing(1),

    '& .aa-Autocomplete[aria-expanded=true]': {
      '& .aa-Form': {
        borderRadius: `${theme.spacing(3.75)} ${theme.spacing(3.75)} 0 0`
      },

      '& .aa-InputWrapperPrefix': {
        [theme.breakpoints.down('md')]: {
          display: 'none'
        }
      }
    },

    '& .aa-Form': {
      'display': 'flex',
      'alignItems': 'center',
      'flexDirection': 'row-reverse',
      'minHeight': theme.spacing(7),
      'paddingLeft': theme.spacing(3),
      'paddingRight': theme.spacing(1),
      'border': 'transparent',
      'backgroundColor': theme.palette.common.white,
      'borderRadius': theme.spacing(3.75),

      '&:focus-within': {
        border: 'transparent',
        boxShadow: 'none'
      }
    },

    '& .aa-InputWrapperPrefix': {
      maxHeight: theme.spacing(5),
      paddingRight: 0
    },

    '& .aa-InputWrapperSuffix': {
      order: 1
    },

    '& .aa-SubmitButton': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: theme.spacing(5),
      maxHeight: theme.spacing(5),
      padding: 0,
      backgroundColor: theme.palette.background.darkGreen,
      border: 0,
      borderRadius: 25
    },

    '& .aa-SubmitIcon': {
      height: theme.spacing(3),
      width: theme.spacing(3),
      color: theme.palette.common.white
    }
  }
});

const autocompleteBoxVariants = [homeVariant];

const createAutocompleteBoxVariants = (theme: Theme) => {
  return autocompleteBoxVariants.map((creator) => creator(theme));
};

export default createAutocompleteBoxVariants;
