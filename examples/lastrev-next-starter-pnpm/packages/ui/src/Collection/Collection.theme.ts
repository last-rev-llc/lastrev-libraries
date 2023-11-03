import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

import { CollectionVariants } from './Collection.types';

const defaultProps: ComponentsProps['Collection'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Collection'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),

    containerType: 'inline-size',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative'
  }),

  itemsGrid: ({ theme, ownerState }) => ({
    gridColumn: 'content-start/content-end',
    display: 'grid',
    gap: 'inherit',
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',

    ...((ownerState?.variant === CollectionVariants.twoPerRow ||
      ownerState?.variant === CollectionVariants.threePerRow) && {
      [theme.containerBreakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
      }
    }),

    ...(ownerState?.variant === CollectionVariants.threePerRow && {
      [theme.containerBreakpoints.up('lg')]: {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
      }
    }),

    ...(ownerState?.variant === CollectionVariants.fourPerRow && {
      [theme.containerBreakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
      },

      [theme.containerBreakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
      }
    }),

    ...(ownerState?.variant === CollectionVariants.fivePerRow && {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',

      [theme.containerBreakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
      },

      [theme.containerBreakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(5, minmax(0, 1fr))'
      }
    })
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
