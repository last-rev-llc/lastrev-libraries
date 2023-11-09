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

  swiperWrap: ({ theme, ownerState }) => {
    // const numItems = ownerState?.items?.length ?? 3;
    const itemsPerRow = ownerState?.itemsPerRow || 3;

    return {
      '&.no-js': {
        // ...(baseItemsGrid
        //   ? baseItemsGrid({
        //       ownerState: { variant: ownerState?.originalVariant },
        //       theme
        //     })
        //   : {
        //       border: 'solid 10px blue'
        //     }),
        // 'gridColumn': 'content-start/full-end',
        // 'gridAutoFlow': 'column',
        // 'width': '100%',
        // 'overflowX': 'auto',

        // '[class*=swiper]': {
        //   'display': 'contents',

        //   '&[class*=swiper-button]': {
        //     display: 'none'
        //   }
        // },

        '[class*=swiper-button]': {
          visibility: 'hidden'
        },

        // '.swiper-slide': {
        //   'gridColumn': 'auto',

        //   '&:nth-of-type(n + 5)': {
        //     'gridColumn': 'span 1',
        //     '[class*=Carousel-item]': {
        //       maxWidth: '50%',
        //       overflow: 'hidden'
        //     }
        //   }
        // }

        '.swiper-slide': {
          'paddingRight': 'var(--grid-gap)',
          '--carousel-col-count': 1.25,

          'width': `calc(min(${theme.containerBreakpoints.values.sm}px, (100vw - (2 * var(--grid-margin-md)))) / var(--carousel-col-count))`,

          [theme.breakpoints.up('sm')]: {
            width: `calc(min(${theme.containerBreakpoints.values.sm}px, (100vw - (2 * var(--grid-margin-md)))) / var(--carousel-col-count))`
          },

          [theme.breakpoints.up('md')]: {
            '--carousel-col-count': itemsPerRow > 2 ? 2.5 : 2,
            'width': `calc(min(${theme.containerBreakpoints.values.md}px, (100vw - (2 * var(--grid-margin-lg)))) / var(--carousel-col-count))`
          },

          [theme.breakpoints.up('lg')]: {
            '--carousel-col-count': itemsPerRow >= 4 ? 4.5 : 2.5,
            'width': `calc(min(${theme.containerBreakpoints.values.lg}px, (100vw - (2 * var(--grid-margin-xl)))) / var(--carousel-col-count))`
          },

          ...(itemsPerRow >= 5 && {
            [theme.breakpoints.up('xl')]: {
              '--carousel-col-count': 5.5,
              'width': `calc(min(${theme.containerBreakpoints.values.xl}px, (100vw - (2 * var(--grid-margin-xl)))) / var(--carousel-col-count))`
            }
          })
        }
      },

      'padding': 'var(--section-padding) 0 calc(2 * var(--section-padding))',
      'gridColumn': 'content-start/content-end',
      'overflow': 'hidden'
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
