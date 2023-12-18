import type { ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

import { CollectionFilteredVariants } from './CollectionFiltered.types';

const defaultProps: ComponentsProps['CollectionFiltered'] = {};

const styleOverrides: ComponentsOverrides<Theme>['CollectionFiltered'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyColorScheme({ ownerState, theme }),

    containerType: 'inline-size',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative'
  }),
  actionsWrap: ({ theme }) => ({
    display: 'flex',
    paddingTop: theme.spacing(3),
    gap: theme.spacing(2),
    justifyContent: 'center'
  }),
  itemsGrid: ({ theme, ownerState }) => ({
    gridColumn: 'content-start/content-end',
    display: 'grid',
    gap: theme.spacing(3),
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',

    ...(ownerState?.variant === CollectionFilteredVariants.twoPerRow && {
      [theme.containerBreakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
      }
    }),
    ...(ownerState?.variant === CollectionFilteredVariants.threePerRow && {
      [theme.containerBreakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
      }
    }),

    ...(ownerState?.variant === CollectionFilteredVariants.threePerRow && {
      [theme.containerBreakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
      }
    }),

    ...(ownerState?.variant === CollectionFilteredVariants.fourPerRow && {
      [theme.containerBreakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
      },

      [theme.containerBreakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
      }
    }),

    ...(ownerState?.variant === CollectionFilteredVariants.fivePerRow && {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',

      [theme.containerBreakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
      },

      [theme.containerBreakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(5, minmax(0, 1fr))'
      }
    })
  }),

  contentGrid: ({ theme }) => ({})
};

const createVariants = (theme: Theme): ComponentsVariants['CollectionFiltered'] => [];

const CollectionFilteredTheme = (theme: Theme): ThemeOptions => ({
  components: {
    CollectionFiltered: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default CollectionFilteredTheme;
