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
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    position: 'relative',
    padding: theme.spacing(12, 0)
  }),
  backgroundGrid: {
    zIndex: -1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  background: {
    // TODO: Get rid of &&
    '&&': {
      gridColumn: '1/-1',
      height: '100%',
      objectFit: 'cover'
    }
  },
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
  }
  // media: {},
  // overline: {},
  // title: {},
  // subtitle: {},
  // body: {},
  // actionsWrapper: {},
  // action: {}
};

const createVariants = (theme: Theme): ComponentsVariants['Hero'] => [];

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
