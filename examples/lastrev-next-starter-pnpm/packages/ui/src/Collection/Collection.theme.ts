import {
  TypographyStyle,
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

export const defaultProps: ComponentsProps['Collection'] = {};

export const styleOverrides: ComponentsOverrides<Theme>['Collection'] = {
  root: () => ({}),

  contentContainer: ({ theme }) => ({
    'display': 'grid',
    'gridTemplateColumns': 'repeat(2,1fr)',
    'gap': theme.spacing(2, 2),

    'section[id] &': {
      padding: 0
    },

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(6,1fr)',
      gap: theme.spacing(8, 3)
    },

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(12,1fr)',
      gap: theme.spacing(8, 3)
    }
  }),

  itemsContainer: ({ theme }) => ({
    gridColumn: '1 / span 2',
    display: 'grid',
    gap: theme.spacing(3, 3),

    [theme.breakpoints.up('md')]: {
      gridColumn: '1 / span 6'
      // gap: theme.spacing(6, 3)
    },

    [theme.breakpoints.up('md')]: {
      gridColumn: '1 / span 12'
      // gap: theme.spacing(3, 3)
    }
  }),

  introText: ({ theme, align }) => ({
    'gridColumn': '1 / span 2',
    'position': 'relative',

    'marginBottom': theme.spacing(4),

    '[class$=Text-title]': {
      ...theme.typography.h4,
      textAlign: `${align === 'center' ? 'center' : 'left'}`
    },

    '[class$=Text-subtitle]': {
      ...theme.typography.h5,
      textAlign: `${align === 'center' ? 'center' : 'left'}`,
      marginTop: theme.spacing(2)
    },

    '[class$=Text-root]': {
      marginTop: theme.spacing(3),
      textAlign: `${align === 'center' ? 'center' : 'left'}`
    },

    [theme.breakpoints.up('md')]: {
      'gridColumn': '1 / span 5',

      ...(align === 'center' && {
        gridColumn: '1 / -1'
      }),

      '[class$=Text-title]': {
        ...theme.typography.h3
      },

      '[class$=Text-root] > *': {
        ...theme.typography.body2
      }
    },

    '& + [class*=contentContainer]': {
      marginTop: theme.spacing(4)
    }
  })
};

const createVariants = (theme: Theme): ComponentsVariants['Collection'] => [
  {
    props: {
      variant: 'onePerRow'
    },
    style: {
      '&': {
        '[class*="Collection-itemsContainer"]': {
          display: 'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))'
        }
      }
    }
  },
  {
    props: {
      variant: 'twoPerRow'
    },
    style: {
      '&': {
        '[class*="Collection-itemsContainer"]': {
          display: 'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',

          [theme.breakpoints.up('md')]: {
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
    style: {
      '&': {
        '[class*="Collection-itemsContainer"]': {
          display: 'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',

          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
          }
        }
      }
    }
  },
  {
    props: {
      variant: 'fourPerRow'
    },
    style: {
      '&': {
        '[class*="Collection-itemsContainer"]': {
          display: 'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',

          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
          },

          [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
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
      '&': {
        '[class*="Collection-itemsContainer"]': {
          display: 'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',

          [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
          },

          [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))'
          }
        }
      }
    }
  }
];

export const collectionTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Collection: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default collectionTheme;
