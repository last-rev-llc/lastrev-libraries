import { Theme } from '@material-ui/core/styles';

export const mediaCardVariant = () => ({
  props: {
    variant: 'media'
  },
  style: {
    'maxWidth': 400,
    'minWidth': 400,
    'borderRadius': 0,
    'boxShadow': 'none',
    'fontSize': 0,
    '&:hover': {
      boxShadow: '3px 3px 10px 3px rgba(0, 0, 0, 0.2)'
    }
  }
});
export const mediaCardOutlinedVariant = (theme: Theme) => ({
  props: {
    variant: 'media-outlined'
  },
  style: {
    'position': 'relative',
    'borderRadius': 0,
    'border': `2px solid ${theme.palette?.primary.main}`,
    'maxWidth': 400,
    'minWidth': 400,
    'boxShadow': 'none',
    'fontSize': 0,

    '&:hover': {
      boxShadow: '3px 3px 10px 3px rgba(0, 0, 0, 0.2)'
    },

    '& img': {
      opacity: 0.5
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
    '& .MuiTypography-h4': {
      fontSize: 26,
      fontWeight: 'bold',
      color: 'black'
    }
  }
});

export const avatarCardVariant = (theme: Theme) => ({
  props: {
    variant: 'avatar'
  },
  style: {
    'display': 'flex',
    'flex-direction': 'row',
    'alignItems': 'center',
    'height': '100%',
    'maxWidth': 540,
    'maxHeight': 240,
    'minWidth': 540,
    'padding': 20,
    'borderRadius': 0,
    'boxShadow': 'none',
    'fontSize': 0,

    '&:hover': {
      boxShadow: '3px 3px 10px 3px rgba(0, 0, 0, 0.2)'
    },

    '& img': {
      width: 150,
      height: 150,
      borderRadius: '50%',
      border: `2px solid ${theme.palette.primary.main}`,
      objectFit: 'cover'
    },
    '& .MuiCardContent-root': {
      paddingLeft: 40,
      textAlign: 'left',
    },
    '& .MuiTypography-h4': {
      fontSize: 24,
      color: 'black'
    },
    '& .MuiTypography-h5': {
      paddingBottom: 12,
      fontSize: 18,
      color: 'black'
    }
  }
});

export const avatarPortraitCardVariant = (theme: Theme) => ({
  props: {
    variant: 'avatar-portrait'
  },
  style: {
    'height': '100%',
    'maxWidth': 320,
    'minWidth': 320,
    'padding': 20,
    'borderRadius': 0,
    'boxShadow': 'none',
    'fontSize': 0,

    '&:hover': {
      boxShadow: '3px 3px 10px 3px rgba(0, 0, 0, 0.2)'
    },

    '& img': {
      width: 150,
      height: 150,
      margin: '0 auto 20px',
      borderRadius: '50%',
      border: `2px solid ${theme.palette.primary.main}`,
      objectFit: 'cover'
    },
    '& .MuiCardContent-root': {
      textAlign: 'left'
    },
    '& .MuiTypography-h4': { fontSize: 24, color: 'black' },
    '& .MuiTypography-h5': { paddingBottom: 12, fontSize: 18, color: 'black' }
  }
});

export const avatarLargeCardVariant = (theme: Theme) => ({
  props: {
    variant: 'avatar-large'
  },
  style: {
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'width': 300,
    'height': 300,
    // maxWidth: 300,
    'minWidth': 300,
    'padding': 20,
    'borderRadius': 0,
    'boxShadow': 'none',
    'fontSize': 0,

    '&:hover': {
      boxShadow: '3px 3px 10px 3px rgba(0, 0, 0, 0.2)'
    },

    '& img': {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: `2px solid ${theme.palette.primary.main}`,
      objectFit: 'cover'
    },
    '& .MuiCardContent-root': {},
    '& .MuiTypography-h4': {},
    '& .MuiTypography-h5': {}
  }
});

export const squareLightVariant = (theme: Theme) => ({
  props: {
    variant: 'square-light'
  },
  style: {
    'width': '100%',
    'height': '100%',
    'maxWidth': 300,
    'minWidth': 300,
    'maxHeight': 300,
    'borderRadius': 0,
    'boxShadow': 'none',
    'fontSize': 0,

    '&:hover': {
      boxShadow: '3px 3px 10px 3px rgba(0, 0, 0, 0.2)'
    },
    '& .MuiCardContent-root': {
      backgroundColor: `2px solid ${theme.palette.secondary.main}`,
      border: `2px solid ${theme.palette.primary.main}`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      padding: '0 30px !important',
      textAlign: 'center'
    },
    '& .MuiTypography-h4': {
      fontSize: 20,
      fontWeight: 'bold'
    },
    '& .MuiTypography-h5': {}
  }
});

export const squareDarkVariant = (theme: Theme) => ({
  props: {
    variant: 'square-dark'
  },
  style: {
    'width': '100%',
    'height': '100%',
    'maxWidth': 300,
    'minWidth': 300,
    'maxHeight': 300,
    'borderRadius': 0,
    'boxShadow': 'none',
    'fontSize': 0,
    '&:hover': {
      boxShadow: '3px 3px 10px 3px rgba(0, 0, 0, 0.2)'
    },
    '& .MuiCardContent-root': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      padding: '0 30px !important',
      backgroundColor: theme.palette.quartiary.main,
      textAlign: 'center'
    },
    '& .MuiTypography-h4': {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold'
    },
    '& .MuiTypography-h5': {}
  }
});

export const standardLightVariant = (theme: Theme) => ({
  props: {
    variant: 'standard-light'
  },
  style: {
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'space-around',
    'alignItems': 'center',
    'width': '100%',
    'height': '100%',
    'maxWidth': 260,
    'minWidth': 260,
    'maxHeight': 340,
    'minHeight': 340,
    'boxShadow': 'none',
    'fontSize': 0,
    '&:hover': {
      boxShadow: '3px 3px 10px 3px rgba(0, 0, 0, 0.2)'
    },
    '& .MuiCardContent-root': {
      width: '100%',
      padding: 20,
      textAlign: 'center'
    },
    '& .MuiTypography-h4': {
      paddingBottom: 20,
      fontSize: 20,
      fontWeight: 'bold'
    },
    '& .MuiTypography-h5': {}
  }
});

export const standardDarkVariant = (theme: Theme) => ({
  props: {
    variant: 'standard-dark'
  },
  style: {
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'space-around',
    'alignItems': 'center',
    'width': '100%',
    'height': '100%',
    'maxWidth': 260,
    'minWidth': 260,
    'maxHeight': 340,
    'minHeight': 340,
    'backgroundColor': '#bdefeb',
    'boxShadow': 'none',
    'fontSize': 0,
    '&:hover': {
      boxShadow: '3px 3px 10px 3px rgba(0, 0, 0, 0.2)'
    },
    '& .MuiCardContent-root': {
      width: '100%',
      padding: 20,
      textAlign: 'center'
    },
    '& .MuiTypography-h4': {
      paddingBottom: 20,
      fontSize: 20,
      fontWeight: 'bold'
    },
    '& .MuiTypography-h5': {}
  }
});

export const standardLightBorderVariant = (theme: Theme) => ({
  props: {
    variant: 'standard-light-border'
  },
  style: {
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'space-around',
    'alignItems': 'center',
    'width': '100%',
    'height': '100%',
    'maxWidth': 260,
    'minWidth': 260,
    'maxHeight': 380,
    'minHeight': 340,
    'border': '3px solid #497380',
    'borderRadius': 20,
    'boxShadow': 'none',
    'fontSize': 0,
    '&:hover': {
      boxShadow: '3px 3px 10px 3px rgba(0, 0, 0, 0.2)'
    },
    '& .MuiCardContent-root': {
      width: '100%',
      padding: 20,
      textAlign: 'center'
    },
    '& .MuiTypography-h4': {
      paddingBottom: 20,
      fontSize: 20,
      fontWeight: 'bold'
    },
    '& .MuiLink': {
      backgroundColor: 'transparent',
      color: '#497380',
      textDecoration: 'underline'
    },
    '& img': {
      width: 150,
      height: 100,
      marginTop: 20
    }
  }
});

export const standardDarkBorderVariant = (theme: Theme) => ({
  props: {
    variant: 'standard-dark-border'
  },
  style: {
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'space-around',
    'alignItems': 'center',
    'width': '100%',
    'height': '100%',
    'maxWidth': 260,
    'minWidth': 260,
    'maxHeight': 380,
    'minHeight': 340,
    'backgroundColor': '#bdefeb',
    'border': `3px solid ${theme.palette.primary.main}`,
    'borderRadius': 20,
    'boxShadow': 'none',
    'fontSize': 0,
    '&:hover': {
      boxShadow: '3px 3px 10px 3px rgba(0, 0, 0, 0.2)'
    },
    '& .MuiCardContent-root': {
      width: '100%',
      padding: 20,
      textAlign: 'center'
    },
    '& .MuiTypography-h4': {
      paddingBottom: 20,
      fontSize: 20,
      fontWeight: 'bold'
    },
    '& img': {
      width: 150,
      height: 100,
      marginTop: 20
    }
  }
});

const variants = [
  mediaCardVariant,
  mediaCardOutlinedVariant,
  avatarCardVariant,
  avatarPortraitCardVariant,
  avatarLargeCardVariant,
  squareLightVariant,
  squareDarkVariant,
  standardLightVariant,
  standardDarkVariant,
  standardLightBorderVariant,
  standardDarkBorderVariant,
];

const createCardVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createCardVariants;
