import { Theme } from '@material-ui/core/styles';

export const mediaCardVariant = (theme: Theme) => ({
  props: {
    variant: 'media'
  },
  style: {
    'position': 'relative',
    'maxWidth': 400,
    'minWidth': 400,

    '& img': {
      opacity: 1,
      transition: 'opacity ease .15s'
    },

    '&:hover': {
      'boxShadow': `0 0 0 2px ${theme.palette.primary.main}`,

      '& img': {
        opacity: 0.7,
        transition: 'opacity ease .1s'
      }
    },

    '& .MuiCardContent-root': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 1,
      padding: '0 !important',
      textAlign: 'center',
      transform: 'translate(-50%, -50%)'
    },

    '& .MuiTypography-h3': {
      color: 'black'
    },

    '& .MuiCardActions-root': {
      display: 'none'
    }
  }
});

export const avatarCardVariant = (theme: Theme) => ({
  props: {
    variant: 'avatar'
  },
  style: {
    'justifyContent': 'flex-start',
    'flexDirection': 'row',
    // 'flexWrap': 'wrap',
    'maxWidth': 768,
    'minWidth': 320,
    'padding': 20,

    // Image wrap
    '& .MuiBox-root': {
      width: 'auto',
      height: 'auto'
    },

    '& img': {
      width: 150,
      height: 150,
      margin: 20,
      borderRadius: '50%',
      border: `2px solid ${theme.palette.primary.main}`,
      objectFit: 'cover'
    },

    '& .MuiCardContent-root': {
      'textAlign': 'left',

      '& .MuiLink-root': {
        margin: 0
      }
    },

    '& .MuiTypography-h3': {
      color: 'black'
    }
  }
});

export const avatarLargeCardVariant = (theme: Theme) => ({
  props: {
    variant: 'avatar-large'
  },
  style: {
    'justifyContent': 'center',
    'width': 300,
    'height': 300,
    'minWidth': 300,
    'padding': 20,

    '& img': {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: `2px solid ${theme.palette.primary.main}`,
      objectFit: 'cover'
    },

    '& .MuiCardContent-root': {
      display: 'none'
    },

    '& .MuiCardActions-root': {
      display: 'none'
    }
  }
});

export const squareCardVariant = (theme: Theme) => ({
  props: {
    variant: 'square'
  },
  style: {
    'width': '100%',
    'height': '100%',
    'maxWidth': 768,

    '&:hover': {
      '& .MuiCardContent-root': {
        backgroundColor: theme.palette.tertiary.main,
        boxShadow: `inset 0 0 0 2px ${theme.palette.primary.main}`
      },

      '& .MuiTypography-h3': {
        color: 'black'
      }
    },

    '& .MuiCardContent-root': {
      'display': 'flex',
      'justifyContent': 'center',
      'alignItems': 'center',
      'height': '100%',
      'padding': 0,
      'backgroundColor': theme.palette.secondary.main,

      '&:after': {
        content: '""',
        display: 'block',
        paddingBottom: '100%'
      },

      '&:last-child': {
        paddingBottom: 0
      }
    },

    '& .MuiTypography-h3': {
      paddingBottom: 0,
      color: 'white'
    },

    '& .MuiBox-root': {
      display: 'none'
    },
    '& .MuiTypography-h4': {
      display: 'none'
    },
    '& .MuiTypography-body2': {
      display: 'none'
    },
    '& .MuiCardActions-root': {
      display: 'none'
    }
  }
});

export const standardCardVariant = (theme: Theme) => ({
  props: {
    variant: 'standard'
  },
  style: {
    'justifyContent': 'flex-start',
    'width': 300, // DEMO ONLY
    'paddingBottom': 15,
    'backgroundColor': 'white',
    'transition': 'background-color ease .15s',

    '&:hover': {
      backgroundColor: theme.palette.tertiary.main,
      transition: 'background-color ease .15s'
    },

    '& .MuiBox-root': {
      textAlign: 'center'
    },

    '& img': {
      maxWidth: 160,
      height: 'auto',
      margin: '20px auto'
    },

    '& .MuiLink-root': {
      padding: '10px 20px',
      backgroundColor: theme.palette.primary.main,
      textDecoration: 'none'
    }
  }
});

export const standardRoundedCardVariant = (theme: Theme) => ({
  props: {
    variant: 'standard-round'
  },
  style: {
    'justifyContent': 'flex-start',
    'width': 300, // DEMO ONLY
    'paddingBottom': 15,
    'border': `2px solid ${theme.palette.secondary.main}`,
    'borderRadius': 20,
    'transition': 'background-color ease .15s',

    '&:hover': {
      backgroundColor: theme.palette.tertiary.main,
      borderColor: theme.palette.primary.main,
      transition: 'background-color ease .15s'
    },

    '& .MuiBox-root': {
      textAlign: 'center'
    },

    '& img': {
      maxWidth: 160,
      height: 'auto',
      margin: '20px auto'
    },

    '& .MuiLink-root': {
      padding: '10px 20px',
      backgroundColor: theme.palette.secondary.main,
      color: 'white',
      textDecoration: 'none'
    }
  }
});

const variants = [
  mediaCardVariant,
  avatarCardVariant,
  avatarLargeCardVariant,
  squareCardVariant,
  standardCardVariant,
  standardRoundedCardVariant
];

const createCardVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createCardVariants;
