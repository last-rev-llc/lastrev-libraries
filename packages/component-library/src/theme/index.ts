import createAppTheme from './createTheme';

interface CustomTheme {
  // Example on how to pass custom fields to the Theme
  appDrawer: {
    width: React.CSSProperties['width'];
  };
}

declare module '@material-ui/core/styles/createTheme' {
  // eslint-disable-next-line
  interface Theme extends CustomTheme {}
  // eslint-disable-next-line
  interface ThemeOptions extends CustomTheme {}
}

const theme = createAppTheme({
  appDrawer: { width: 240 }
});

export default theme;
