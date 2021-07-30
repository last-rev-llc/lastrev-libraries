import { Theme } from '@material-ui/core/styles';

export const largeCollectionCarousel = (theme: Theme) => ({
  props: {
    variant: 'carousel-large'
  },
  style: {
    'height': 650,
    'background': theme.palette.secondary.main,
    '--swiper-theme-color': theme.palette.primary.main,
    'display': 'flex',
    'justifyContent': 'center',
    '& .MuiContainer-root': {
      display: 'flex'
    },
    '& .MuiBox-root': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }
  }
});

const variants = [largeCollectionCarousel];

const createSectionVariants = (theme: Theme) => {
  return variants.map((creator) => creator(theme));
};

export default createSectionVariants;
