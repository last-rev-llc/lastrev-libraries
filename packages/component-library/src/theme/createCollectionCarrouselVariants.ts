import { Theme } from '@material-ui/core/styles';

export const largeCollectionCarrousel = (_: Theme) => ({
  props: {
    variant: 'carrousel-large'
  },
  style: {
    // HEre goes the styles for the Root
    backgroundColor: 'red',
    '& [class*="Stepper-root"]':{
      //Stepper styles
    },
    '& [class*="Section-root"] > [class*="Section-gridContainer"]': {
      '& > [class*="Section-gridItem"]': {
        flex: '0 0 100%',
        marginTop: 100,
      }
    },
  }
});


const variants = [
  largeCollectionCarrousel
];

const createSectionVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createSectionVariants;
