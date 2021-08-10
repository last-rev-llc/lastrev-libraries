import { Theme } from '@material-ui/core/styles';

export const collectionOnePerRowVariant = (_: Theme) => ({
  props: {
    variant: 'collection-one-per-row'
  },
  style: {
    '& [class*="Section-root"] > [class*="Section-gridContainer"]': {
      '& > [class*="Section-gridItem"]': {
        flex: '0 0 100%'
      }
    }
  }
});

export const collectionTwoPerRowVariant = (_: Theme) => ({
  props: {
    variant: 'collection-two-per-row'
  },
  style: {
    '& [class*="Section-root"] > [class*="Section-gridContainer"]': {
      '& > [class*="Section-gridItem"]': {
        flex: '0 0 50%',
        maxWidth: 1296 / 2
      }
    }
  }
});

export const collectionThreePerRowVariant = (_: Theme) => ({
  props: {
    variant: 'collection-three-per-row'
  },
  style: {
    '& [class*="Section-root"] > [class*="Section-gridContainer"]': {
      '& > [class*="Section-gridItem"]': {
        maxWidth: 1296 / 3
      }
    }
  }
});

export const collectionTilesVariant = (_: Theme) => ({
  props: {
    variant: 'collection-tiles'
  },
  style: {
    'display': 'flex',
    'flexWrap': 'wrap',
    'justifyContent': 'space-around',
    'width': '100%',
    'height': '100%',
    '& [class*="Section-root"] > [class*="Section-gridContainer"]': {
      '& > [class*="Section-gridItem"]': {
        //padding: theme.spacing(1),
        padding: 5,
        margin: 0
      }
    }
  }
});

const variants = [
  collectionOnePerRowVariant,
  collectionTwoPerRowVariant,
  collectionThreePerRowVariant,
  collectionTilesVariant
];

const createSectionVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createSectionVariants;
