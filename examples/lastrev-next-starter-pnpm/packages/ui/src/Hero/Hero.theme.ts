import type {
  Theme,
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

const defaultProps: ComponentsProps['Hero'] = {
  variant: 'default'
};

const styleOverrides: ComponentsOverrides<Theme>['Hero'] = {
  root: ({ theme }) => ({
    position: 'relative',
    padding: theme.spacing(12, 0)
  }),
  contentGrid: {
    alignItems: 'center'
  },
  content: {
    gridColumn: 'content-start/content-half',
    gridRow: 1
  },
  mediaWrap: {
    gridColumn: 'content-half/content-end',
    gridRow: 1
  },
  // media: {},
  // overline: {},
  // title: {},
  // subtitle: {},
  // body: {},
  actionsWrapper: ({ theme }) => ({
    marginTop: theme.spacing(2)
  })
  // action: {}
};

const createVariants = (theme: Theme): ComponentsVariants['Hero'] => [
  {
    props: {
      variant: 'mediaOnRight'
    },
    style: () => ({})
  },
  {
    props: {
      variant: 'mediaOnRightFullBleed'
    },
    style: () => ({
      '[class*=Hero-mediaWrap]': {
        gridColumnEnd: '-1',
        [theme.breakpoints.down('sm')]: {
          gridColumnStart: '1'
        }
      }
    })
  },
  {
    props: {
      variant: 'mediaOnLeft'
    },
    style: () => ({
      '[class*=Hero-content]': {
        gridColumnStart: 'content-half',
        gridColumnEnd: 'content-end',
        [theme.breakpoints.down('sm')]: {
          gridColumnStart: 'content-start'
        }
      },
      '[class*=Hero-mediaWrap]': {
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
      variant: 'mediaOnLeftFullBleed'
    },
    style: () => ({
      '[class*=Hero-content]': {
        gridColumnStart: 'content-half',
        gridColumnEnd: 'content-end',
        [theme.breakpoints.down('sm')]: {
          gridColumnStart: 'content-start'
        }
      },
      '[class*=Hero-mediaWrap]': {
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
      '[class*=Hero-content]': {
        gridColumn: 'content-start/content-end',
        gridRow: 2
      },

      '[class*=Hero-mediaWrap]': {
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
      '[class*=Hero-content]': {
        gridColumn: 'content-start/content-end',
        gridRow: 1
      },

      '[class*=Hero-mediaWrap]': {
        gridColumn: 'content-start/content-end',
        gridRow: 2
      }
    }
  }
];

export const heroTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Hero: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default heroTheme;
