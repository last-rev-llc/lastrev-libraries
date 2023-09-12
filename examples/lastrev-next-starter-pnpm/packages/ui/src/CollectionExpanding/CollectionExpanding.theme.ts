import {
  TypographyStyle,
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

// https://mui.com/customization/theme-components/#default-props
export const defaultProps: ComponentsProps['CollectionExpanding'] = {};

// https://mui.com/customization/theme-components/#global-style-overrides
export const styleOverrides: ComponentsOverrides<Theme>['CollectionExpanding'] = {
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

// https://mui.com/customization/theme-components/#adding-new-component-variants
const createVariants = (theme: Theme): ComponentsVariants['CollectionExpanding'] => [
  {
    props: {
      variant: 'onePerRow'
    },
    style: {
      '&': {
        '[class*="CollectionExpanding-itemsContainer"]': {
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
        '[class*="CollectionExpanding-itemsContainer"]': {
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
      variant: 'twoPerRowOffset'
    },
    style: {
      '&': {
        '[class*="CollectionExpanding-itemsContainer"]': {
          'display': 'grid',
          'gridTemplateColumns': 'repeat(1, minmax(0, 1fr))',
          'gap': theme.spacing(2),

          '& *': {
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto'
          },

          [theme.breakpoints.up('md')]: {
            'gridTemplateColumns': 'repeat(2, minmax(0, 1fr))',

            '[class*=CollectionExpanding-item]': {
              height: 'min-content'
            },

            '[class*=CollectionExpanding-item]:nth-child(even)': {
              marginTop: theme.spacing(0)
            }
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
        '[class*="CollectionExpanding-itemsContainer"]': {
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
      variant: 'pricing'
    },
    style: {
      '&': {
        '[class*="CollectionExpanding-itemsContainer"]': {
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
      variant: 'customerLogos'
    },
    style: {
      'padding': theme.spacing(4, 2),

      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8, 5)
      },

      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8, 3)
      },

      '[class$=CollectionExpanding-contentContainer]': {
        position: 'relative',
        display: 'grid',
        gap: theme.spacing(4, 0),

        [theme.breakpoints.up('md')]: {
          gap: theme.spacing(7, 0)
        },

        [theme.breakpoints.up('md')]: {
          gap: theme.spacing(4, 0)
        }
      },

      '[class$=CollectionExpanding-itemsContainer]': {
        gridColumn: '1 / -1',
        gridTemplateColumns: 'repeat(2,1fr)',
        gap: theme.spacing(4, 3),
        alignItems: 'center',
        gridRow: '-2',

        [theme.breakpoints.up('sm')]: {
          gap: theme.spacing(8, 3)
        },

        [theme.breakpoints.up('md')]: {
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: theme.spacing(8, 5)
        },

        [theme.breakpoints.up('md')]: {
          gridTemplateColumns: 'repeat(6,1fr)',
          gridRow: '-1/2'
        }
      },

      '[class$=CollectionExpanding-introText]': {
        'gridColumn': '1/-1',
        'gridRow': '-3',

        [theme.breakpoints.up('md')]: {
          gridColumn: '2/-2',
          gridRow: '-2/1'
        },

        '&::before': {
          display: 'none'
        },

        '[class$=Text-title]': {
          ...theme.typography.h4,
          textAlign: 'center',

          [theme.breakpoints.up('md')]: {
            ...theme.typography.h3
          }
        }
      }
    }
  },
  {
    props: {
      variant: 'contentGrid'
    },
    style: {
      '&': {
        '[class*="CollectionExpanding-contentContainer"]': {
          gap: theme.spacing(5, 2),
          [theme.breakpoints.up('md')]: {
            gap: theme.spacing(8, 3)
          }
        },
        '[class*="CollectionExpanding-itemsContainer"]': {
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
      variant: 'contentGrid',
      itemsVariant: 'icon'
    },
    style: {
      '&': {
        '[class*="CollectionExpanding-itemsContainer"]': {
          [theme.breakpoints.up('md')]: {
            rowGap: theme.spacing(4)
          }
        }
      }
    }
  }
];

export const CollectionExpandingTheme = (theme: Theme): ThemeOptions => ({
  components: {
    CollectionExpanding: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default CollectionExpandingTheme;
