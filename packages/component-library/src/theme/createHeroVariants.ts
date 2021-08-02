import { Theme } from '@material-ui/core/styles';

export const defaultVariant = (theme: Theme) => ({
  props: {
    variant: 'default'
  },
  style: {
    'h1': {
      color: theme.palette.grey.A700
    },
    'h2': {
      color: theme.palette.secondary.main
    },

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

export const gradientBackgroundVariant = () => ({
  props: {
    variant: 'gradient-background'
  },
  style: {
    background: 'linear-gradient(50deg, rgba(48,205,194,1) 0%, rgba(0,92,122,1) 100%)',
    h1: {
      color: 'white'
    },
    h2: {
      color: 'white'
    },
    p: {
      color: 'white'
    }
  }
});

const variants = [defaultVariant, gradientBackgroundVariant];

const createHeroVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createHeroVariants;
