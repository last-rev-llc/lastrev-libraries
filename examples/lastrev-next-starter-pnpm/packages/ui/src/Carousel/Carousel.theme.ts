import {
  type Theme,
  type ThemeOptions,
  type ComponentsProps,
  type ComponentsOverrides,
  type ComponentsVariants
} from '@mui/material/styles';

import 'swiper/css';
import 'swiper/css/navigation';

const defaultProps: ComponentsProps['Carousel'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Carousel'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    'containerType': 'inline-size',
    'display': 'flex',
    'flexDirection': 'column',
    'width': '100%',
    'position': 'relative',
    'padding': 0,

    '&': {
      // Can ue these classes to move nav buttons
      ':is(.swiper-button-prev, .swiper-button-next)': {
        aspectRatio: '1/1',
        width: 'var(--swiper-navigation-size)',
        padding: 'var(--swiper-navigation-size)'
      }
    }
  }),

  swiperWrap: {
    padding: 'var(--section-padding) 0 calc(2 * var(--section-padding))',
    // Change this to make it full bleed on the grid
    gridColumn: 'content-start/content-end',
    overflow: 'hidden'
  },

  swiperInnerWrap: {
    'position': 'relative',

    '.swiper': {
      // Allows for placement of the buttons below the carousel if needed.
      'overflowY': 'unset',
      'width': 'calc(100% - (var(--grid-margin) / 2px))',

      '&.swiper-grid': {
        width: '100%'
      }
    }
  },

  item: {
    overflow: 'unset',
    position: 'relative',
    zIndex: 20
  },

  contentGrid: {}
};

const createVariants = (theme: Theme): ComponentsVariants['Carousel'] => [];

const carouselTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Carousel: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default carouselTheme;
