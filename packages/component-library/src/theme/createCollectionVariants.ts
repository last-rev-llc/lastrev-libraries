import { Theme } from '@material-ui/core/styles';

export const gradientBackgroundVariant = (_: Theme) => ({
  props: {
    variant: 'gradient-background'
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

export const collectionRowVariant = (_: Theme) => ({
  props: {
    variant: 'collection-three-per-row'
  },
  style: {
    'color': 'white',
    '& > [class*="Section-gridContainer"]': {
      maxWidth: 1280
    },
    '& > [class*="Section-gridItem"]': {
      display: 'flex',
      justifyContent: 'center'
    }
  }
});

const variants = [
  gradientBackgroundVariant,
  collectionRowVariant
];

const createSectionVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createSectionVariants;
