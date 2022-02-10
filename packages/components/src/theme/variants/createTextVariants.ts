import { Theme } from '@mui/material/styles';

export const articleVariant = (theme: Theme) => ({
  props: {
    variant: 'article'
  },
  style: {
    '& h2:not(:first-of-type)': {
      paddingTop: theme.spacing(2)
    },

    '.MuiTypography-h1': {
      marginBottom: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      borderBottom: `1px solid ${theme.palette.midnight.A20}`,
      ...theme.typography.h3,

      '&:not:(:first-of-type)': {
        paddingTop: theme.spacing(2)
      }
    },

    '.MuiTypography-h2': {
      marginBottom: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      borderBottom: `1px solid ${theme.palette.midnight.A20}`,
      ...theme.typography.h3,

      '&:not:(:first-of-type)': {
        paddingTop: theme.spacing(2)
      }
    },

    '.MuiTypography-h3': {
      ...theme.typography.h4
    },

    '.MuiTypography-h4': {
      ...theme.typography.h5
    },

    '.MuiTypography-h5': {
      ...theme.typography.h6
    },

    '& [class$=Media-root]': {
      width: '100%',
      padding: theme.spacing(4, 0)
    },
  }
});

const textVariants = [
  articleVariant
];

const createTextVariants = (theme: Theme) => {
  return textVariants.map((creator) => creator(theme));
};

export default createTextVariants;
