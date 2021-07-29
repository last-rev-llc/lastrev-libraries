import { Theme } from '@material-ui/core/styles';
import theme from './mock.theme';

export const largeCollectionCarousel = (_: Theme) => ({
  props: {
    variant: 'carrousel-large'
  },
  style: {
    // HEre goes the styles for the Root
   // backgroundColor: baseTheme.palette.primary.main,
    '& [class*="Stepper-root"]':{
      //Stepper styles
    },
    '& [class*="Section-root"] > [class*="Section-gridContainer"]': {
      '& > [class*="Section-gridItem"]': {
        flex: '0 0 100%',
        marginTop: 10,
      }
    },
  }
});

const variants = [
  largeCollectionCarousel
];

const createSectionVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createSectionVariants;
