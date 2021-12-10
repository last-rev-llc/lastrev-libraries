import set from 'lodash/set';
import get from 'lodash/get';
import { Palette } from '@mui/material/styles/createPalette';

export class PaletteAccent {
  palette!: Palette;

  constructor(
    schemeOptions: {
      buildOptions?: { key: string; name: string; createScheme: boolean; createPaletteAccent: boolean };
      palette: any;
    },
    baseSchemeOptions: { palette: any }
  ) {
    const { palette: schemePalette } = schemeOptions;
    const { palette: basePalette } = baseSchemeOptions;

    set(this, 'main', get(schemePalette, 'backgroundDefault', basePalette.backgroundDefault));
    set(this, 'contrastText', get(schemePalette, 'primaryTextColor', basePalette.primaryTextColor));
  }
}
