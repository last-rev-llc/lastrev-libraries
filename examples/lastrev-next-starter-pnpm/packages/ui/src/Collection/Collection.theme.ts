import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

import { CollectionVariants, type CollectionOwnerState } from './Collection.types';

const defaultProps: ComponentsProps['Collection'] = {};

export interface LayoutConfig {
  [key: string]: { [breakpoint: string]: number };
}
export const layoutConfig: LayoutConfig = {
  [CollectionVariants.onePerRow]: {
    xs: 1,
    sm: 2,
    md: 1,
    lg: 1,
    xl: 1
  },
  [CollectionVariants.twoPerRow]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
  },
  [CollectionVariants.threePerRow]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 3
  },
  [CollectionVariants.fourPerRow]: {
    xs: 1,
    sm: 2,
    md: 4,
    lg: 4,
    xl: 4
  },
  [CollectionVariants.fivePerRow]: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 5,
    xl: 5
  }
};

export const generateGridStyles = (theme: Theme, ownerState: CollectionOwnerState) => {
  const variantConfig = layoutConfig[ownerState.variant || CollectionVariants.default] || {};
  let styles = { display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' };

  Object.entries(variantConfig).forEach(([breakpoint, columns]) => {
    styles = {
      ...styles,
      [theme.containerBreakpoints.up(breakpoint)]: { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
    };
  });

  return styles;
};

const styleOverrides: ComponentsOverrides<Theme>['Collection'] = {
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

  itemsGrid: ({ theme, ownerState }) => ({
    gridColumn: 'content-start/content-end',
    gap: 'inherit',

    ...(ownerState && generateGridStyles(theme, ownerState))
  }),

  contentGrid: {}
};

const createVariants = (theme: Theme): ComponentsVariants['Collection'] => [];

const collectionTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Collection: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default collectionTheme;
