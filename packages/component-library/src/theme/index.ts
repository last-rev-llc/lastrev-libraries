import createAppTheme from './createTheme';
declare module '@material-ui/core/styles/components' {
  interface ComponentsProps {
    Section: {};
  }
  interface ComponentElementOverrides {
    Section: {
      root: {};
      gridItem: {};
      gridContainer: {};
      backgroundImage: {};
    };
  }
  interface ComponentsOverrides {
    Section: {
      root: {};
      gridItem: {};
      gridContainer: {};
      backgroundImage: {};
    };
  }
  interface ComponentsVariants {
    Section: {};
  }
  interface Components {
    Section?: {
      defaultProps?: ComponentsProps['Section'];
      overrides?: ComponentElementOverrides['Section'];
      styleOverrides?: ComponentsOverrides['Section'];
      variants?: ComponentsVariants['Section'];
    };
  }
}

declare module '@material-ui/core/styles' {
  // eslint-disable-next-line
  interface Theme {
    appDrawer: {
      width: React.CSSProperties['width'];
    };
  }
  // eslint-disable-next-line
  interface ThemeOptions {
    appDrawer?: {
      width: React.CSSProperties['width'];
    };
  }
}

const theme = createAppTheme({
  components: {
    Section: {}
  },
  appDrawer: { width: 240 }
});

export default theme;
