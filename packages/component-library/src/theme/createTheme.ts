import { red, blue } from '@material-ui/core/colors';
import { createTheme, ThemeOptions } from '@material-ui/core/styles';

export default function createAppTheme(options: ThemeOptions) {
  return createTheme({
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
