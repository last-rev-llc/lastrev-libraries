import { Theme } from '@material-ui/core/styles';
import theme from './mock.theme';

export const largeCollectionCarousel = (_: Theme) => ({
  props: {
    variant: 'carrousel-large'
  },
  style: {
    'height': 650,
  }  
});

const variants = [
  largeCollectionCarousel
];

const createSectionVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createSectionVariants;
