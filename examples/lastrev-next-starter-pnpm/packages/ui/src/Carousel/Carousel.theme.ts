import {
  type ThemeOptions,
  type ComponentsProps,
  type ComponentsOverrides,
  type ComponentsVariants
} from '@mui/material/styles';

import { type Theme } from '../ThemeRegistry/theme.types';
import { CarouselVariants } from './Carousel.types';
import { type LayoutConfig } from '../ThemeRegistry/mixins/generateGridStyles';

import 'swiper/css';
import 'swiper/css/navigation';

const defaultProps: ComponentsProps['Carousel'] = {};

export const layoutConfig: LayoutConfig = {
  [CarouselVariants.onePerRow]: {
    xs: 1,
    sm: 2,
    md: 1,
    lg: 1,
    xl: 1
  },
  [CarouselVariants.twoPerRow]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
  },
  [CarouselVariants.threePerRow]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 3
  },
  [CarouselVariants.fourPerRow]: {
    xs: 1,
    sm: 2,
    md: 4,
    lg: 4,
    xl: 4
  },
  [CarouselVariants.fivePerRow]: {
    xs: 1,
    sm: 2,
    md: 4,
    lg: 5,
    xl: 55
  }
};

const styleOverrides: ComponentsOverrides<Theme>['Carousel'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),
    'containerType': 'inline-size',
    'display': 'flex',
    'flexDirection': 'column',
    'width': '100%',
    'position': 'relative',

    '&': {
      ':is(.swiper-button-prev, .swiper-button-next)': {
        // '--swiper-navigation-color': 'var(--mui-palette-text-primary)',
        border: 'solid 1px',
        aspectRatio: '1/1',
        width: 'var(--swiper-navigation-size)',
        borderRadius: '50%',
        padding: 'var(--swiper-navigation-size)',
        top: 'unset',
        bottom: 'calc(-1.5 * var(--section-padding))'
      },

      '.swiper-button-next': {
        right: 'unset',
        left: 'calc(3 * var(--swiper-navigation-size))'
      }
    },

    ...(ownerState?.prevBgColor && ownerState.inheritTopBGOverlap
      ? {
          'paddingTop': 0,
          'paddingLeft': 0,
          'paddingRight': 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            display: 'block',
            height: 'var(--section-padding)',
            width: '100%',
            ...theme.mixins.applyColorScheme({
              ownerState: { ...ownerState, backgroundColor: ownerState?.prevBgColor ?? 'navy' },
              theme
            })
          }
        }
      : { ...theme.mixins.applyColorScheme({ ownerState, theme }), padding: 'var(--section-padding) 0' })
  }),

  swiperWrap: ({ theme, ownerState }) => {
    const itemsPerRow = ownerState?.itemsPerRow || 3;

    return {
      '.swiper-slide': {
        height: 'auto'
      },
      '&.no-js': {
        '[class*=swiper-button]': {
          visibility: 'hidden'
        },

        '.swiper-slide': {
          'height': '100%',
          // Calculations get messed up if we don't do this
          'paddingRight': theme.spacing(1),

          '--carousel-col-count': 1.25,

          [theme.breakpoints.up('md')]: {
            '--carousel-col-count': itemsPerRow > 2 ? 2.5 : 2
          },

          [theme.breakpoints.up('lg')]: {
            '--carousel-col-count': itemsPerRow >= 4 ? 4.5 : 2.5
          },

          ...(itemsPerRow >= 5 && {
            [theme.breakpoints.up('xl')]: {
              '--carousel-col-count': 5.5
            }
          }),

          'width': `calc(var(--content-width) / var(--carousel-col-count))`
        }
      },

      '.swiper': {
        overflow: 'unset'
      },
      'padding': '0 0 calc(1.5 * var(--section-padding))',
      'gridColumn': 'start/full-end'
    };
  },

  swiperInnerWrap: {
    'position': 'relative',

    '.swiper': {
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
  }
};

const createVariants = (_theme: Theme): ComponentsVariants['Carousel'] => [];

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
