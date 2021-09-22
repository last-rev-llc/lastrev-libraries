import { Theme } from '@mui/material/styles';

export const defaultVariant = (theme: Theme) => ({
  props: {
    variant: 'default'
  },
  style: {
    // DEMO ONLY
    '& .MuiLink-root': {
      display: 'inline-block',
      marginTop: 4,
      padding: '10px 20px',
      backgroundColor: theme.palette.primary.main,
      textDecoration: 'none'
    }
  }
});

export const blackBoldVariant = () => ({
  props: {
    variant: 'black-bold'
  },
  style: {
    h1: {
      color: 'white'
    },
    h2: {
      color: 'white'
    }
  }
});

const variants = [defaultVariant, blackBoldVariant];

const createTextVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createTextVariants;
