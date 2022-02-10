import { Theme } from '@mui/material/styles';

export const homeVariant = (theme: Theme) => ({
  props: {
    variant: 'home'
  },
  style: {
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
      'borderRadius': theme.spacing(3.75),
      'minHeight': 56,
      'display': 'flex',
      'flexDirection': 'row-reverse',
      'paddingLeft': theme.spacing(3),
      'paddingRight': theme.spacing(3),
      'alignItems': 'center',
      'border': 'transparent',
      '&:focus-within': {
        border: 'transparent',
        boxShadow: 'none'
      }
    },
    '& .aa-Input': {
      fontSize: 16,
      //TODO: change to theme color
      color: theme.palette.grey["100"]
    },
    '& .aa-InputWrapperSuffix': {
      order: 1
    },
    '& .aa-SubmitButton': {
      //TODO: change to theme color
      backgroundColor: theme.palette.background.integralOrange,
      maxHeight: 40,
      maxWidth: 40,
      borderRadius: 25,
      display: 'flex',
      alignItems: 'center'
    },
    '& .aa-SubmitIcon': {
      color: 'white',
      [theme.breakpoints.down('md')]: {
        height: 16,
        width: 16
      }
    },
    '& .aa-ClearIcon': {
      // theme.palette.secondary.main, TODO: change to theme color
      color: '#00324a'
    }
  }
});

const searchBoxVariants = [homeVariant];

const createSearchBoxVariants = (theme: Theme) => {
  return searchBoxVariants.map((creator) => creator(theme));
};

export default createSearchBoxVariants;
