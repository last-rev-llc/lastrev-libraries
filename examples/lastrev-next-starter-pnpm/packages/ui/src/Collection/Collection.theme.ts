import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

import { CollectionVariants } from './Collection.types';

const defaultProps: ComponentsProps['Collection'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Collection'] = {
  root: ({ theme, ownerState }) => ({
    containerType: 'inline-size',
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gridColumn: 'content-start/content-end'

    // TODO: Update to check if within a section
    // padding: theme.spacing(12, 0)
  }),

  itemsGrid: ({ theme }) => ({
    gridColumn: 'content-start/content-end',
    display: 'grid',
    gap: 'inherit',
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))'

    // [theme.containerBreakpoints.up('sm')]: {
    //   gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
    // },

    // [theme.containerBreakpoints.up('lg')]: {
    //   gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
    // }
  }),

  contentGrid: {}
};

const createVariants = (theme: Theme): ComponentsVariants['Collection'] => [
  {
    props: {
      variant: CollectionVariants.onePerRow
    },
    style: {
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))'
    }
  },
  {
    props: {
      variant: CollectionVariants.twoPerRow
    },
    style: {
      [theme.containerBreakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
      }
    }
  },
  {
    props: {
      variant: CollectionVariants.threePerRow
    },
    style: {
      [theme.containerBreakpoints.up('sm')]: {
        'border': 'solid 10px yellow',
        '[class*=itemsGrid]': { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }
      },

      [theme.containerBreakpoints.up('lg')]: {
        'border': 'solid 10px orange',
        '[class*=itemsGrid]': { border: 'solid 10px black', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }
      }
    }
  },
  {
    props: {
      variant: CollectionVariants.fourPerRow
    },
    style: {
      '[class*="Collection-itemsGrid"]': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',

        [theme.containerBreakpoints.up('sm')]: {
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
        },

        [theme.containerBreakpoints.up('lg')]: {
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
        }
      }
    }
  },
  {
    props: {
      variant: CollectionVariants.fivePerRow
    },
    style: {
      '[class*="Collection-itemsGrid"]': {
        '&': {
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',

          [theme.containerBreakpoints.up('sm')]: {
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
          },

          [theme.containerBreakpoints.up('lg')]: {
            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))'
          }
        }
      }
    }
  }
];

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
