import { Theme } from '@material-ui/core/styles';
import theme from '../../dist/theme/mock.theme.esm';

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
    'height': 300,
    '& .swiper-slide': {
      width: 'auto',
      [theme.breakpoints.down('md')]: {
        width: '100%'
      }
    }
  }
});

const variants = [largeCollectionCarousel, smallCollectionCarousel];

const createSectionVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createSectionVariants;
