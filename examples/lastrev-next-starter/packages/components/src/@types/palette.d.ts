import { Palette as MuiPalette } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface Theme {
    scheme?: string;
    createSchemeTheme?: (scheme: string) => Theme;
    palette: Palette;
  }

  interface Palette {
    'tertiary'?: MuiPalette['primary'];
    'quartiary'?: MuiPalette['primary'];
    'gradient-primary'?: MuiPalette['primary'];
  }

  interface PaletteOptions {
    'tertiary'?: PaletteOptions['primary'];
    'quartiary'?: PaletteOptions['primary'];
    'gradient-primary'?: PaletteOptions['primary'];
  }
}
