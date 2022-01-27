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
      // TODO: Move all hex colors to theme
      borderBottom: '1px solid #CCD6DB',
      fontSize: '1.75rem',
      lineHeight: 1.5,

      '&:not:(:first-of-type)': {
        paddingTop: theme.spacing(2)
      }
    },

    '.MuiTypography-h2': {
      marginBottom: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      // TODO: Move all hex colors to theme
      borderBottom: '1px solid #CCD6DB',
      fontSize: '1.75rem',
      lineHeight: 1.5,

      '&:not:(:first-of-type)': {
        paddingTop: theme.spacing(2)
      }
    },

    '.MuiTypography-h3': {
      fontSize: '1.5rem',
      lineHeight: 1.5
    },

    '.MuiTypography-h4': {
      fontSize: '1.25rem',
      lineHeight: 1.5
    },

    '.MuiTypography-h5': {
      fontSize: '1.125rem',
      lineHeight: 1.5555
    },

    '.MuiTypography-h6': {
      fontSize: '1.125rem',
      lineHeight: 1.5555
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
