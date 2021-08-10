import { Theme } from '@material-ui/core/styles';

export const mediaCardVariant = (theme: Theme) => ({
  props: {
    variant: 'media'
  },
  style: {
    'position': 'relative',
    'maxWidth': 400,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
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
    '& .img': {
      width: '100%'
    },
    '& .MuiCardContent-root': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 1,
      padding: '0 !important',
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

export const mediaHoverCardVariant = (theme: Theme) => ({
  props: {
    variant: 'media-hover'
  },
  style: {
    //to do: check typografy sizes when mobile
    'position': 'relative',
    'width': '100%',
    '& img': {
      width: '100%', //when its width is 100% the carousel looks much smaller, but when adding a size (for example: 300px), looks much better, maybe we could like this to decided by the creator of a content
      [theme.breakpoints.down('md')]: {
        width: '100%'
      }
    },
    '&:hover': {
      'boxShadow': `0 0 0 2px ${theme.palette.primary.main}`,
      '& img': {
        opacity: 0.7,
        transition: 'opacity ease .1s'
      },
      '& .MuiCardContent-root': {
        display: 'block'
      }
    },
    '& .MuiCardContent-root': {
      display: 'none',
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 1,
      padding: '0 !important',
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

export const mediaAndTextCardVariant = (theme: Theme) => ({
  props: {
    variant: 'media-and-text'
  },
  style: {
    'width': '100%',
    'display': 'flex',
    'flexDirection': 'row',
    'background': theme.palette.secondary.main,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      padding: theme.spacing(2)
    },
    '& .MuiBox-root': {
      padding: theme.spacing(5),
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(1)
      }
    },
    '& .MuiTypography-root': {
      color: 'white'
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
    'display': 'flex',
    'justifyContent': 'flex-start',
    'flexDirection': 'row',
    'maxWidth': 768, //we should make this as a default size
    'minWidth': 320,
    'padding': 20,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      maxWidth: '100%'
    },
    '& img': {
      width: 150,
      height: 150,
      borderRadius: '50%',
      border: `2px solid ${theme.palette.primary.main}`,
      objectFit: 'cover'
    },
    '& .MuiCardActions-root': {
      display: 'flex'
    },
    '& .MuiCardActions-root .MuiButton-root': {
      margin: 'inherit'
    },
    '& .MuiCardContent-root': {
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

//to do: not rendering text, check why
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
        backgroundColor: theme.palette.quartiary.main,
        boxShadow: `inset 0 0 0 2px ${theme.palette.primary.main}`
      },

      '& .MuiTypography-h3': {
        color: 'black'
      }
    },

    '& .MuiCardContent-root': {
      'display': 'flex',
      'flexDirection': 'column',
      'justifyContent': 'center',
      'alignItems': 'center',
      'height': '100%',
      'padding': '0 16px',
      'backgroundColor': theme.palette.secondary.main,
      'aspectRatio': '1',

      '&:last-child': {
        paddingBottom: 0
      }
    },

    '& .MuiTypography-h3': {
      paddingBottom: 0,
      color: 'white'
    },

    '& img': {
      display: 'none'
    },
    '& .MuiTypography-h4': {
      display: 'none'
    },
    '& .MuiTypography-body1': {
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
      backgroundColor: theme.palette.quartiary.main,
      transition: 'background-color ease .15s'
    },
    // '& .MuiBox-root': {
    //   textAlign: 'center'
    // },
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
      'backgroundColor': theme.palette.quartiary.main,
      'borderColor': theme.palette.primary.main,
      'transition': 'background-color ease .15s',
      '& .MuiButton-root': {
        color: theme.palette.pink.main
      }
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
  mediaAndTextCardVariant,
  avatarCardVariant,
  avatarLargeCardVariant,
  squareCardVariant,
  standardCardVariant,
  standardRoundedCardVariant,
  mediaHoverCardVariant
];

const createCardVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createCardVariants;
