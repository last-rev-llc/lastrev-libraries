import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['Block'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Block'] = {
  root: ({ theme, ownerState }) => ({
    containerType: 'inline-size',
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    // TODO: Update to check if within a section
    padding: theme.spacing(12, 0)
  }),

  // introTextGrid: : {},

  introText: { gridColumn: 'content-start / content-end' },

  contentOuterGrid: {
    '> *': {
      gridColumnStart: 'auto'
    }
  },

  overline: ({ theme }) => ({
    marginBottom: theme.spacing(1)
  }),

  // title: : {},

  // subtitle: : {},

  // body: : {},

  content: {
    display: 'flex',
    flexDirection: 'column'
  },

  mainContentWrapper: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',
    gridRow: 2,

    [theme.containerBreakpoints.up('md')]: {
      gridRow: 1,
      gridColumnStart: 'content-start',
      gridColumnEnd: 'content-half'
    }
  }),

  sideContentWrapper: ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gridRow: 1,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    [theme.containerBreakpoints.up('md')]: {
      gridRow: 1,
      gridColumnStart: 'content-half',
      gridColumnEnd: 'content-end'
    }
  }),

  // mediaItems: : {},

  actionsWrapper: ({ theme }) => ({
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    [theme.containerBreakpoints.up('lg')]: {
      flexDirection: 'row'
    }
  })

  // action: : {}
};

const createVariants = (theme: Theme): ComponentsVariants['Block'] => [
  // {
  //   props: {
  //     variant: 'contentOnRight'
  //   },
  //   style: {}
  // },
  {
    props: {
      variant: 'contentOnRightFullBleed'
    },
    style: {
      '[class*=sideContentWrapper]': {
        gridColumnStart: '1',

        [theme.containerBreakpoints.up('lg')]: {
          gridColumnEnd: '-1'
        }
      }
    }
  },
  {
    props: {
      variant: 'contentOnLeft'
    },
    style: {
      '[class*=mainContentWrapper]': {
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('lg')]: {
          gridColumnStart: 'content-half'
        }
      },

      '[class*=sideContentWrapper]': {
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('lg')]: {
          gridColumnEnd: 'content-half'
        }
      }
    }
  },
  {
    props: {
      variant: 'contentOnLeftFullBleed'
    },
    style: {
      '[class*=mainContentWrapper]': {
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-end',

        [theme.containerBreakpoints.up('lg')]: {
          gridColumnStart: 'content-half'
        }
      },

      '[class*=sideContentWrapper]': {
        gridColumnStart: '1',
        gridColumnEnd: '-1',

        [theme.containerBreakpoints.up('lg')]: {
          gridColumnEnd: 'content-half'
        }
      }
    }
  },

  {
    props: {
      variant: 'contentAbove'
    },
    style: {
      '[class*=mainContentWrapper]': {
        gridColumn: 'content-start/content-end',
        gridRow: 2
      },

      '[class*=sideContentWrapper]': {
        gridColumn: 'content-start/content-end',
        gridRow: 1
      }
    }
  },
  {
    props: {
      variant: 'contentBelow'
    },
    style: {
      '[class*=mainContentWrapper]': {
        gridColumn: 'content-start/content-end',
        gridRow: 1
      },

      '[class*=sideContentWrapper]': {
        gridColumn: 'content-start/content-end',
        gridRow: 2
      }
    }
  }
];

export const blockTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Block: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default blockTheme;
