import { Theme } from '@mui/material/styles';

export const blogVariant = (theme: Theme) => ({
  props: {
    variant: 'blog'
  },
  style: {
    '& [class$=Media-root]': {
      width: '100%',
      padding: theme.spacing(10, 5),
      transform: 'scale(1.1)'
    },
    '.MuiTypography-h1': {
      color: theme.palette.text.secondary
    },
    '.MuiTypography-h2': {
      color: theme.palette.text.secondary
    },
    '.MuiTypography-h3': {
      color: theme.palette.text.secondary
    },
    '.MuiTypography-h4': {
      color: theme.palette.text.secondary
    },
    '.MuiTypography-body1': {
      paddingBottom: '1.5rem'
    }
  }
});

const textVariants = [blogVariant];

const createTextVariants = (theme: Theme) => {
  return textVariants.map((creator) => creator(theme));
};

export default createTextVariants;
