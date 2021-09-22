import { Theme } from '@mui/material/styles';

export const singlePanelVariant = () => ({
  props: {
    variant: 'single-panel'
  },
  style: {
    '& > [class*="Section-gridContainer"]': {
      'justifyContent': 'center',
      'textAlign': 'center',
      '& > [class*="Section-gridItem"]': {}
    }
  }
});

export const splitPanelVariant = () => ({
  props: {
    variant: 'split-panel'
  },
  style: {
    '& > [class*="Section-gridContainer"]': {
      '& > [class*="Section-gridItem"]': {
        '& > img': {
          width: '100%',
          height: '100%',
          display: 'block'
          // margin: 'auto'
        }
      }
    }
  }
});

export const highlightVariant = (theme: Theme) => ({
  props: {
    variant: 'highlight'
  },
  style: {
    // TODO: Unifiy typography global overrides
    '.MuiTypography-h5': {
      color: theme.palette.secondary.main,
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    '.MuiTypography-body1': {
      maxWidth: 800,
      color: theme.palette.secondary.main,
      fontSize: '1.5rem'
    },
    '& b': {
      color: theme.palette.secondary.main
    },

    '& ul': {
      display: 'inline-block',
      padding: 0,
      fontSize: '1.5rem',
      textAlign: 'left'
    },
    '& ol': {
      display: 'inline-block',
      padding: 0,
      fontSize: '1.5rem',
      color: theme.palette.secondary.main,
      textAlign: 'left'
    },
    '& > div > [class*="Section-gridContainer"]': {
      'position': 'relative',
      'justifyContent': 'center',
      'width': 'calc(100% - 100px)',
      'maxWidth': 800,
      'height': '100%',
      'margin': '0 auto',
      'padding': 0,
      'textAlign': 'center',

      [theme.breakpoints.down('xl')]: {
        '& [class*="MuiTypography"]': {
          fontSize: '1rem'
        },
        '& ul': {
          fontSize: '1rem'
        },
        '& ol': {
          fontSize: '1rem'
        }
      },

      [theme.breakpoints.up('lg')]: {
        'width': '100%',
        '&:after': {
          transform: 'skew(-10deg)'
        },
        '& > [class*="Section-gridItem"]:after': {
          transform: 'skew(-10deg)'
        }
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        top: 20,
        left: -20,
        bottom: 0,
        zIndex: -1,
        width: 'calc(100% + 40px)',
        height: '100%',
        backgroundColor: theme.palette.quartiary.main,
        transform: 'skew(-5deg)'
      },
      '& > [class*="Section-gridItem"]': {
        'position': 'relative',
        'zIndex': 1,
        'display': 'flex',
        'flexDirection': 'column',
        'padding': 40,

        '&:after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.primary.main,
          transform: 'skew(-5deg)'
        }
      }
    }
  }
});

export const tertiaryBackgroundVariant = () => ({
  props: {
    variant: 'tertiary-gradient-background'
  },
  style: {
    'background': 'linear-gradient(50deg, rgba(48,205,194,1) 0%, rgba(0,92,122,1) 100%)',
    'color': 'white',
    '& > [class*="Section-gridContainer"]': {
      maxWidth: 1280

      // '& > [class*="Section-gridItem"]': {}
    }
  }
});
export const gradientBackgroundVariant = () => ({
  props: {
    variant: 'gradient-background'
  },
  style: {
    'background': 'linear-gradient(50deg, rgba(48,205,194,1) 0%, rgba(0,92,122,1) 100%)',
    'color': 'white',
    '& > [class*="Section-gridContainer"]': {
      maxWidth: 1280

      // '& > [class*="Section-gridItem"]': {}
    },
    '.MuiTypography-h2': {
      color: 'white'
    }
  }
});

export const collectionRowVariant = () => ({
  props: {
    variant: 'collection-triple'
  },
  style: {
    'color': 'white',
    '& > [class*="Section-gridContainer"]': {
      maxWidth: 1280
    }
  }
});

const variants = [
  singlePanelVariant,
  splitPanelVariant,
  highlightVariant,
  gradientBackgroundVariant,
  tertiaryBackgroundVariant,
  collectionRowVariant
];

const createSectionVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createSectionVariants;
