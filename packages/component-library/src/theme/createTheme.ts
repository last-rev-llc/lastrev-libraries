import { createTheme, ThemeOptions } from '@mui/material/styles';

export default function createAppTheme(options?: ThemeOptions, ...args: object[]) {
  return createTheme(
    {
      ...options
    },
    ...args
  );
}
