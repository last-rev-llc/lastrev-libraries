import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

export const defaultProps: ComponentsProps['Block'] = {};

export const styleOverrides: ComponentsOverrides<Theme>['Block'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(12, 0)
  }),

  introTextGrid: ({ theme }) => ({}),

  introText: ({}) => ({}),

  contentOuterGrid: ({ theme }) => ({
    '> *': {
      gridColumnStart: 'auto'
    }
  }),

  overline: ({ theme }) => ({
    marginBottom: theme.spacing(1)
  }),

  title: () => ({}),

  subtitle: () => ({}),

  body: () => ({}),

  content: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column'
  }),

  mainContentWrapper: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    gridRow: 1,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-half',
    [theme.breakpoints.down('sm')]: {
      gridColumnEnd: 'span 4',
      gridRow: 2
    }
  }),
  sideContentWrapper: ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gridRow: 1,
    gridColumnStart: 'content-half',
    gridColumnEnd: 'content-end',
    [theme.breakpoints.down('sm')]: {
      gridColumnStart: 'content-start'
    }
  }),

  mediaItems: () => ({}),

  actionsWrapper: ({ theme }) => ({
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    }
  }),

  action: () => ({})
};

const createVariants = (theme: Theme): ComponentsVariants['Block'] => [
  {
    props: {
      variant: 'contentOnRight'
    },
    style: () => ({})
  },
  {
    props: {
      variant: 'contentOnRightFullBleed'
    },
    style: () => ({
      '[class*=sideContentWrapper]': {
        gridColumnEnd: '-1',
        [theme.breakpoints.down('sm')]: {
          gridColumnStart: '1'
        }
      }
    })
  },
  {
    props: {
      variant: 'contentOnLeft'
    },
    style: () => ({
      '[class*=mainContentWrapper]': {
        gridColumnStart: 'content-half',
        gridColumnEnd: 'content-end',
        [theme.breakpoints.down('sm')]: {
          gridColumnStart: 'content-start'
        }
      },
      '[class*=sideContentWrapper]': {
        gridColumnStart: 'content-start',
        gridColumnEnd: 'content-half',
        [theme.breakpoints.down('sm')]: {
          gridColumnEnd: 'content-end'
        }
      }
    })
  },
  {
    props: {
      variant: 'contentOnLeftFullBleed'
    },
    style: () => ({
      '[class*=mainContentWrapper]': {
        gridColumnStart: 'content-half',
        gridColumnEnd: 'content-end',
        [theme.breakpoints.down('sm')]: {
          gridColumnStart: 'content-start'
        }
      },
      '[class*=sideContentWrapper]': {
        gridColumnStart: '1',
        gridColumnEnd: 'content-half',
        [theme.breakpoints.down('sm')]: {
          gridColumnEnd: '-1'
        }
      }
    })
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
