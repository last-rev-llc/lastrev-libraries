import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

import { CollectionDynamicVariants } from './CollectionDynamic.types';

const defaultProps: ComponentsProps['CollectionDynamic'] = {};

export interface LayoutConfig {
  [key: string]: { [breakpoint: string]: number };
}
export const layoutConfig: LayoutConfig = {
  [CollectionDynamicVariants.onePerRow]: {
    xs: 1,
    sm: 2,
    md: 1,
    lg: 1,
    xl: 1,
    xxl: 1
  },
  [CollectionDynamicVariants.twoPerRow]: {
    xs: 1,
    sm: 2
  },
  [CollectionDynamicVariants.threePerRow]: {
    xs: 1,
    sm: 2,
    lg: 3
  },
  [CollectionDynamicVariants.fourPerRow]: {
    xs: 1,
    sm: 2,
    md: 4
  },
  [CollectionDynamicVariants.fivePerRow]: {
    xs: 1,
    sm: 2,
    md: 4,
    lg: 5
  }
};

const styleOverrides: ComponentsOverrides<Theme>['CollectionDynamic'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),

    containerType: 'inline-size',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',

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

  // contentGrid: {},

  filtersOuterWrap: ({ theme, ownerState }) => ({
    gridColumn: 'content-start/content-end',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--grid-gap)',
    gridRow: 1,

    [theme.containerBreakpoints.up('md')]: {
      ...(ownerState?.filtersPlacement === 'top' && {
        flexDirection: 'row'
      }),

      ...(ownerState?.filtersPlacement === 'left' && {
        gridColumn: 'content-start/three-end'
      })
    }
  }),

  currentRefinementsWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--grid-gap)'
  },

  filtersWrap: {
    display: 'contents'
    // display: 'flex',
    // flexDirection: 'column',
    // gap: 'var(--grid-gap)',
    // gridRow: 2
  },

  // paginationWrap: {},

  // searchBoxWrap: {},

  resultsWrap: ({ theme, ownerState }) => ({
    gridColumn: 'content-start/content-end',
    gap: 'inherit',
    gridRow: 2,

    [theme.containerBreakpoints.up('md')]: {
      ...(ownerState?.filtersPlacement === 'left' && {
        gridRow: 1,
        gridColumn: 'four-start/content-end'
      })
    }
  }),

  itemsGrid: ({ theme, ownerState }) => ({
    'display': 'grid',
    'gap': 'inherit',
    'gridTemplateColumns': 'repeat(1, minmax(0, 1fr))',

    ...((ownerState?.variant === CollectionDynamicVariants.twoPerRow ||
      ownerState?.variant === CollectionDynamicVariants.threePerRow) && {
      [theme.containerBreakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
      }
    }),

    ...(ownerState?.variant === CollectionDynamicVariants.threePerRow && {
      [theme.containerBreakpoints.up('lg')]: {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
      }
    }),

    ...(ownerState?.variant === CollectionDynamicVariants.fourPerRow && {
      [theme.containerBreakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
      },

      [theme.containerBreakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
      }
    }),

    ...(ownerState?.variant === CollectionDynamicVariants.fivePerRow && {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',

      [theme.containerBreakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
      },

      [theme.containerBreakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(5, minmax(0, 1fr))'
      }
    }),

    '& [class*=ais-Hit]': {
      display: 'contents'
    }
  })
};

const createVariants = (theme: Theme): ComponentsVariants['CollectionDynamic'] => [];

const collectionDynamicTheme = (theme: Theme): ThemeOptions => ({
  components: {
    CollectionDynamic: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default collectionDynamicTheme;
