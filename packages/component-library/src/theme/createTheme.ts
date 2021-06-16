import { red, blue } from '@material-ui/core/colors';
import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';

export default function createTheme(options: ThemeOptions) {
  return createMuiTheme({
    palette: {
      primary: {
        main: blue[600]
      },
      secondary: {
        main: blue[300]
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
