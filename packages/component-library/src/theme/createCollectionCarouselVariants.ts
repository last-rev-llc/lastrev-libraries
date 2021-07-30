import { Theme } from '@material-ui/core/styles';

export const largeCollectionCarousel = (theme: Theme) => ({
  props: {
    variant: 'carousel-large'
  },
  style: {
    'height': 650,
    'background': theme.palette.secondary.main,
    '--swiper-navigation-size': 40
  }
});

export const smallCollectionCarousel = () => ({
  props: {
    variant: 'carousel-small'
  },
  style: {
    'height': 300,
    '& .swiper-slide': {
      width: 'auto'
    }
  }
});

const variants = [largeCollectionCarousel, smallCollectionCarousel];

const createSectionVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createSectionVariants;
