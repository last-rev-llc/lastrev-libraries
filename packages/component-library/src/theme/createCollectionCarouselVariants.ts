import { Theme } from '@material-ui/core/styles';

export const largeCollectionCarousel = (theme: Theme) => ({
  props: {
    variant: 'carousel-large'
  },
  style: {
    height: 650,
    background: theme.palette.secondary.main
  }
});

const variants = [largeCollectionCarousel];

const createSectionVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createSectionVariants;
