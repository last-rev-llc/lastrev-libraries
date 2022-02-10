import { Theme } from '@mui/material/styles';

export const defaultCard = (theme: Theme) => ({
  props: {
    variant: 'default'
  },
  style: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
    boxShadow: 'none',
    textAlign: 'center',

    '& .MuiCardMedia-root': {
      maxHeight: theme.spacing(13.5),

      [theme.breakpoints.up('sm')]: {
        minHeight: theme.spacing(15.5)
      },

      '& img': {
        width: '100%',
        maxWidth: '100%',
        objectFit: 'cover',

        [theme.breakpoints.down('md')]: {
          aspectRatio: '15/6'
        }
      }
    },

    '& .MuiCardContent-root': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      minHeight: theme.spacing(11.5),
      height: '100%',

      ':last-child': {
        paddingBottom: theme.spacing(2)
      },

      '& .MuiTypography-h3': {
        ...theme.typography.h5
      },

      '& .MuiTypography-body1': {
        ...theme.typography.body2
      },

      '& .MuiBox-root': {
        paddingTop: theme.spacing(1)
      }
    }
  }
});

export const linksListCard = (theme: Theme) => ({
  props: {
    variant: 'links list'
  },
  style: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
    boxShadow: 'none',
    textAlign: 'left',

    '& .MuiTypography-root': {
      color: theme.palette.text.primary,
      textDecoration: 'none'
    },

    '& .MuiTypography-h3': {
      paddingBottom: theme.spacing(2),
      ...theme.typography.h6
    },

    '& .MuiTypography-inherit': {
      position: 'relative',
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(1.5),
      ...theme.typography.body2,

      ':last-child': {
        marginBottom: theme.spacing(2)
      },

      '&:hover': {
        textDecoration: 'underline'
      },

      '&:after': {
        content: '"•"',
        position: 'absolute',
        top: 0,
        left: theme.spacing(-2),
        color: theme.palette.common.black
      }
    },

    '& .MuiCardActions-root': {
      display: 'flexbox',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: 0
    },

    '& .MuiButton-root': {
      padding: 0,
      color: theme.palette.primary.dark,
      textTransform: 'inherit',

      '&:hover': {
        textDecoration: 'underline'
      }
    },

    '& .MuiCardContent-root': {
      [theme.breakpoints.up('md')]: {
        padding: 0
      }
    }
  }
});

export const cardVariants = [defaultCard, linksListCard];

const createCardVariants = (theme: Theme) => {
  return cardVariants.map((creator) => creator(theme));
};

export default createCardVariants;
