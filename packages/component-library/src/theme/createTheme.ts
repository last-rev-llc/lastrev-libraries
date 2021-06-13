import { red, green } from '@material-ui/core/colors';
import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';

export default function createTheme(options: ThemeOptions) {
  return createMuiTheme({
    palette: {
      primary: {
        main: green[500]
      },
      secondary: {
        main: '#19857b'
      },
      error: {
        main: red.A400
      },
      background: {
        default: '#fff'
      }
    },
    ...options
  });
}
