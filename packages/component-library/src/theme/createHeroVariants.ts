import { Theme } from '@material-ui/core/styles';

export const defaultVariant = (theme: Theme) => ({
  props: {
    variant: 'default'
  },
  style: {
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(4, 0)
    },
    'h1': {
      color: theme.palette.grey.A700
    },
    'h2': {
      color: theme.palette.secondary.main
    },
    '& [class*="contentContainer"] > .MuiGrid-container > .MuiGrid-root': {
      [theme.breakpoints.down('lg')]: {
        '& .MuiGrid-root': {
          textAlign: 'center'
        },
        '& ul': {
          display: 'inline-block',
          padding: 0
        },
        '& ol': {
          display: 'inline-block',
          padding: 0
        }
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: '50%'
      }
    },
    '& .MuiButton-containedPrimary': {
      'color': theme.palette.primary.contrastText,
      '& .MuiIcon-root': {
        color: theme.palette.primary.contrastText
      }
    }
  }
});

export const centeredVariant = (theme: Theme) => ({
  props: {
    variant: 'centered'
  },
  style: {
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(4, 0)
    },
    '& > .MuiContainer-root > .MuiGrid-container': {
      flexDirection: 'column',
      justifyContent: 'center',
      flexWrap: 'nowrap',
      maxWidth: theme.breakpoints.values.lg,
      margin: '0 auto',
      [theme.breakpoints.down('sm')]: {
        '& div:nth-child(2)': {
          maxWidth: '80%'
        }
      }
    },
    '& .MuiGrid-root': {
      textAlign: 'center'
    },
    'h1': {
      color: theme.palette.grey.A700
    },
    'h2': {
      color: theme.palette.secondary.main
    },
    '& ul': {
      display: 'inline-block',
      padding: 0,
      textAlign: 'left'
    },
    '& ol': {
      display: 'inline-block',
      padding: 0,
      textAlign: 'left'
    },
    '& .MuiButton-containedPrimary': {
      'color': theme.palette.primary.contrastText,
      '& .MuiIcon-root': {
        color: theme.palette.primary.contrastText
      }
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

const variants = [defaultVariant, centeredVariant, gradientBackgroundVariant];

const createHeroVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createHeroVariants;
