import { Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from '@mui/material/styles';

export const defaultProps: ComponentsProps['Block'] = {};

export const styleOverrides: ComponentsOverrides<Theme>['Block'] = {
  root: () => ({
    width: '100%'
  }),

  introTextWrapper: ({ theme }) => ({}),

  introText: ({}) => ({}),

  contentOuterWrapper: ({ theme }) => {
    return {
      ...theme.mixins.gridContainer(theme),
      alignSelf: 'center',
      justifySelf: 'center'
    };
  },

  content: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column'
  }),

  mainContentWrapper: () => ({
    gridColumn: '1/7',
    gridRow: '1',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center'
  }),

  overline: ({ theme }) => ({
    marginBottom: theme.spacing(1)
  }),

  title: () => ({}),

  subtitle: () => ({}),

  body: () => ({}),

  sideContentWrapper: () => ({
    gridColumn: '7/-1',
    gridRow: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
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
      variant: 'contentOnLeft'
    },
    style: () => ({
      '[class*=mainContentWrapper]': {
        gridColumn: '7/-1',
        gridRow: 1
      },

      '[class*=sideContentWrapper]': {
        gridColumn: '1/7',
        gridRow: 1
      }
    })
  },
  {
    props: {
      variant: 'contentOnLeftFullBleed'
    },
    style: () => ({
      '[class*=mainContentWrapper]': {
        gridColumn: '7/-1',
        gridRow: 1
      },

      '[class*=sideContentWrapper]': {
        gridColumn: '1/7',
        gridRow: 1
      }
    })
  },
  {
    props: {
      variant: 'contentOnRight'
    },
    style: () => ({
      '[class*=mainContentWrapper]': {
        gridColumn: '1/7',
        gridRow: 1
      },

      '[class*=sideContentWrapper]': {
        gridColumn: '7/-1',
        gridRow: 1
      }
    })
  },
  {
    props: {
      variant: 'contentOnRightFullBleed'
    },
    style: () => ({
      '[class*=mainContentWrapper]': {
        gridColumn: '1/7',
        gridRow: 1
      },

      '[class*=sideContentWrapper]': {
        gridColumn: '7/-1',
        gridRow: 1
      }
    })
  },
  {
    props: {
      variant: 'contentAbove'
    },
    style: {
      '[class*=mainContentWrapper]': {
        gridColumn: '1/-1',
        gridRow: 2
      },

      '[class*=sideContentWrapper]': {
        gridColumn: '1/-1',
        gridRow: 1
      },

      '[class*=actionsWrapper]': {
        justifyContent: 'center'
      }
    }
  },
  {
    props: {
      variant: 'contentBelow'
    },
    style: {
      '[class*=mainContentWrapper]': {
        gridColumn: '1/-1',
        gridRow: 1
      },

      '[class*=sideContentWrapper]': {
        gridColumn: '1/-1',
        gridRow: 2
      },

      '[class*=actionsWrapper]': {
        justifyContent: 'center'
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
