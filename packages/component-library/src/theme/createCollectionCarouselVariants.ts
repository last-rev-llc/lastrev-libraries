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

export const smallCollectionCarousel = (theme: Theme) => ({
  props: {
    variant: 'carousel-small'
  },
  style: {
    'maxHeight': 300,
    '& .swiper-slide': {
      width: '100%'
    },
    '& .swiper-container': {
      paddingBottom: theme.spacing(6)
    },
    '& .swiper-button-prev .swiper-button-next': {
      top: '38%'
    }
  }
});

const variants = [largeCollectionCarousel, smallCollectionCarousel];

const createSectionVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createSectionVariants;
