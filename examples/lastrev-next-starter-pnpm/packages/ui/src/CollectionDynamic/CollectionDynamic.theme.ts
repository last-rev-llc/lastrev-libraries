import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

import { CollectionDynamicVariants } from './CollectionDynamic.types';

const defaultProps: ComponentsProps['CollectionDynamic'] = {};

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

  currentRefinementsWrap: {
    gridColumn: 'content-start/content-end',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--grid-gap)',
    gridRow: 1
  },

  filtersWrap: {
    gridColumn: 'content-start/three-end',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--grid-gap)',
    gridRow: 2
  },

  // paginationWrap: {},

  // searchBoxWrap: {},

  resultsWrap: {
    gridColumn: 'four-start/content-end',
    gap: 'inherit',
    gridRow: 2
  },

  itemsGrid: ({ theme, ownerState }) => ({
    // 'gridColumn': 'four-start/content-end',
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
