import { Theme } from '@material-ui/core/styles';

export const mediaCardVariant = (theme: Theme) => ({
  props: {
    variant: 'media'
  },
  style: {
    position: 'relative',
    maxWidth: 400,
    minWidth: 400,

    '& img': {
      opacity: 1,
      transition: 'opacity ease .15s'
    },

    '&:hover': {
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,

      '& img': {
        opacity: 0.7,
        transition: 'opacity ease .1s'
      },
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
  }
});

export const avatarCardVariant = (theme: Theme) => ({
  props: {
    variant: 'avatar'
  },
  style: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    maxWidth: 540,
    // maxWidth: 320,
    minWidth: 320,
    // maxHeight: 240,
    padding: 20,

    // Image wrap
    '& .MuiBox-root': {
      width: 'auto',
      height: 'auto',
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

export const avatarLargeCardVariant = (theme: Theme) => ({
  props: {
    variant: 'avatar-large'
  },
  style: {
    justifyContent: 'center',
    width: 300,
    height: 300,
    // maxWidth: 300,
    minWidth: 300,
    padding: 20,

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

export const squareCardVariant = (theme: Theme) => ({
  props: {
    variant: 'square'
  },
  style: {
    width: 300,
    height: 300,

    '&:hover': {
      '& .MuiCardContent-root': {
        backgroundColor: theme.palette.tertiary.main,
        boxShadow: `inset 0 0 0 2px ${theme.palette.primary.main}`,
      },

      '& .MuiTypography-h4': {
        color: 'black'
      },
    },

    '& .MuiCardContent-root': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      padding: '0 30px !important',
      backgroundColor: theme.palette.secondary.main,
    },

    '& .MuiTypography-h4': {
      color: 'white'
    },

    '& .MuiTypography-h5': {}
  }
});

export const standardCardVariant = (theme: Theme) => ({
  props: {
    variant: 'standard'
  },
  style: {
    flexDirection: 'column',
    maxWidth: 260,
    minWidth: 260,
    maxHeight: 340,
    minHeight: 340,
    backgroundColor: 'white',
    transition: 'background-color ease .15s',

    '&:hover': {
      backgroundColor: theme.palette.tertiary.main,
      transition: 'background-color ease .15s',
    },

    '& .MuiTypography-h4': {
      paddingBottom: 20,
    },

    '& .MuiTypography-h5': {}
  }
});

export const standardRoundedCardVariant = (theme: Theme) => ({
  props: {
    variant: 'standard-round'
  },
  style: {
    flexDirection: 'column',
    maxWidth: 260,
    minWidth: 260,
    maxHeight: 340,
    minHeight: 340,
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: 20,
    transition: 'background-color ease .15s',

    '&:hover': {
      backgroundColor: theme.palette.tertiary.main,
      borderColor: theme.palette.primary.main,
      transition: 'background-color ease .15s',
    },

    '& .MuiTypography-h4': {
      paddingBottom: 20,
    },

    '& .MuiTypography-h5': {}
  }
});

const variants = [
  mediaCardVariant,
  avatarCardVariant,
  avatarLargeCardVariant,
  squareCardVariant,
  standardCardVariant,
  standardRoundedCardVariant,
];

const createCardVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createCardVariants;
