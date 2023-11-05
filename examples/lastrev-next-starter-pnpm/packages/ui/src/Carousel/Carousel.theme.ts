import {
  type Theme,
  type ThemeOptions,
  type ComponentsProps,
  type ComponentsOverrides,
  type ComponentsVariants
} from '@mui/material/styles';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
const defaultProps: ComponentsProps['Carousel'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Carousel'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
    'containerType': 'inline-size',
    'display': 'flex',
    'flexDirection': 'column',
    'width': '100%',
    'position': 'relative',
    // 'padding': 0,

    '&': {
      // Swiper Overrides
      '--swiper-navigation-sides-offset': 'calc(var(--grid-margin) / -2)',
      '--swiper-theme-color': theme.colorSchemes.light.palette.primary.main,
      '--swiper-navigation-color': 'var(--swiper-theme-color)',
      '--swiper-pagination-color': 'var(--swiper-theme-color)',
      '--swiper-preloader-color': ' var(--swiper-theme-color)',
      '--swiper-pagination-top': 'auto',
      '--swiper-pagination-bottom': '0px',

      /* 
              --swiper-wrapper-transition-timing-function: initial;

              --swiper-navigation-size: calc(var(--grid-gap) / 1); // calc(var(--grid-margin) / 4);
              --swiper-navigation-top-offset: 100%;
             

              --swiper-pagination-color: currentColor; //var(--current-color-text); //var(--swiper-theme-color);
              --swiper-pagination-left: auto;
              --swiper-pagination-right: calc(var(--grid-gap) / 2);
              --swiper-pagination-bottom: calc(var(--grid-gap) / 2);
              --swiper-pagination-top: auto;
              --swiper-pagination-fraction-color: inherit;
              --swiper-pagination-progressbar-bg-color: rgba(0, 0, 0, 0.25);
              --swiper-pagination-progressbar-size: calc(var(--grid-gap) / 4);
              --swiper-pagination-bullet-size: calc(var(--grid-gap) / 2);
              --swiper-pagination-bullet-width: calc(var(--grid-gap) / 2);
              --swiper-pagination-bullet-height: calc(var(--grid-gap) / 2);
              --swiper-pagination-bullet-border-radius: 50%;
              --swiper-pagination-bullet-inactive-color: currentColor; //var(--swiper-theme-color);
              --swiper-pagination-bullet-inactive-opacity: 0.2;
              --swiper-pagination-bullet-opacity: 1;
              --swiper-pagination-bullet-horizontal-gap: calc(var(--grid-gap) / 4);
              --swiper-pagination-bullet-vertical-gap: calc(var(--grid-gap) / 4);

              --swiper-scrollbar-border-radius: calc(var(--grid-gap) / 2);
              --swiper-scrollbar-top: auto;
              --swiper-scrollbar-bottom: calc(var(--grid-gap) / 4);
              --swiper-scrollbar-left: auto;
              --swiper-scrollbar-right: calc(var(--grid-gap) / 4);
              --swiper-scrollbar-sides-offset: 1%;
              --swiper-scrollbar-bg-color: rgba(0, 0, 0, 0.1);
              --swiper-scrollbar-drag-bg-color: rgba(0, 0, 0, 0.5);
              --swiper-scrollbar-size: calc(var(--grid-gap) / 4); */

      '.swiper': {
        overflow: 'visible',
        paddingBottom: theme.spacing(6),
        ...(ownerState?.itemsVariant === 'logo' && {
          paddingBottom: theme.spacing(6)
        })
      },
      '.swiper-slide': {
        width: 'unset'
      },
      '.swiper-wrapper': {
        alignItems: 'center'
      },
      '.swiper-pagination-bullet': {
        'transform': 'scale(1)',
        '&.swiper-pagination-bullet-active': { transform: 'scale(1.25)' }
      },
      ':is(.swiper-button-prev, .swiper-button-next)': {
        // aspectRatio: '1/1'
        // width: 'var(--swiper-navigation-size)'
        // padding: 'var(--swiper-navigation-size)'
      }
    }
  }),

  swiperWrap: {
    // padding: 'var(--section-padding) 0 calc(2 * var(--section-padding))',
    // Change this to make it full bleed on the grid
    gridColumn: 'content-start/content-end'
  },

  swiperInnerWrap: {
    'position': 'relative',

    '.swiper': {
      // Allows for placement of the buttons below the carousel if needed.
      // 'overflowY': 'unset',
      // 'width': 'calc(100% - (var(--grid-margin) / 2px))',
      '&.swiper-grid': {
        width: '100%'
      }
    }
  },

  item: {
    // overflow: 'unset',
    // position: 'relative',
    // zIndex: 20
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
