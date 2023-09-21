import { Theme, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

export const defaultProps: ComponentsProps['Collection'] = {};

export const styleOverrides: ComponentsOverrides<Theme>['Collection'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    padding: theme.spacing(12, 0),
    display: 'flex',
    flexDirection: 'column'
  }),
  itemsGrid: ({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    [`@container (min-width: ${theme.breakpoints.values.md})`]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
    },
    [`@container (min-width: ${theme.breakpoints.values.sm})`]: {
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))'
    },
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))'
    },
    gap: theme.spacing(3, 3)
  })
};

const createVariants = (theme: Theme): ComponentsVariants['Collection'] => [
  {
    props: {
      variant: 'onePerRow'
    },
    style: {
      [theme.breakpoints.up('sm')]: {
        '[class*="Collection-itemsGrid"]': {
          '&': {
            gridTemplateColumns: 'repeat(1, minmax(0, 1fr))'
          }
        }
      }
    }
  },
  {
    props: {
      variant: 'twoPerRow'
    },
    style: {
      [theme.breakpoints.up('sm')]: {
        '[class*="Collection-itemsGrid"]': {
          '&': {
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
          }
        }
      }
    }
  },
  {
    props: {
      variant: 'threePerRow'
    },
    style: {}
  },
  {
    props: {
      variant: 'fourPerRow'
    },
    style: {
      '[class*="Collection-itemsGrid"]': {
        '&': {
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
          },
          [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
          }
        }
      }
    }
  },
  {
    props: {
      variant: 'fivePerRow'
    },
    style: {
      '[class*="Collection-itemsGrid"]': {
        '&': {
          gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
          },
          [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
          }
        }
      }
    }
  }
];

export const collectionTheme = (theme: Theme) => ({
  components: {
    Collection: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default collectionTheme;
