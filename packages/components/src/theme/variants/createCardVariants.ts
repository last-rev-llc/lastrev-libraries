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

    '& > [class*="Card-cardLink"]': {
      color: 'transparent'
    },

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
      justifyContent: 'center',

      [theme.breakpoints.up('sm')]: {
        minHeight: theme.spacing(11.5)
      },

      ':last-child': {
        paddingBottom: theme.spacing(2)
      },

      '& .MuiTypography-h3': {
        ...theme.typography.h5,
        marginBottom: 0
      },

      '& .MuiTypography-body1': {
        ...theme.typography.body2,
        marginBottom: 0,
        color: theme.palette.midnight.A90
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

    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(2),
      borderTop: `1px solid ${theme.palette.midnight.A20}`
    },

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
      paddingLeft: 0,
      paddingRight: 0,

      [theme.breakpoints.down('sm')]: {
        '&:last-child': {
          paddingBottom: theme.spacing(1)
        }
      },

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