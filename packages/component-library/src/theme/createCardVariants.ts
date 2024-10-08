import { Theme } from '@mui/material/styles';

export const mediaCardVariant = (theme: Theme) => ({
  props: {
    variant: 'media'
  },
  style: {
    'position': 'relative',
    [theme.breakpoints.down('lg')]: {
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
      [theme.breakpoints.down('lg')]: {
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
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      padding: theme.spacing(2)
    },
    '& .MuiBox-root': {
      padding: theme.spacing(5),
      [theme.breakpoints.down('lg')]: {
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

export const profileColumnCardVariant = (theme: Theme) => ({
  props: {
    variant: 'profile-column'
  },
  style: {
    'display': 'flex',
    'justifyContent': 'center',
    'flexDirection': 'column',
    'minWidth': 320,
    'padding': theme.spacing(0, 3, 6),
    'maxWidth': '100%',
    '& img': {
      width: 280,
      height: 280,
      marginTop: theme.spacing(6),
      borderRadius: '50%',
      border: `2px solid ${theme.palette.primary.main}`,
      objectFit: 'cover'
    },
    '& .MuiCardActions-root': {
      display: 'flex'
    },
    '& .MuiCardContent-root': {
      'padding': theme.spacing(6, 4, 0),
      '&:last-child': {
        paddingBottom: 0
      }
    },
    '& .MuiTypography-h3': {
      color: 'black'
    }
  }
});

export const profileRowCardVariant = (theme: Theme) => ({
  props: {
    variant: 'profile-row'
  },
  style: {
    'display': 'flex',
    'justifyContent': 'flex-start',
    'flexDirection': 'row',
    'minWidth': 320,
    'padding': theme.spacing(0, 3, 6),
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      maxWidth: '100%'
    },
    '& img': {
      width: 280,
      height: 280,
      marginTop: theme.spacing(6),
      borderRadius: '50%',
      border: `2px solid ${theme.palette.primary.main}`,
      objectFit: 'cover'
    },
    '& .MuiSkeleton-root': {
      borderRadius: '50%',
      transform: 'none'
    },
    '& .MuiCardActions-root': {
      display: 'flex'
    },
    '& .MuiCardContent-root': {
      'padding': theme.spacing(6, 4, 0),
      'textAlign': 'left',
      '&:last-child': {
        paddingBottom: 0
      },
      '& .MuiButton-root': {
        margin: 0
      },
      '& .MuiLink-root': {
        margin: 0
      }
    },
    '& .MuiTypography-h3': {
      color: 'black'
    }
  }
});

export const profileImageCardVariant = (theme: Theme) => ({
  props: {
    variant: 'profile-image'
  },
  style: {
    'justifyContent': 'center',
    'width': '100%',
    'minWidth': 200,
    'padding': 20,
    '& img': {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: `2px solid ${theme.palette.primary.main}`,
      objectFit: 'cover',
      aspectRatio: '1'
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

    '&:hover': {
      '& .MuiCardContent-root': {
        backgroundColor: theme.palette.quartiary?.main,
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
    'width': '100%',
    'minWidth': 200,
    'paddingBottom': 15,
    'backgroundColor': 'white',
    'transition': 'background-color ease .15s',

    '&:hover': {
      backgroundColor: theme.palette.quartiary?.main,
      transition: 'background-color ease .15s'
    },
    // '& .MuiBox-root': {
    //   textAlign: 'center'
    // },
    '& img': {
      // maxWidth: 160,
      maxWidth: 'calc(100% - 36px)',
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
    'width': '100%',
    'paddingBottom': 15,
    'border': `2px solid ${theme.palette.secondary.main}`,
    'borderRadius': 20,
    'transition': 'background-color ease .15s',

    '&:hover': {
      'backgroundColor': theme.palette.quartiary?.main,
      'borderColor': theme.palette.primary.main,
      'transition': 'background-color ease .15s',
      '& .MuiButton-root': {
        color: theme.palette.secondary.main
      }
    },

    '& img': {
      // maxWidth: 160,
      maxWidth: 'calc(100% - 36px)',
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

export const standardBlogCardVariant = (theme: Theme) => ({
  props: {
    variant: 'standard-blog'
  },
  style: {
    'justifyContent': 'flex-start',
    'transition': 'background-color ease .15s',

    '& .MuiCardContent-root': {
      'marginTop': 20,
      '&:last-child': {
        paddingBottom: 0
      }
    },
    '& .MuiCardActions-root': {
      'justifyContent': 'center',
      'width': 'calc(100% + 40px)',
      'margin': '24px 24px 0 -20px',
      'padding': theme.spacing(3, 0),
      'background': theme.palette.secondary.main,
      '& .MuiButton-root': {
        margin: theme.spacing(0, 0.5)
      }
    },
    '& .MuiButton-root': {
      'position': 'relative',
      'margin': theme.spacing(0, 0.5),
      'padding': theme.spacing(1),
      'background': 'transparent',
      'color': 'white',
      'lineHeight': '1.2',
      'textTransform': 'capitalize',
      '&:hover': {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main
      },
      '&:not(:last-child)': {
        '&:after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          right: -4,
          width: 1,
          height: 'calc(100% - 16px)',
          backgroundColor: 'white',
          transform: 'translateY(-50%)'
        }
      }
    },
    '& > .MuiBox-root': {
      'position': 'relative',
      '&:after': {
        content: '">"',
        display: 'block',
        background: theme.palette.primary.main,
        position: 'absolute',
        bottom: 0,
        borderRadius: '50%',
        transform: 'translateY(50%)',
        width: 50,
        height: 50,
        backgroundImage:
          'url(https://images.ctfassets.net/m1b67l45sk9z/4sfx7QKlGRwRRWEOyWIrOD/d465ba9acc0754cb6b745cb8333e6fa0/Group_81.png)',
        backgroundSize: '38%',
        backgroundPosition: 'center',
        backgroundPositionX: '55%',
        backgroundRepeat: 'no-repeat'
      }
    },
    '& .MuiLink-root': {
      color: 'white'
    }
  }
});

const variants = [
  standardCardVariant,
  standardRoundedCardVariant,
  standardBlogCardVariant,
  mediaCardVariant,
  mediaHoverCardVariant,
  mediaAndTextCardVariant,
  profileColumnCardVariant,
  profileRowCardVariant,
  profileImageCardVariant,
  squareCardVariant
];

const createCardVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createCardVariants;
