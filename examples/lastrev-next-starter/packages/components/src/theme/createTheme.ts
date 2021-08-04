import { createTheme, ThemeOptions } from '@material-ui/core/styles';

export default function createAppTheme(options: ThemeOptions, ...args: object[]) {
  return createTheme(
    {
      ...options
    },
    ...args
  );
}
