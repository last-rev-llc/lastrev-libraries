import { Theme } from '@material-ui/core/styles';

export const singlePanelVariant = (theme: Theme) => ({
  props: {
    variant: 'single-panel'
  },
  style: {
    '& > [class*="Section-gridContainer"]': {
      justifyContent: 'center',
      textAlign: 'center',
      '& > [class*="Section-gridItem"]': {}
    }
  }
});

export const splitPanelVariant = (theme: Theme) => ({
  props: {
    variant: 'split-panel'
  },
  style: {
    '& > [class*="Section-gridContainer"]': {
      '& > [class*="Section-gridItem"]': {
        '& > img': {
          width: '100%',
          height: 'auto',
          display: 'block',
          margin: 'auto'
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
      color: '#005c7b',
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },

    '.MuiTypography-body1': {
      maxWidth: 800,
      color: '#005c7b',
      fontSize: '1.5rem'
    },
    '& > [class*="Section-gridContainer"]': {
      'position': 'relative',
      'justifyContent': 'center',
      'width': '100%',
      'maxWidth': 800,
      'height': '100%',
      'padding': 0,
      'textAlign': 'center',

      '&:after': {
        content: '""',
        position: 'absolute',
        top: 20,
        left: -20,
        bottom: 0,
        zIndex: -1,
        width: 'calc(100% + 40px)',
        height: '100%',
        backgroundColor: '#bdefeb',
        transform: 'skew(-10deg)'
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
          backgroundColor: '#ffe600',
          transform: 'skew(-10deg)'
        }
      }
    }
  }
});

export const gradientBackgroundVariant = (theme: Theme) => ({
  props: {
    variant: 'gradient-background'
  },
  style: {
    background: 'linear-gradient(50deg, rgba(48,205,194,1) 0%, rgba(0,92,122,1) 100%)',
    color: 'white',
    '& > [class*="Section-gridContainer"]': {
      maxWidth: 1280,

      // '& > [class*="Section-gridItem"]': {}
    }
  }
});

const variants = [
  singlePanelVariant,
  splitPanelVariant,
  highlightVariant,
  gradientBackgroundVariant
];

const createSectionVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createSectionVariants;
