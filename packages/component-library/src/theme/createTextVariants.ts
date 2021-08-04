import { Theme } from '@material-ui/core/styles';

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

const variants = [defaultVariant];

const createTextVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createTextVariants;
