import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

import { CollectionDynamicVariants, type CollectionDynamicOwnerState } from './CollectionDynamic.types';

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
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2,
    xxl: 2
  },
  [CollectionDynamicVariants.threePerRow]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 3,
    xxl: 3
  },
  [CollectionDynamicVariants.fourPerRow]: {
    xs: 1,
    sm: 2,
    md: 4,
    lg: 4,
    xl: 4,
    xxl: 5
  },
  [CollectionDynamicVariants.fivePerRow]: {
    xs: 1,
    sm: 2,
    md: 4,
    lg: 5,
    xl: 5,
    xxl: 5
  }
};

export const generateGridStyles = (theme: Theme, ownerState: CollectionDynamicOwnerState) => {
  const variantConfig = layoutConfig[ownerState.variant || CollectionDynamicVariants.default] || {};
  let styles = { display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' };

  Object.entries(variantConfig).forEach(([breakpoint, columns]) => {
    styles = {
      ...styles,
      [theme.containerBreakpoints.up(breakpoint)]: { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
    };
  });

  return styles;
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
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--grid-gap)',
    gridRow: 1,

    [theme.breakpoints.up('md')]: {
      ...(ownerState?.filtersPlacement === 'top' && {
        flexDirection: 'row'
      }),

      ...(ownerState?.filtersPlacement === 'left' && {
        '&&': {
          gridColumn: 'content-start/three-end'
        }
      })
    }
  }),

  currentRefinementsWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--grid-gap)'
  },

  filtersWrap: ({ theme, ownerState }) => ({
    ...(ownerState?.filtersPlacement === 'left'
      ? {
          position: 'sticky',
          top: 'var(--grid-gap-double)'
          // flexDirection: 'column',
          // gap: 'var(--grid-gap)',
          // gridRow: 2
        }
      : {
          display: 'contents'
        })
  }),

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
        // ...theme.mixins.applyColorScheme({ ownerState, backgroundColor: 'white' })
      })
    }
  }),

  itemsGrid: ({ theme, ownerState }) => ({
    'gap': 'inherit',

    ...(ownerState && generateGridStyles(theme, ownerState)),

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
