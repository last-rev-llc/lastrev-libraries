import createTheme from './createTheme';

interface CustomTheme {
  // Example on how to pass custom fields to the Theme
  appDrawer: {
    width: React.CSSProperties['width'];
  };
}

declare module '@material-ui/core/styles/createMuiTheme' {
  // eslint-disable-next-line
  interface Theme extends CustomTheme {}
  // eslint-disable-next-line
  interface ThemeOptions extends CustomTheme {}
}

const theme = createTheme({
  appDrawer: { width: 240 }
});

export default theme;
