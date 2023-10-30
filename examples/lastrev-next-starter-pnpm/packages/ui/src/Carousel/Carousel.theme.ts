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

    '&': {
      ':is(.swiper-button-prev, .swiper-button-next)': {
        border: 'solid',
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
          'padding': 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            display: 'block',
            height: 'var(--section-padding)',
            width: '100%',
            ...theme.mixins.applyBackgroundColor({
              ownerState: { ...ownerState, backgroundColor: ownerState?.prevBgColor ?? 'navy' },
              theme
            })
          }
        }
      : { ...theme.mixins.applyBackgroundColor({ ownerState, theme }), padding: 'var(--section-padding) 0' })
  }),

  swiperWrap: {
    padding: 'var(--section-padding) 0 calc(2 * var(--section-padding))',
    gridColumn: 'content-start/full-end',
    overflow: 'hidden'
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
